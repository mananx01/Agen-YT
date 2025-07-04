"use server"

import { fetchTranscript } from "@/tools/fetchTranscript";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { currentUser } from "@clerk/nextjs/server";
import { generateText } from "ai";


// const google = createGoogleGenerativeAI({
//     apiKey: process.env.GEMINI_API_KEY,
//     baseURL: "https://generativelanguage.googleapis.com/v1beta"
// });
// const model = google('gemini-2.5-flash');


export async function scriptGeneration (
    videoId: string,
    videoTranscript: string
) {

    const user = await currentUser()
    if(!user?.id) {
        throw new Error("User not found");
    }

    try {
        const response = await generateText({
            model: openai("gpt-3.5-turbo"),
            messages: [
                {
                    role: "system",
                    content: `You are a helpful Youtube video creator script writer that creates high quality 
                        YouTube scripts for the videos from raw transcripts. Fetch the transcripts first for the video
                        and then taking reference from the transcript generate, rephrase and structure the content into 
                        a high-quality script suitable for narration the original video's language only.
                        The user should provide the video transcript as input. The output should be a 
                        high quality script that meets the SEO requirements.`,
                },
                {
                    role: "user",
                    content: `Please provide a youtube script (and nothing else) for this video.
                    Focus on the main points and key takeaways, it should be SEO friendly.
                    \n\nVideo transcript: ${videoTranscript}\n\nVideoId: ${videoId}`,
                }
            ],
            temperature: 0.7,
            maxTokens: 70,
        })

        const script = response.text.trim() || "Unable to generate script";

        if(!script) {
            return {
                error: "Failed to generate script (System error)",
            }
        }

        console.log("Script generated");

        return script;

    }catch(error) {
        console.log("Error generating script:", error);
        throw new Error("Failed to generate script");
    }

}