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
        NextResponse.json({erorr: "Unauthorized"}, {status: 401})
    }


    const {messages, videoId} = await res.json();
    const videoDetails = await getVideoDetails(videoId);
    console.log("Video details recieved on route");


    const systemMessage = `You are an AI agent ready to accept questions from the user about ONE specific video. The video ID in
    question is ${videoId} but you'll refer to this as ${videoDetails?.title || "Selected Video"}. Use and analyse this json object ${videoDetails} thorougly if user asks for 
    the details about the video and answering the query of user about the current video. Use emojis to make the conversation more engaging. If an error occurs, explain it to the user and ask them to try again later. If the error suggest
    the user upgrade, explain that they must upgrade to use the feature, tell them to go to 'Manage Plans' in the header and
    upgrade. If any tool is used, analyse the response and if it contains a cache, explain that the transcript is cached because 
    they previously transcibed the video saving the user a token - use words like database instead of cache to make it more 
    easy to understand. Format for notion.
    use 'generateImage' tool for thumbnail generation, 'generateTitle' tool for title generation, 
    'generateScript' tool for script generation for the video which I have provided to you.`;


    const response = streamText ({
        model,
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
            generateScript: generateScript(videoId, user!.id),
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