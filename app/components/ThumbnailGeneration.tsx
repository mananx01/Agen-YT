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
    <div className='rounded-xl flex flex-col p-4 gap-4 bg-black border border-[#1f1f1f]'>
      <div className='min-w-52'>
        <Usage
          featureFlag={FeatureFlags.IMAGE_GENERATION}
          title='Thumbnail Generation'
        />
      </div>

      {/* Grid layout for images (non-scrollable) */}
      {/* <div className={`flex flex-wrap gap-4 ${images?.length ? "mt-4" : ""}`}> */}
        
      {images?.length ? (
        <div className="flex flex-wrap gap-4 mt-2">
        {images.map((image) => (
          <div
            key={image._id}
            className="w-[200px] h-[110px] overflow-hidden rounded-lg border border-[#2c2c2c]"
          >
            <Image
              src={image.url ?? "/fallback-thumbnail.jpg"}
              alt="Generated Thumbnail"
              width={200}
              height={110}
              className="object-cover w-full h-full"
            />
          </div>
      ))}
    </div>

  ) : isImageGenerationEnabled ? (
    <div className="text-center py-6 px-4 rounded-lg border border-dashed border-[#444] bg-[#121212]">
      <p className="text-sm text-gray-400">No thumbnails have been generated yet</p>
      <p className="text-xs text-gray-500 mt-1">Generate thumbnails to see them here</p>
    </div>

  ) : null}

  </div> 
  )
}

export default ThumbnailGeneration
