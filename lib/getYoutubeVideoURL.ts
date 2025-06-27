export function getVideoIDFromURL(url: string): string | null {
    let videoId: string | null = null;
    if(url.includes("youtu.be/")) {
        // Shortened YouTube URL format = https://youtu.be/video_id
        videoId = url.split("youtu.be/")[1]?.split(/[?#]/)[0] || null; 
    }
    else if(url.includes("youtube.com/shorts/")) {
        // youtube url is short
        videoId = url.split("shorts/")[1]?.split(/[?#]/)[0] || null; 
    }
    else if(url.includes("v=")) {
        // standard format = https://www.youtube.com/watch?v=video_id
        videoId = url.split("v=")[1]?.split("&")[0] || null;  
        
    }
    return videoId;
}