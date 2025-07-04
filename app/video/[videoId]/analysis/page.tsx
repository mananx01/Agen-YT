'use client'

import { createOrGetVideo } from '@/actions/createOrGetVideo'
import AiAgentChat from '@/app/components/AiAgentChat'
import ThumbnailGeneration from '@/app/components/ThumbnailGeneration'
import TitleGeneration from '@/app/components/TitleGeneration'
import Transcriptions from '@/app/components/Transcriptions'
import Usage from '@/app/components/Usage'
import YoutubeVideoDetails from '@/app/components/YoutubeVideoDetails'
import { Doc } from '@/convex/_generated/dataModel'
import { FeatureFlags } from '@/features/flags'
import { useUser } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import ScriptGeneration from '../../../components/ScriptGeneration'


function AnalysisPage() {

  const params = useParams<{videoId: string}>();

  const { videoId } = params;
  const {user, isLoaded} = useUser();
  const [video, setVideo] = useState<Doc<"videos"> | undefined | null>(
    null
  );

  useEffect(() => {
     if (!isLoaded || !user?.id) return;

    const fetchVideo = async () => {
      const response = await createOrGetVideo(videoId as string, user.id);
      if(!response.success) {
        toast.error("Error creating or getting video",{
          description: response.error,
          duration: 10000,
        })
      }
      else{
        setVideo(response.data!);
      }
    }

    fetchVideo();

  },[videoId, user])


  const VideoTranscriptionStatus = 
    video === null ? (

    <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-[#1f1f1f] border-gray-700 rounded-full'> 
      <div className='w-2 h-2 bg-gray-400 rounded-full animate-pulse'></div>
      <span className='text-sm text-gray-400'>Loading video...</span>
    </div>

  ) : video === undefined ? (

    <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-[#2a1a1f] border-pink-800 rounded-full'>
      <div className='w-2 h-2 bg-pink-600 rounded-full animate-pulse'></div>
      <p className='text-sm text-amber-700'>
        This is the first time analysing the video
        <span className='font-semibold'> - 1 analysis token is being used !</span>
      </p>
    </div>

  ) : (
      
    <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-[#112d1f] border-emerald-800 rounded-full'>
      <div className='w-2 h-2 bg-emerald-400 rounded-full animate-pulse'></div>
      <p className='text-sm text-emerald-400'>
        Analysis exists for this video - no additional tokens needed in future calls. <br/>
      </p>
    </div>

  );  

  if (!isLoaded) {
    return <div className="text-white p-4">Loading user session...</div>;
  }

  return (
    <div className='mx-auto px-4 md:px-4 bg-[#0b0b0f]'> 
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>

          {/* left side */}
          <div className='order-2 lg:order-1 flex flex-col gap-6
            bg-black lg:border-r border-slate-900 py-6 px-4'>
            
            {/* Analysis Section */}
            <div className=''>
              <Usage
                featureFlag = {FeatureFlags.ANALYSE_VIDEO}
                title = "Analyse Video"
              />

              {/* video transcription status*/}
              <div className='py-4'>
                {VideoTranscriptionStatus}
              </div>
            
            </div>
              

            <YoutubeVideoDetails videoId={videoId} />
            <ScriptGeneration videoId={videoId}/>
            <ThumbnailGeneration videoId={videoId}/>
            <TitleGeneration videoId={videoId} />
            <Transcriptions videoId={videoId}/>


          </div>


          {/* right side */}
          <div className='order-1 lg:order-2 lg:sticky lg:top-20 h-[500px] md:h-[calc(100vh-6rem)] '>
              <AiAgentChat videoId={videoId}/>
          </div>
        
        </div>  
    </div>
  )
}

export default AnalysisPage
