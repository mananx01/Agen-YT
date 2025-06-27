import React, { useState } from 'react'
import Usage from './Usage'
import { FeatureFlags } from '@/features/flags'
import { useSchematicEntitlement } from '@schematichq/schematic-react';

interface TranscriptEntry {
    text: string;
    timestamp:string;
}

function Transcriptions({videoId} : {videoId:string}) {

    const {featureUsageExceeded} = useSchematicEntitlement(
        FeatureFlags.TRANSCRIPTION
    );

    console.log(videoId)

    const [transcript] = useState<{
        transcript: TranscriptEntry[];
        cache: string;
    } | null >(null);
    
  return (
    <div className='border p-4 pb-0 rounded-xl gap-4 flex flex-col'>
        <Usage featureFlag={FeatureFlags.TRANSCRIPTION} title='Transcription' />
 
        {!featureUsageExceeded ? (
            <div> 
                {transcript? 
                    (transcript.transcript.map((entry,index) => (
                    <div key={index} className='flex gap-2'>
                        <span className='text-sm text-gray-400 min-w-[50px]'>{entry.timestamp}</span>
                        <p className='text-sm text-gray-700'>{entry.text}</p>
                    </div>
                    ))
                ) : (
                    <p className='text-sm text-gray-500 p-4'>No Transcriptions available</p>
                )}
            </div>
        ): null}
    
    </div>
  )
}

export default Transcriptions
