'use client'

import Link from 'next/link'
import React from 'react'
import AgentPulse from './AgentPulse'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

function Headers() {
  return (
    <header className='sticky top-0 z-50 left-0 right-0 px-4 md:px-6 
  bg-gradient-to-b from-[#2a002e] via-black to-black 
  backdrop-blur-md border-b border-black'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='flex items-center justify-between h-16'>
            <Link href={"/"} className='flex items-center gap-4'>
            <AgentPulse size='small' color='blue'/>
            <h1 className='text-xl md:text-xl font-bold tracking-wide
            bg-gradient-to-b from-[#d1d1ff] via-white to-[#a1a1ff] bg-clip-text text-transparent
            drop-shadow-[0_1px_4px_rgba(255,255,255,0.25)]'>𝗔𝗴𝗲𝗻𝗬𝗧</h1>
            </Link>
        </div>

        <div className='text-white flex items-center gap-4'>
          <SignedIn>
            <Link href="/manage-plans">
              <Button 
                variant={"ghost"}
                className='px-5 py-2 rounded-md text-sm font-medium
              bg-black/30 backdrop-blur-md border border-pink-500 text-pink-300
              hover:bg-pink-500/20 hover:text-white transition-all shadow-md'
                >Manage Plans
              </Button>
            </Link>
            <div className='w-10 h-10 rounded-full flex items-center justify-center
          bg-black/30 backdrop-blur-md border border-pink-500 text-white
          hover:bg-pink-500/20 transition-colors shadow-md'>
              <UserButton/>
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton mode='modal'>
              <Button 
              variant='ghost'
              // className='text-rose-100 text-md'
              className='rounded-3xl border-blue-800 text-md mr-4 text-black
                 bg-gradient-to-t from-blue-500 to-purple-400 cursor-pointer hover:bg-blue-900 hover:text-black'
              >
                Sign-in
              </Button>
            </SignInButton>
          </SignedOut>

          {/* <ThemeToggle/> */}
        </div>
      </div>
    </header>
  )
}

export default Headers
