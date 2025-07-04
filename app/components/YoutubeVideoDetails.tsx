'use client'

import { getVideoDetails } from '@/actions/getVideoDetails'
import { VideoDetails } from '@/types/types'
import { IconCalendar, IconEye, IconMessageCircle, IconThumbUp } from '@tabler/icons-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import VideoDescription from './VideoDescription'

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
    <div className='@container bg-black rounded-xl text-[#f5f5f5]'>
        
        <div className='flex flex-col gap-8'>
            <div className='flex-shrink-0'>
                <Image 
                src={video.thumbnail} 
                alt={video.title} 
                width={500} 
                height={500}
                className='w-full rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 mask-auto' 
                />
            </div>
           

            {/* video details */}
            <div className='flex-grow space-y-4'>
                <h1 className='text-2xl @lg:text-3xl font-bold text-white
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
                        className='w-10 h-10 @md:w-12 @md:h-12 rounded-full border-2 border-[#1c1c1e]' 
                    />

                    <div>
                        <p className='text-base @md:text-lg font-semibold text-[#e0e0e0]'>{video.channel.title}</p>
                        <p className='text-sm @md:text-base text-zinc-400'>{video.channel.subscribers} subscribers</p>
                    </div>

                </div>

                {/* video stats */}
                <div className='grid grid-cols-2 @lg:grid-cols-4 gap-4 pt-4'>
                    <div className='bg-[#121212] rounded-lg p-3 transition-all
                    duration-300 hover:bg-[#1c1c1e]'>
                        <div>
                            <IconCalendar className='w-4 h-4 text-gray-500'/>
                            <p className='text-sm text-gray-200'>Published</p>
                        </div>
                        <p className='font-medium text-gray-300'>
                            {new Date(video.publishedAt).toLocaleDateString()}
                        </p>
                    </div>

                    <div className='bg-[#121212] rounded-lg p-3 transition-all
                    duration-300 hover:bg-[#1c1c1e]'>
                        <div>
                            <IconEye className='w-4 h-4 text-gray-500'/>
                            <p className='text-sm text-gray-300'>Views</p>
                        </div>
                        <p className='font-medium text-gray-300'>
                            {video.views}
                        </p> 
                    </div>

                    <div className='bg-[#121212] rounded-lg p-3 transition-all
                    duration-300 hover:bg-[#1c1c1e]'>
                        <div>
                            <IconThumbUp className='w-4 h-4 text-gray-500'/>
                            <p className='text-sm text-gray-300'>Likes</p>
                        </div>
                        <p className='font-medium text-gray-300'>
                            {video.likes}
                        </p> 
                    </div>

                    <div className='bg-[#121212] rounded-lg p-3 transition-all
                    duration-300 hover:bg-[#1c1c1e]'>
                        <div>
                            <IconMessageCircle className='w-4 h-4 text-gray-500'/>
                            <p className='text-sm text-gray-300'>Comments</p>
                        </div>
                        <p className='font-medium text-gray-300'>
                            {video.comments}
                        </p> 
                    </div>

                </div>

                <VideoDescription description={video.description} />

            </div>
        </div>
    </div>
  )
}

export default YoutubeVideoDetails
