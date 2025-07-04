"use client"

import React from 'react'
import Form from "next/form"
import AnalyseButton from './AnalyseButton'
import { analyseYoutubeVideo } from '@/actions/analyseYoutubeVideo'
function YoutubeVideoForm() {
  return (

    <Form 
        action={analyseYoutubeVideo}
        className='w-full max-w-[480px] h-14 md:h-16 mt-4'
    >
        <div className="flex h-full rounded-xl overflow-hidden bg-[#14191f]/70 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.05)] transition-all focus-within:shadow-[0_0_0_2px_rgba(210,226,243,0.4)]">
            <div className="flex items-center px-3 border-r border-[#3b4c5e] text-[#9badc0]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
            </svg>
            </div>


            <input 
            autoFocus 
            name='url' 
            type="text" 
            placeholder='Enter YouTube Video URL'
            className='flex-1 bg-transparent text-blue-200 px-4 placeholder:text-[#94a3b8] text-sm md:text-base focus:outline-none'
            />
            <AnalyseButton/>

        </div>
    {/* </div> */}
    </Form>
   
        
  )
}

export default YoutubeVideoForm
