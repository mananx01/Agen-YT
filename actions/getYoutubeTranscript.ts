'use server'

import { api } from "@/convex/_generated/api";
import { featureFlagEvents, FeatureFlags } from "@/features/flags";
import { client } from "@/lib/schematic";
import {currentUser} from "@clerk/nextjs/server"
import { ConvexHttpClient } from "convex/browser";
import { Innertube } from "youtubei.js" 

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export interface TranscriptEntry {
    text: string;
    timestamp: string;
}

const youtube = await Innertube.create({
    lang: "en", 
    location: "US", 
    retrieve_player: false
})

function formatTimestamp(start_ms: number) :string {
    const minutes = Math.floor(start_ms/ 60000);
    const seconds = Math.floor((start_ms%60000)/1000);
    return `${minutes}:${seconds.toString().padStart(2,"0")}`;
}

async function fetchTranscript(videoId: string): Promise<TranscriptEntry[]> {
    try {
        const info = await youtube.getInfo(videoId);
        const transcriptData = await info.getTranscript();
        const transcript: TranscriptEntry[] = transcriptData.transcript.content?.body?.
        initial_segments.map(segment => ({
            text: segment.snippet.text ?? "N/A",
            timestamp: formatTimestamp(Number(segment.start_ms)),
        }))
        ?? [] // safe check 
        
        return transcript;

    }catch(error) {
        console.log("Error fetching transcripts: ", error);
        throw error;
    }
}

export async function getYoutubeTranscript(videoId: string) {
    console.log("getYoutubeTranscript called with videoId:", videoId);
    const user = await currentUser();
    // console.log("Current user:", user);

    if (!user?.id) {
        console.error("User not found");
        throw new Error("User not found");
    }

    // check if the transcript is already in the database 
    console.log("Checking if transcript is in the database...");

    const existingTranscript = await convex.query(
        api.transcript.getTranscriptByVideoId,
        { videoId, userId: user.id }
    );
    // console.log("existingTranscript:", existingTranscript);

    if (existingTranscript) {
        console.log("Transcript found in db");
        return {
            cache: "This video has been already transcribed - Accessing cached transcript instead of using a token.",
            transcript: existingTranscript.transcript,
        };
    }

    try {
        console.log("Transcript not found in db, fetching from YouTube...");
        const transcript = await fetchTranscript(videoId);
        console.log("Fetched transcript:", transcript);

        // store the transcript in db
        console.log("Storing transcript in database...");
        await convex.mutation(api.transcript.storeTranscript, {
            videoId,
            userId: user.id,
            transcript,
        });
        console.log("Transcript stored successfully.");

        // track the actions 
        console.log("Tracking transcription event...");
        await client.track({
            event: featureFlagEvents[FeatureFlags.TRANSCRIPTION].event,
            company: {
                id: user.id,
            },
            user: {
                id: user.id,
            },
        });
        console.log("Event tracked.");

        return {
            transcript,
            cache: "This video was transcribed using a token, the transcription is now stored in the database.",
        };

    } catch (error) {
        console.log("Error fetching transcript: ", error);
        return {
            transcript: [],
            cache: "Error fetching transcriptions, please try again later",
        };
    }
}