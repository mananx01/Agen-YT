"use server"

import { api } from "@/convex/_generated/api";
import { featureFlagEvents, FeatureFlags } from "@/features/flags";
import { getConvexClient } from "@/lib/convex";
import { client } from "@/lib/schematic";
// import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { currentUser } from "@clerk/nextjs/server"
import { generateText } from "ai";

const convexClient = getConvexClient();

// const google = createGoogleGenerativeAI({
//     apiKey: process.env.GEMINI_API_KEY,
//     baseURL: "https://generativelanguage.googleapis.com/v1beta"
// });
// const model = google('gemini-2.5-flash');


export async function titleGeneration(
    videoId: string, 
    videoSummary: string,
    considerations: string,
){

    // user login check 
    const user = await currentUser()
    if(!user?.id) {
        throw new Error("User not found");
    }

    // check for the gemini api check 
    try {
        console.log("Videosummary: ", videoSummary);
        console.log("Generating title for a video with videoId: ", videoId);
        console.log("Considerations: ", considerations);

        const response = await generateText({
            model: openai("gpt-3.5-turbo"),
            messages: [
                {
                    role: 'system',
                    content: `You are a helpful YouTube video creator assistant that creates high quality 
                    SEO friendly concise video titles. You are given a video summary and considerations,
                     and you need to generate a concise title that meets the SEO requirements and 100 characters or less. 
                     You can use the GPT-4 model for this task. The model has been trained on a 
                     large dataset and can generate titles that are SEO friendly and concise. You should 
                     focus on the main points and key takeaways, and the title should be 100 characters or less. 
                     The user should provide the video summary and considerations as input. The output should be a 
                     concise title that meets the SEO requirements and 100 characters or less.`,
                },
                {
                    role: 'user',
                    content: `Please provide ONE concise youtube title (and nothing else) for this video.
                    Focus on the main points and key takeaways, it should be SEO friendly and 100 characters or less:
                    \n\nVideo Summary: ${videoSummary}\n\nConsiderations: ${considerations}`,
                },
            ],
            temperature: 0.7, // for randomness in different titles or responses
            maxTokens: 50,
        })

        const title = response.text.trim();

        if(!title) {
            return {
                error: "Failed to generate title (System error)",
            }
        }

        await convexClient.mutation(api.titles.generate, {
            videoId,
            userId: user.id,
            title: title,
        }) 

        // track the title generation event in schematic 
        await client.track({
            event: featureFlagEvents[FeatureFlags.TITLE_GENERATION].event,
            company: {
                id: user.id,
            },
            user: {
                id: user.id,
            },
        })

        console.log("Title generated");
        return title;

    }catch(error) {
        console.log("Error generating title: ", error);
        throw new Error("Failed to generate title");
    }

}