'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'

function AnalyseButton() {

    const {pending} = useFormStatus();

    return (
    <button 
        type='submit'
        disabled={pending} 
        className="h-full px-4 md:px-5 bg-gradient-to-r from-[#bcdaf0] to-[#d2e2f3] text-[#14191f] text-sm font-bold hover:brightness-105 transition-all rounded-r-xl cursor-pointer">
            {pending ? "Analysing..." : "Analyse"} 
    </button>
  )
}

export default AnalyseButton
