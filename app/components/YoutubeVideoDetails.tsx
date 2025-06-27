'use client'

import { getVideoDetails } from '@/actions/getVideoDetails'
import { VideoDetails } from '@/types/types'
import { IconCalendar, IconEye, IconMessageCircle, IconThumbUp } from '@tabler/icons-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function YoutubeVideoDetails({videoId} : {videoId: string}) {
    
    const [video, setVideo] = useState<VideoDetails | null>(null)
    
    useEffect(() => {
        const fetchVideoDetails = async () => {
            const video = await getVideoDetails(videoId);
            setVideo(video);
        }

        fetchVideoDetails();

    },[videoId])

    if(!video) {
        return (
            <div className="flex justify-center items-center h-64 gap-2">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
                <p>Loading...</p>
            </div>
        )
    }

    return (  
    <div className='@container bg-white rounded-xl'>
        {/* New STUFF - it is tailwind container query (@md) */}
        <div className='flex flex-col gap-8'>
            <div className='flex-shrink-0'>
                <Image 
                src={video.thumbnail} 
                alt={video.title} 
                width={500} 
                height={500}
                className='w-full rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300' 
                />
            </div>
           

            {/* video details */}
            <div className='flex-grow space-y-4'>
                <h1 className='text-2xl @lg:text-3xl font-bold text-gray-900
                leading-tight line-clamp-2'>
                    {video.title}
                </h1>

                {/* channel info  */}
                <div className='flex items-center gap-4'>
                    <Image 
                        src={video.channel.thumbnail} 
                        alt={video.channel.title}
                        width={48}
                        height={48}
                        className='w-10 h-10 @md:w-12 @md:h-12 rounded-full border-2 border-gray-100' 
                    />

                    <div>
                        <p className='text-base @md:text-lg font-semibold text-gray-900'>{video.channel.title}</p>
                        <p className='text-sm @md:text-base text-gray-600'>{video.channel.subscribers} subscribers</p>
                    </div>

                </div>

                {/* video stats */}
                <div className='grid grid-cols-2 @lg:grid-cols-4 gap-4 pt-4'>
                    <div className='bg-gray-50 rounded-lg p-3 transition-all
                    duration-300 hover:bg-gray-100'>
                        <div>
                            <IconCalendar className='w-4 h-4 text-gray-600'/>
                            <p className='text-sm text-gray-600'>Published</p>
                        </div>
                        <p className='font-medium text-gray-900'>
                            {new Date(video.publishedAt).toLocaleDateString()}
                        </p>
                    </div>

                    <div className='bg-gray-50 rounded-lg p-3 transition-all
                    duration-300 hover:bg-gray-100'>
                        <div>
                            <IconEye className='w-4 h-4 text-gray-600'/>
                            <p className='text-sm text-gray-600'>Views</p>
                        </div>
                        <p className='font-medium text-gray-900'>
                            {video.views}
                        </p> 
                    </div>

                    <div className='bg-gray-50 rounded-lg p-3 transition-all
                    duration-300 hover:bg-gray-100'>
                        <div>
                            <IconThumbUp className='w-4 h-4 text-gray-600'/>
                            <p className='text-sm text-gray-600'>Likes</p>
                        </div>
                        <p className='font-medium text-gray-900'>
                            {video.likes}
                        </p> 
                    </div>

                    <div className='bg-gray-50 rounded-lg p-3 transition-all
                    duration-300 hover:bg-gra y-100'>
                        <div>
                            <IconMessageCircle className='w-4 h-4 text-gray-600'/>
                            <p className='text-sm text-gray-600'>Comments</p>
                        </div>
                        <p className='font-medium text-gray-900'>
                            {video.comments}
                        </p> 
                    </div>

                </div>

            </div>
        </div>
    </div>
  )
}

export default YoutubeVideoDetails
