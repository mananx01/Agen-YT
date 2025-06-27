import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({   

    // videos table

    videos: defineTable({
        videoId: v.string(),
        userId: v.string(),
    })
    .index("by_user_id", ["userId"])
    .index("by_video_id", ["videoId"])
    .index("by_user_and_video", ["userId", "videoId"]),

    // transcript table

    transcript: defineTable({
        videoId :v.string(), 
        userId: v.string(), 
        transcript: v.array(
            v.object({
                text: v.string(),
                timestamp: v.string(),
            })
        ),   
    })
    .index("by_user_id", ["userId"])
    .index("by_video_id", ["videoId"])
    .index("by_user_and_video", ["userId", "videoId"]),

    // images table

    images: defineTable({
        storageId: v.id("_storage"),
        userId: v.string(),
        videoId: v.string(),
    })
    .index("by_user_id", ["userId"])
    .index("by_video_id", ["videoId"])
    .index("by_user_and_video", ["userId", "videoId"]),

    // title table

    titles: defineTable({
        videoId: v.string(),
        userId: v.string(),
        title: v.string(),
    })
    .index("by_user_id", ["userId"])
    .index("by_video_id", ["videoId"])
    .index("by_user_and_video", ["userId", "videoId"]),
    
})