'use client'

import ThumbnailGeneration from '@/app/components/ThumbnailGeneration'
import TitleGeneration from '@/app/components/TitleGeneration'
import Transcriptions from '@/app/components/Transcriptions'
import Usage from '@/app/components/Usage'
import YoutubeVideoDetails from '@/app/components/YoutubeVideoDetails'
import { FeatureFlags } from '@/features/flags'
import { useParams } from 'next/navigation'
import React from 'react'

function AnalysisPage() {

  const params = useParams<{videoId: string}>();
  const { videoId } = params;

  return (
    <div className='lg:container mx-auto px-4 md:px-4'> 
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>

          {/* left side */}
          <div className='order-2 lg:order-1 flex flex-col gap-4
            bg-white lg:border-r border-gray-200 p-6'>
              {/* Analysis Section */}
              <div>
                <Usage
                  featureFlag = {FeatureFlags.ANALYSE_VIDEO}
                  title = "Analyse Video"
                />
                {/* video transcription status here - to be implemented*/}

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
              {/* Ai agent chat section */}
              <p>Chat</p>
          </div>
            
        
        </div>  
    </div>
  )
}

export default AnalysisPage
