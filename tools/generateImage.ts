import { tool } from "ai";
import { z } from "zod";
import { FeatureFlags } from "@/features/flags";
import { client } from "@/lib/schematic";
import { dalleImageGeneration } from "@/actions/dalleImageGeneration";

export const generateImage = (videoId: string, userId: string) => tool({
    description : "Generate an image", 
    parameters:  z.object({
        prompt: z.string().describe("The prompt to generate an image for"),
        videoId: z.string().describe("The YouTube videoId") 
    }),
    execute: async({prompt}) => {
        const schematicCtx = {
            company : {
                id: userId,
            },
            user : {
                id: userId,
            }
        }

        const isImageGenerationEnabled = await client.checkFlag(
            schematicCtx,
            FeatureFlags.IMAGE_GENERATION
        )


        if(!isImageGenerationEnabled) {
            return {
                error: "Image generation is not enabled, the user must upgrade to generate thumbnails.",
            }
        }

        const image =  await dalleImageGeneration(prompt,videoId);
        
        return {image};
    },
})