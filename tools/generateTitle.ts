import { titleGeneration } from "@/actions/titleGeneration";
import TitleGeneration from "@/app/components/TitleGeneration";
import { FeatureFlags } from "@/features/flags";
import { client } from "@/lib/schematic";
import { tool } from "ai";
import { z } from "zod";


export const generateTitle = (userId: string) => tool({
    description: "Generate a title for a youtube video",
    parameters: z.object({
        videoId: z.string().describe("The URL to extract the video ID from"),
        videoSummary: z
            .string()
            .describe("The summary of the video to generate title for"),
        considerations: z
            .string()
            .describe("Any additional considerations for the title"),
    }),
    execute: async ({videoId, videoSummary, considerations}) => {
        
        // if user has not enabled this title generation feature he cannot 
        // use this `generateTitle` tool

        const schematicCtx = {
            company : {id: userId},
            user : {
                id: userId,
            }
        }
    
        const isTitleGenerationEnabled = await client.checkFlag(
            schematicCtx,
            FeatureFlags.TITLE_GENERATION
        )

        if(!isTitleGenerationEnabled) {
            return {
                error: "Title generation is not enabled, the user must upgrade to generate titles.",
            }
        }

        console.log("Generating title for the video in tools calling action...");

        const title = await titleGeneration(
            videoId,
            videoSummary,
            considerations,
        );
        return { title };
    } 
})