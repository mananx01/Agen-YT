'use client'

import Link from 'next/link'
import React from 'react'
import AgentPulse from './AgentPulse'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

function Headers() {
  return (
    <header className='sticky top-0 z-50 left-0 right-0 px-4 md:px-4 bg-gradient-to-b from-slate-800 to-black backdrop-blur-sm border-b border-black'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='flex items-center justify-between h-16'>
            <Link href={"/"} className='flex items-center gap-4'>
            <AgentPulse size='small' color='blue'/>
            <h1 className='text-xl font-semibold bg-gradient-to-b from-gray-300 to-gray-500 bg-clip-text text-transparent'>AgenYT</h1>
            </Link>
        </div>

        <div className='text-white flex items-center gap-4'>
          <SignedIn>
            <Link href="/manage-plans">
              <Button 
                variant={"outline"}
                className='bg-transparent text-gray-300 font-semibold px-5 py-2 rounded-sm
                shadow-md hover:bg-slate-950 hover:text-white hover:cursor-pointer transition-all border border-pink-500'
                >Manage Plans
              </Button>
            </Link>
            <div className='p-2 w-10 h-10 flex items-center justify-center rounded-full 
            border border-pink-500 bg-slate-900 hover:bg-slate-700 transition-colors shadow-sm'>
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
