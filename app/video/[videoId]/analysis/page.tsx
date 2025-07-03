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


function AnalysisPage() {

  const params = useParams<{videoId: string}>();

  const { videoId } = params;
  const {user} = useUser();
  const [video, setVideo] = useState<Doc<"videos"> | undefined | null>(
    null
  );

  useEffect(() => {
    if(!user?.id) return;

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

    <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border-gray-200 rounded-full'> 
      <div className='w-2 h-2 bg-gray-400 rounded-full animate-pulse'></div>
      <span className='text-sm text-gray-700'>Loading video...</span>
    </div>

  ) : video === undefined ? (

    <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border-amber-200 rounded-full'>
      <div className='w-2 h-2 bg-amber-400 rounded-full animate-pulse'></div>
      <p className='text-sm text-amber-700'>
        This is the first time analysing the video
        <span className='font-semibold'> - 1 analysis token is being used !</span>
      </p>
    </div>

  ) : (
      
    <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border-green-200 rounded-full'>
      <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
      <p className='text-sm text-green-700'>
        Analysis exists for this video - no additional tokens needed in future calls. <br/>
      </p>
    </div>

  );  


  return (
    <div className='mx-auto px-4 md:px-4 bg-black'> 
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>

          {/* left side */}
          <div className='order-2 lg:order-1 flex flex-col gap-6
            bg-black lg:border-r border-slate-900 p-6'>
              {/* Analysis Section */}
              <div className=''>
                <Usage
                  featureFlag = {FeatureFlags.ANALYSE_VIDEO}
                  title = "Analyse Video"
                />
                {/* video transcription status here - to be implemented*/}
              
                <div className='py-4'>
                  {VideoTranscriptionStatus}
                </div>
              
                
              </div>
              {/* youtube video details */}
              <YoutubeVideoDetails videoId={videoId} />

              {/* thumbnail Generation */}
              <ThumbnailGeneration videoId={videoId}/>

              {/* title generation */}
              <TitleGeneration videoId={videoId} />

              {/* Transcriptions */}
              <Transcriptions videoId={videoId}/>
          </div>



          {/* right side */}
          <div className='order-1 lg:order-2 lg:sticky lg:top-20 h-[500px] md:h-[calc(100vh-6rem)]'>
              <AiAgentChat videoId={videoId}/>
          </div>
            
        
        </div>  
    </div>
  )
}

export default AnalysisPage
