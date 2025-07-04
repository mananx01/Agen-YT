"use server";

import { api } from "@/convex/_generated/api";
import { featureFlagEvents, FeatureFlags } from "@/features/flags";
import { getConvexClient } from "@/lib/convex";
import { client } from "@/lib/schematic";
import { currentUser } from "@clerk/nextjs/server";
import OpenAI from "openai"


const convexClient = getConvexClient();
const IMAGE_SIZE = "256x256" as const;



export const dalleImageGeneration = async (prompt: string, videoId: string) => {

  const user = await currentUser();
  if (!user?.id) {
    throw new Error("User not found");
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  }) 

  if(!prompt) {
    throw new Error("Failed to generate image prompt !!");
  }

  console.log("Generating dalle image with prompt...", prompt);


  const imageResponse = await openai.images.generate({
    model: "dall-e-2",
    prompt: prompt,
    n : 1, 
    size: IMAGE_SIZE,
    // quality: "standard",
    // style: "vivid",
  });

  const imageUrl = imageResponse.data?.[0]?.url;

  if(!imageUrl) {
    throw new Error("Failed to generate image");
  }


  // 1 : Get a short lived upload url for convex
  console.log("Getting upload url");
  const postUrl = await convexClient.mutation(api.images.generateUploadUrl);
  console.log("Obtained Convex upload URL.");
  

  // 2. Upload the image to convex storage 
  console.log("downloading image form openai...")
  const image: Blob = await fetch(imageUrl).then((res) => res.blob());
  console.log("Downloaded image successfully.");



  // Step 3: Store image to the convex storage bucket
  console.log("uploading image to storage...");
  const result = await fetch(postUrl, {
    method: "POST",
    headers: {"Content-Type": image!.type},
    body: image,
  })
  console.log("Stored image reference in DB.");

  const {storageId } = await result.json();
  console.log("Uploaded image to storage with ID: ", storageId);


  // step - 4 : saving the newly allocated stirage id to the db 
  console.log("Saving image reference to db...");
  await convexClient.mutation(api.images.storeImage, {
    storageId: storageId,
    videoId,
    userId: user.id,
  })
  console.log("Saved image reference to db...");

  // get serve image url
  const dbImageUrl = await convexClient.query(api.images.getImage, {
    videoId,
    userId: user.id,
  });

  //  track the image generation event 
  await client.track({
      event: featureFlagEvents[FeatureFlags.IMAGE_GENERATION].event,
      company: {
        id: user.id,
      },
      user: {
        id: user.id,
      }
  });

  return {
    imageUrl : dbImageUrl,
  }


};
