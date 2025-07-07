// import { google } from '@ai-sdk/google';
// import { createGoogleGenerativeAI } from '@ai-sdk/google';

import { streamText, tool  } from 'ai';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getVideoDetails } from '@/actions/getVideoDetails';
import { fetchTranscript } from '@/tools/fetchTranscript';
import { generateImage } from '@/tools/generateImage';
import { z } from 'zod';
import { getVideoIDFromURL } from '@/lib/getYoutubeVideoURL';
import { generateTitle } from '@/tools/generateTitle';
import { generateScript } from '@/tools/generateScript';
import { openai } from '@ai-sdk/openai';

// const genAI = createGoogleGenerativeAI({
//   apiKey: process.env.GEMINI_API_KEY!, 
// });
// const model = genAI("gemini-1.5-flash");

const model = openai("gpt-4o");

export async function POST(res: Request) {
    console.log("Request accepted on route");   

    const user = await currentUser();
    if(!user) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }


    const {messages, videoId} = await res.json();
    const videoDetails = await getVideoDetails(videoId);
    console.log("Video details recieved on route");


    const systemMessage = `
        You are an AI agent ready to accept questions from the user about ONE specific YouTube video. The video ID in question is ${videoId}, but you should refer to it as "${videoDetails?.title || "Selected Video"}".

        Use and analyze this JSON object thoroughly to answer any queries about the video:
        ${JSON.stringify(videoDetails)}

        Your responses should be engaging and clear — use emojis to make them friendly. Format all answers using Notion-style formatting (use **bold**, bullet points, etc.).

        If an error occurs (e.g. tool failure), explain the error kindly and ask the user to try again later. If the error suggests the user needs to upgrade, explain that they must upgrade their plan from the "Manage Plans" section in the header.

        If a tool response contains a cache, explain to the user that it was retrieved from the database, meaning they’ve previously processed this and saved tokens — avoid the word "cache", and use "saved result" or "database result" instead.

        ---

        ### Tool usage instructions:

        - Use the \`generateImage\` tool only if the user explicitly requests a **thumbnail**.
        - Use the \`generateTitle\` tool only if the user asks for a **title**.
        - Use the \`generateScript\` tool only if the user asks for a **script**.

        ➡️ **IMPORTANT**:  
        If the user asks for a script:
        1. First, use the \`fetchTranscript\` tool with the provided \`videoId\`.
        2. Then, once you receive the \`transcript\` from that tool, immediately call the \`generateScript\` tool using:
        - the same \`videoId\`
        - and the returned \`transcript\`
        3. Do **not** attempt to generate the script yourself — always rely on tools.

        Be accurate, avoid assumptions, and stick to facts from the video metadata or the tool outputs. Never skip tool usage if a tool is available for the task.
    `;

    const response = streamText ({
        model,
        maxSteps: 5, 
        messages: [
            {
                role: 'system',
                content: systemMessage,
            },
            ...messages,
        ],
        tools: {
            // tools invoked after a prompt from the user 
            // to actually get better results and accurate results
            // also to interact wiht our database.
            fetchTranscript: fetchTranscript,
            generateImage: generateImage(videoId, user!.id),
            generateTitle: generateTitle(user!.id),
            generateScript: generateScript(user!.id),
            getVideoDetails: tool({
                description: "Get the details of a Youtube video",
                parameters: z.object({
                    videoId: z.string().describe("The video ID to get the details for"),
                }),
                execute: async({videoId}) => {
                    const videoDetails = await getVideoDetails(videoId);
                    return videoDetails;
                }
            }),
            extractVideoId: tool({
                description: "Extract the video ID from a URL",
                parameters: z.object({
                    url: z.string().describe("The URL to extract the video ID from"),
                }),
                execute: async ({url}) => {
                    const videoId = await getVideoIDFromURL(url);
                    return { videoId };
                }
            }),

        }
    });

    console.log("Route working successfully");
    
    return response.toDataStreamResponse();

}