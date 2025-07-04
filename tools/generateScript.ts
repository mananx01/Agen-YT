import { scriptGeneration } from "@/actions/scriptGeneration"
import { FeatureFlags } from "@/features/flags"
import { client } from "@/lib/schematic"
import { tool } from "ai"
import { z } from "zod"

export const generateScript = (videoId: string, userId: string) => tool({
    description: "Generate a script for a youtube video",
    parameters: z.object({
        videoId: z.string().describe("The YouTube video ID"),
        videoTranscript: z
            .string()
            .describe("The transcript of the video to generate script for"),
        tone: z.string().optional().describe("Optional tone or style of the script, e.g., formal, funny"),
    }),
    execute: async({tone,videoTranscript}) => {
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
        const script = await scriptGeneration(
            videoId,
            videoTranscript,
        );

        return { script };

    }


})