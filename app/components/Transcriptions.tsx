import React, { useCallback, useEffect, useState } from 'react'
import Usage from './Usage'
import { FeatureFlags } from '@/features/flags'
import { useSchematicEntitlement } from '@schematichq/schematic-react';
import { getYoutubeTranscript } from '@/actions/getYoutubeTranscript';

interface TranscriptEntry {
    text: string;
    timestamp:string;
}

function Transcriptions({videoId} : {videoId:string}) {

    const [transcript,setTranscript] = useState<{
        transcript: TranscriptEntry[];
        cache: string;
    } | null >(null);

    const {featureUsageExceeded} = useSchematicEntitlement(
        FeatureFlags.TRANSCRIPTION
    );

    console.log(videoId)

    const handleGenerateTranscription = useCallback(
        async (videoId: string) => {
            if(featureUsageExceeded) {
                console.log("Transcription limit reached, the user must upgrade")
                return;
            }

            const result = await getYoutubeTranscript(videoId);
            setTranscript(result);
        },
        [featureUsageExceeded]
    )
   
    useEffect(() => {
        handleGenerateTranscription(videoId);
    },[handleGenerateTranscription, videoId])

  return (
    <div className='border border-[#1f1f1f] bg-black p-4 pb-0 rounded-2xl gap-4 flex flex-col'>
        <Usage featureFlag={FeatureFlags.TRANSCRIPTION} title='Transcription' />
 
        {!featureUsageExceeded ? (
            <div className='max-h-96 overflow-y-auto space-y-2 p-2 bg-[#121212] rounded-lg custom-scrollbar'> 
                {transcript? 
                    (transcript.transcript.map((entry,index) => (
                    <div key={index} className='flex gap-2 items-start'>
                        <span className='text-sm text-blue-500 min-w-[55px]'>{entry.timestamp}</span>
                        <p className='text-sm text-zinc-300 leading-snug'>{entry.text}</p>
                    </div>
                    ))
                ) : (
                    <p className='text-sm text-zinc-500 p-4 text-center'>No Transcriptions Available</p>
                )}
            </div>
        ): null}
    
    </div>
  )
}

export default Transcriptions
