"use server";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { featureFlagEvents, FeatureFlags } from "@/features/flags";
import { checkFeatureUsageLimit } from "@/lib/checkFeatureUsageLimit";
import { getConvexClient } from "@/lib/convex";
import { client } from "@/lib/schematic";
import { currentUser } from "@clerk/nextjs/server";

export interface VideoResponse {
    success: boolean;
    data?: Doc<"videos">;
    error?: string;
}

export const createOrGetVideo = async (
    videoId: string,
    userId: string,
): Promise<VideoResponse> => {
    
    const convex = getConvexClient();
    const user = await currentUser();

    // console.log(`${userId} and ${videoId}`);

    if(!user) {
        return {
            success: false,
            error: "User not found",
        };
    }

    const featureCheck = await checkFeatureUsageLimit(
        user.id,
        featureFlagEvents[FeatureFlags.ANALYSE_VIDEO].event,
    );

    if(!featureCheck.success) {
        return {
            success : false,
            error: featureCheck.error,
        };
    }

    try {

        const video = await convex.query(api.video.getVideoById , {
            videoId,
            userId,
        });

        console.log("VIDEO:- ", video)

        if(!video) {
            // analyse event 
            console.log(`Analyse event for video ${videoId} - Token will be spent`)
            
            // creating new video wiht videoId and userId
            const newVideoId = await convex.mutation(api.video.createVideoEntry, {
                videoId,
                userId,
            })

            const newVideo = await convex.query(api.video.getVideoById, {
                videoId: videoId,
                userId,
            })

            console.log("Tracking analyse video event...");
            await client.track({
                event: featureFlagEvents[FeatureFlags.ANALYSE_VIDEO].event,
                company: {
                    id: userId,
                },
                user: {
                    id: userId,
                },
            });

            console.log("token spent bcz video not found!");
            return {
                success: true,
                data: undefined,
            }

        }
        else{
            // the user has already come to that video before
            console.log("Video exists - no token needs to be spent");
            return {
                success : true,
                data: video,
            }
        }
    } catch (error) {
        console.error("Error creating or getting video: ", error);
        return {
            success: false,
            error: "An unexpected error occurred. Please try again later.",
        }
    }

    

}
