import { scriptGeneration } from "@/actions/scriptGeneration"
import { FeatureFlags } from "@/features/flags"
import { client } from "@/lib/schematic"
import { tool } from "ai"
import { z } from "zod"

export const generateScript = (userId: string) => tool({
    description: "Generate a script for a youtube video",
    parameters: z.object({
        videoId: z.string().describe("The URL to extract the video ID from"),
        transcript: z
            .string()
            .describe("The transcript of the video to generate script for"),
    }),
    execute: async({videoId, transcript}) => {
        const schematicCtx = {
            company : {id: userId},
            user : {
                id: userId,
            }
        }
    
        const isScriptGenerationEnabled = await client.checkFlag(
            schematicCtx,
            FeatureFlags.SCRIPT_GENERATION
        )

        if(!isScriptGenerationEnabled) {
            return {
                error: "Script generation is not enabled. You must upgrade your plan from the 'Manage Plans' section.",
            }
        }

        console.log("Generating script...")
        console.log("Transcript lenght: " , transcript.length);
        const script = await scriptGeneration(
            videoId,
            transcript,
        );

        return { script };

    }


})