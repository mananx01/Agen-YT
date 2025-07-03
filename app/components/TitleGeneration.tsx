'use client'

import { useUser } from '@clerk/nextjs'
import React from 'react'
import Usage from './Usage';
import { FeatureFlags } from '@/features/flags';
import { useSchematicEntitlement } from '@schematichq/schematic-react';
import { IconCopy } from '@tabler/icons-react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from "sonner"

function TitleGeneration({videoId} : {videoId: string}) {

    const { user } = useUser()
    const titles = useQuery(api.titles.list, {
        videoId, 
        userId: user?.id ?? "",  
    });

    console.log("values of user,title and videoId: ",user, titles, videoId);

    const {value: isTitleGenerationEnabled} = useSchematicEntitlement(FeatureFlags.TITLE_GENERATION);

    const copyToClipboard = (text:string) => {
        console.log("Copied to clipboard!");
        navigator.clipboard.writeText(text);
      
        toast.success("Copied to clipboard!", {
        style: {
            backgroundColor: "#10b985", // Tailwind emerald-500
            color: "white",
        },
        });

    }

  return (
    <div className='p-4 border border-black rounded-xl bg-black shadow-sm'>
        <div className='min-w-52'>
            <Usage 
                featureFlag={FeatureFlags.TITLE_GENERATION}
                title='Title Generation'
            />
        </div>

        <div className='space-y-3 mt-4 max-h-[280px] overflow-y-auto'>
            {titles?.map((title) => (
                <div key={title._id}
                    className='group relative p-4 rounded-lg border border-blue-500
                    bg-gray-950 hover:border-blue-900 hover:bg-transparent transition-all duration-200'
                >
                    <div className='flex items-center justify-between gap-4'>
                        <p className='text-sm text-gray-200 leading-relaxed'>
                            {title.title} 
                        </p>

                        <button
                            onClick={() => {copyToClipboard(title.title)}}
                            className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 hover:bg-blue-100 rounded-md'
                            title='Copy to clipboard'
                        >
                            <IconCopy className='w-4 h-4 text-blue-600' />
                        </button>

                    </div>
                </div>
            ))}
        </div>
        
        {/* if no title generated yet */}
        {!titles?.length && !!isTitleGenerationEnabled && (
            <div className='text-center py-8 px-4 rounded-lg mt-4 border-2 
            border-dashed border-gray-500 bg-gray-950'>
                <p className='text-gray-500'>No titles have been generated yet</p>
                <p className='text-sm text-gray-400 mt-1'>Generate titles to see them here</p>
            </div>
        )}


    </div>
  )
}

export default TitleGeneration
