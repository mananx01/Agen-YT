"use server";

import { api } from "@/convex/_generated/api";
import { featureFlagEvents, FeatureFlags } from "@/features/flags";
import { getConvexClient } from "@/lib/convex";
import { client } from "@/lib/schematic";
import { currentUser } from "@clerk/nextjs/server";
import { use } from "react";

const convexClient = getConvexClient();

function base64ToBlob(base64: string, mime = "image/png"): Blob {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let i = 0; i < byteCharacters.length; i += 512) {
    const slice = byteCharacters.slice(i, i + 512);
    const byteNumbers = new Array(slice.length);
    for (let j = 0; j < slice.length; j++) {
      byteNumbers[j] = slice.charCodeAt(j);
    }
    byteArrays.push(new Uint8Array(byteNumbers));
  }

  return new Blob(byteArrays, { type: mime });
}


export const dalleImageGeneration = async (prompt: string, videoId: string) => {

  const user = await currentUser();
  if (!user?.id) {
    throw new Error("User not found");
  }

  if (!prompt) {
    throw new Error("Generating image requires a prompt.");
  }

  console.log("sending api request...");

  if (!process.env.STABILITY_API_KEY_IMAGE) {
    throw new Error("Missing STABILITY_API_KEY_IMAGE in env");
  }

  const form = new FormData();
  form.append("prompt", prompt);
  form.append("output_format", "png"); 
  const response = await fetch("https://api.stability.ai/v2beta/stable-image/generate/core", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.STABILITY_API_KEY_IMAGE!}`,
      "Accept": "application/json",
    },
    body: form,
  });

  console.log("api request fetched succesfully");
    // Validate response
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Stability API error:", errorText);
    throw new Error("Image generation failed.");
  }

  const data = await response.json();
  
  console.log("Api data: ", data);

  const imageBlob = base64ToBlob(data.image);
  console.log("converted base 64 string into blob")


  // 1 : Get a short lived upload url for convex
  console.log("Getting uplaod url");
  const postUrl = await convexClient.mutation(api.images.generateUploadUrl);
  console.log("Obtained Convex upload URL.");
  

  // 2. Upload the image to convex storage 
  const uploadResult = await fetch(postUrl, {
  method: "POST",
  headers: { "Content-Type": imageBlob.type },
  body: imageBlob,
  });


  const {storageId} = await uploadResult.json();
  console.log("Uploaded image to Convex with storageId:", storageId);
    
  // Step 3: Store image metadata in the database
  await convexClient.mutation(api.images.storeImage, {
    storageId,
    videoId,
    userId: user.id,
  });
  console.log("Stored image reference in DB.");

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
