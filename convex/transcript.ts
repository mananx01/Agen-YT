import {v} from "convex/values"
import {mutation, query} from "./_generated/server"

export const getTranscriptByVideoId = query({
    args: {
        videoId: v.string(),
        userId: v.string(),
    },
    handler: async (ctx, args) => { 
        return await ctx.db
        .query("transcript")
        .withIndex("by_user_and_video" , (q) => 
            q.eq("userId", args.userId).eq("videoId", args.videoId)
        )
        .unique();
    }
});

// store a transcript for a video
export const storeTranscript = mutation({
    args: {
        videoId: v.string(),
        userId: v.string(),
        transcript: v.array(
            v.object({
                text: v.string(),
                timestamp: v.string(),
            })
        ),
    },
    handler: async (ctx, args) => {
        // check if transcript already exist in db for this user and video
        const existingTranscript = await ctx.db
        .query("transcript")
        .withIndex("by_user_and_video" , (q) => 
            q.eq("userId", args.userId).eq("videoId", args.videoId)
        )
        .unique()

        if(existingTranscript) {
            return existingTranscript;
        }

        // create new transcript 
        return await ctx.db.insert("transcript", {
            videoId: args.videoId,
            userId: args.userId,
            transcript: args.transcript,
        })

    }
});


// get all transcripts for user to avail the used tokens 
export const getTranscriptByUserId = query({
    args: {
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db
        .query("transcript")
        .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
        .collect(); 
    }
})

// delete transcript by ID
export const deleteTranscript = mutation({
    args : {id: v.id("transcript"), userId: v.string()},
    handler: async (ctx, args) => {
        const transcript = await ctx.db.get(args.id);
        if(!transcript) {
            throw new Error("Transcript not found");
        }

        if(transcript.userId !== args.userId) {
            throw new Error("Not authorized");
        }

        await ctx.db.delete(args.id);
        return true;
    },
    
})