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

    // [PROBLEM to solve]
    console.log("values of user,title and videoId: ",user, titles, videoId);

    const {value: isTitleGenerationEnabled} = useSchematicEntitlement(FeatureFlags.TITLE_GENERATION);

    const copyToClipboard = (text:string) => {
        navigator.clipboard.writeText(text);

        toast.success("Copied to clipboard!", {
            style: {
                backgroundColor: "#16a34a", // Tailwind emerald-600
                color: "white",
                border: "1px solid #22c55e", // emerald-500
                fontSize: "14px",
                padding: "12px 16px",
                borderRadius: "8px",
            }
        });

    }

  return (
    <div className='p-4 border border-[#1f1f1f] rounded-xl bg-black shadow-sm'>
        <div className='min-w-52'>
            <Usage 
                featureFlag={FeatureFlags.TITLE_GENERATION}
                title='Title Generation'
            />
        </div>

        <div className='space-y-3 max-h-[280px] overflow-y-auto'>
            {titles?.map((title) => (
                <div key={title._id}
                    className='group relative p-4 rounded-lg border border-cyan-700
                    bg-[#121212] hover:border-cyan-500 hover:bg-black transition-all duration-200'
                >
                    <div className='flex items-center justify-between gap-4'>
                        <p className='text-sm text-zinc-200 leading-relaxed'>
                            {title.title} 
                        </p>

                        <button
                            onClick={() => {copyToClipboard(title.title)}}
                            className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 hover:bg-cyan-100/10 rounded-md'
                            title='Copy to clipboard'
                        >
                            <IconCopy className='w-4 h-4 text-cyan-400' />
                        </button>

                    </div>
                </div>
            ))}
        </div>
        
        {/* if no title generated yet */}
        {!titles?.length && !!isTitleGenerationEnabled && (
            <div className='text-center py-6 px-4 rounded-lg mt-4 border
            border-dashed border-zinc-700 bg-[#121212]'>
                <p className='text-sm text-gray-400'>No titles have been generated yet</p>
                <p className='text-xs text-gray-500 mt-1'>Generate titles to see them here</p>
            </div>
        )}

    </div>
  )
}

export default TitleGeneration
