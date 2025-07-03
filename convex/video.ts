import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


// same as for transcripts 
export const getVideoById = query({
    args: {
        videoId: v.string(),
        userId: v.string(),
    },
    handler: async (ctx,args) => {
        const result = await ctx.db
        .query("videos")
        .withIndex("by_user_and_video", (q) =>
            q.eq("userId", args.userId).eq("videoId",args.videoId)
        )
        .unique()
        
        return result;
    }
})


export const createVideoEntry = mutation({
    args: {
        videoId: v.string(),
        userId: v.string()
    },
    handler: async (ctx,args) => {
        const videoId = await ctx.db.insert("videos", {
            userId: args.userId,
            videoId: args.videoId,
        })
        return videoId;
    },
})




