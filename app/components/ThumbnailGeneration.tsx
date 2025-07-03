'use client'

import { useUser } from '@clerk/nextjs'
import React from 'react'
import Usage from './Usage';
import { FeatureFlags } from '@/features/flags';
import Image from 'next/image';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useSchematicEntitlement } from '@schematichq/schematic-react';

function ThumbnailGeneration({videoId} : {videoId : string}) {
    const { user } = useUser()

    const images = useQuery(api.images.getImages, {
        videoId, 
        userId: user?.id ?? "",
    }); // generated thumbnails array (pull from convex db)

    const {value: isImageGenerationEnabled} = useSchematicEntitlement(FeatureFlags.IMAGE_GENERATION);

    return (
    <div className='rounded-xl flex flex-col p-4 border bg-black border-black'>
        <div className='min-w-52'>
            <Usage
                featureFlag={FeatureFlags.IMAGE_GENERATION}
                title='Thumbnail Generation'
            />
        </div>

        {/* Grid layout for images (non-scrollable) */}
        <div className={`flex flex-wrap gap-4 ${images?.length ? "mt-4" : ""}`}>
            {images?.map(
                (image) =>
                image.url && (
                    <div
                    key={image._id}
                    className="w-[200px] h-[110px] rounded-lg overflow-hidden border border-gray-700"
                    >
                    <Image
                        src={image.url}
                        alt="Generated Thumbnail"
                        width={200}
                        height={110}
                        className="object-cover w-full h-full rounded-lg"
                    />
                    </div>
                )
            )}
        </div>


        {/* no images generated yet */}
        {!images?.length && !!isImageGenerationEnabled && (
            <div className='text-center py-8 px-4 rounded-lg mt-4 border-2 
            border-dashed border-gray-500 bg-gray-950'>
                <p className='text-gray-500'>No thumbnails have been generated yet</p>
                <p className='text-sm text-gray-400 mt-1'>Generate Thumbnails to see them here</p>
            </div>
        )}

    </div> 
  )
}

export default ThumbnailGeneration
