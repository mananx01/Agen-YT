"use server"

import { getVideoIDFromURL } from "@/lib/getYoutubeVideoURL";
import { redirect } from "next/navigation"

export async function analyseYoutubeVideo(formData: FormData) {
  const url = formData.get("url")?.toString();

  if(!url) return;

  // strip the v='id' from the link 
  // https://www.youtube.com/watch?v=E1U6CDNHe0s
  const videoID = getVideoIDFromURL(url) // to be implement (fix this)
  if(!videoID) return;

  // redirect to new page with video analysis result
  redirect(`http://localhost:3000/video/${videoID}/analysis`); // add http://localhost:3000

}
