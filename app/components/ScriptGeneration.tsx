"use client"

// import { Switch } from '@/components/ui/switch';
import { FeatureFlags } from '@/features/flags';
import { useUser } from '@clerk/nextjs';
import { useSchematicEntitlement } from '@schematichq/schematic-react';
import React from 'react'
// import Usage from './Usage';


function ScriptGeneration({videoId} : {videoId: string}) {
 
    const {user} = useUser();

    if(!user?.id) {
        throw new Error('User not Found');
    }

    const {value: isScriptGenerationEnabled} = useSchematicEntitlement(FeatureFlags.SCRIPT_GENERATION);
    console.log("Fetching script for videoID: ", videoId)
    
    return (
    
    <div className='border-[#1f1f1f] rounded-2xl bg-black shadow-sm'> 

      <div className='min-w-52'>

        <div className='rounded-2xl shadow-sm border border-zinc-700 p-6'>
          <div className='flex justify-between items-center mb-4 gap-4'>
            <h2 className='text-xl font-semibold text-[#ff4da6]'>Script Generation</h2>
            <div className='px-4 py-2 bg-black rounded-lg'>
              {isScriptGenerationEnabled? 
              (
                <span className='text-green-500'>Feature Enabled</span>
              ) :
              (
                <span className='text-red-500'>Feature Disabled</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">
              {isScriptGenerationEnabled
                ? 'You have access to this feature.'
                : 'Please upgrade or renew your plan to use this feature.'}
            </span>
           
          </div>
        </div>
        
      </div>
    </div>
    
  )
}

export default ScriptGeneration
