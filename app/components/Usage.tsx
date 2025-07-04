'use client'

import { Progress } from '@/components/ui/progress'
import { FeatureFlags } from '@/features/flags'
import { useSchematicEntitlement, useSchematicIsPending } from '@schematichq/schematic-react'
import React from 'react'

function Usage({
    featureFlag,
    title
}: {
    featureFlag: FeatureFlags,
    title: string,
}) {

    const isPending = useSchematicIsPending()
    const { featureAllocation, featureUsage, value: isFeatureEnabled } = useSchematicEntitlement(featureFlag);
    const hasUsedAllTokens = featureUsage && featureAllocation && (featureUsage >= featureAllocation);

    if(isPending) {
        return <div className='text-gray-500 text-center py-4'>Loading...</div>
    }


    if(hasUsedAllTokens) {
        return (
        <div className='bg-[#121212] rounded-2xl shadow-sm border border-[#ff4da6]/20 p-6'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold text-[#f5f5f5]'>{title}</h2>
                <div className='px-4 py-4 bg-[#1a000b] rounded-lg'> 
                    <span className='font-medium text-red-500'>{featureUsage}</span>
                    <span className='text-red-400 mx-2'>/</span>
                    <span className='font-medium text-red-500'>{featureAllocation}</span>
                </div>
            </div>

            <div className='relative'>
                <Progress 
                    value={100} 
                    className='h-3 rounded-full bg-[#1e1e1e] [&>*]:bg-red-600 ' 
                />
                <p className='text-sm text-red-400 mt-2'>
                    You have used all available tokens. 
                    Please upgrade your plan to continue using this feature.
                </p>
            </div>
        </div>
    )}
    

    if(!isFeatureEnabled ) {
        return (
            <div className='bg-[#121212] rounded-2xl shadow-sm border border-zinc-700 p-6 opacity-50'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-semibold text-gray-300'>{title}</h2>
                    <div className='px-4 py-2 bg-gray-950 rounded-lg'>
                        <span className='text-red-500'>Feature Disabled</span>
                    </div>
                </div>
                <div className='relative'>
                    <Progress value={0} className='h-3 rounded-full bg-gray-100'/>
                    <p className='text-sm text-gray-500 mt-2'>
                        Please upgrade or renew your plan to use this feature. 
                    </p>
                </div>
            </div>
        )
    }

    const progress = ((featureUsage || 0) / (featureAllocation || 1)) * 100;    
    
    const getProgressColor = (percent: number) => {
        if(percent >= 80) return "[&>*]:bg-red-600";
        if(percent >= 50) return "[&>*]:bg-yellow-500";
        return "[&>*]:bg-green-400"
    }


    const progressColor = getProgressColor(progress);


  return (
    <div className='bg-black rounded-2xl p-6 border border-[#1f1f1f]'>
        <div className='flex justify-between items-center mb-4 gap-4'>
            <h2 className='text-xl font-semibold text-[#ff4da6]'>{title}</h2>
            <div className='px-4 py-2 bg-[#1e1e1e] rounded-lg'> 
                <span className='font-medium text-pink-400'>{featureUsage} / {featureAllocation}</span>
            </div>
        </div>

        <div className='relative'>
            <Progress 
                value={progress}
                className={`h-3 rounded-full  bg-[#1e1e1e]  ${progressColor} `}
            />

            {progress >= 100 ? (
                <p className='text-sm text-red-500 mt-2'>
                    You have reached your usage limit
                </p>
            ) : progress >=80 ? (
                <p className='text-sm text-yellow-400 mt-2'>
                    Warning: You are approaching to your usage limit
                </p>
            ) : null}

        </div>
    </div>
  )
}

export default Usage
