'use client'

import React, { useEffect, useRef } from 'react'
import {useChat, Message} from '@ai-sdk/react'
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { FeatureFlags } from '@/features/flags';
import { useSchematicFlag } from '@schematichq/schematic-react';
import { BotIcon, ImageIcon, LetterTextIcon, Pen, Send } from 'lucide-react';
import { toast } from 'sonner';


interface ToolInvocation {
    toolCallId: string;
    toolName: string;
    result?: Record<string,unknown>;
}

interface ToolPart {
    type: "tool-invocation";
    toolInvocation: ToolInvocation;
}

const formateToolInvocation = (part: ToolPart) => { 
    if(!part.toolInvocation) return "Unknown tool invocation";
    return `🔧 Tool Used: ${part.toolInvocation.toolName}`;
}


function AiAgentChat({videoId} : {videoId: string}) {

    // scrolling to bottom 
    const bottomRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);


    const { messages, input, handleInputChange, handleSubmit, append, status } = useChat({
        maxSteps: 5,
        body : {
            videoId,
        },
    });


    const isScriptGenerationEnabled = useSchematicFlag(
        FeatureFlags.SCRIPT_GENERATION
    );
    const isImageGenerationEnabled = useSchematicFlag(
      FeatureFlags.IMAGE_GENERATION
    );
    const isTitleGenerationEnabled = useSchematicFlag(
        FeatureFlags.TITLE_GENERATION
    );
    const isVideoAnalysisEnabled = useSchematicFlag(
        FeatureFlags.ANALYSE_VIDEO
    );

    useEffect(() => {
        if(bottomRef.current && messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
             messagesContainerRef.current.scrollHeight;
        }
    },[messages])

    useEffect(()=>{

        let toastId;

        switch(status) {
            case "submitted":
                toastId = toast("AgenYT is thinking...",{
                    id: toastId,
                    icon: <BotIcon className='w-4 h-4'/>
                });
                break;
            case "streaming":
                toastId = toast("AgenYT is repying...",{
                    id: toastId,
                    icon: <BotIcon className='w-4 h-4'/>
                });
                break;
            case "error":
                toastId = toast("Oops ! Something went wrong, please try again !",{
                    id: toastId,
                    icon: <BotIcon className='w-4 h-4'/>
                });
                break;
            case "ready":
                toast.dismiss(toastId);
                break;
            
        }

    },[status]);


    const generateScript = async () => {
        const randomId = Math.random().toString(36).substring(2,15);

        const userMessage: Message = {
            id: `generate-script-${randomId}`,
            role: "user", 
            content : 
            `Generate a step-by-step script for this video that I can use on my own channel
            to produce a video that is similar to this one, dont do any other steps such as generating a image or
            generating a title, just generate the script only!`
        };
        append(userMessage);
    }

    const generateTitle = async () => {
        const randomId = Math.random().toString(36).substring(2,15);

        const userMessage: Message = {
            id: `generate-title-${randomId}`,
            role: "user", 
            content : 
            `Generate a attractive and cachy title which best suit this video's content.`
        };
        append(userMessage);
    }

    const generateImage = async () => {
        const randomId = Math.random().toString(36).substring(2,15);

        const userMessage: Message = {
            id: `generate-image-${randomId}`,
            role: "user", 
            content : 
            `Generate a thumbnail image for this video which matches or resembles with the content of this video.`
        };
        append(userMessage);
    }




  return (
    <div className='text-white flex flex-col h-full'>
        <div className='hidden lg:block px-4 pb-3 border-b border-pink-900 '>
            <h2 className='text-lg font-semibold text-gray-200'>AI AgenYT</h2>
        </div>

        <div 
            className='flex-1 overflow-y-auto px-4 py-4' 
            ref={messagesContainerRef}
        >
            <div className='space-y-6'>
                {/* if no messages */}
                {messages.length == 0 && (
                    <div className='flex items-center justify-center h-full min-h-[200px]'>
                        <div className='text-center space-y-2'>
                            <h3 className='text-lg font-medium text-gray-700'>Welcome to AI Agent Chat</h3>
                            <p className='text-gray-500 text-sm'>Ask any question about your video!</p>
                        </div>
                    </div>
                )}

                {messages.map((m) => (
                    <div
                    key={m.id}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div 
                        className={`max-w-[85%] ${m.role === "user" ? "bg-pink-700" : "bg-purple-200 text-black"} rounded-2xl px-4 py-3`}
                        >
                        {m.parts && m.role === "assistant" ? (
                            //assistant message 
                            <div className="space-y-3">
                                {m.parts.map((part,index) => 
                                    part.type === "text" ? (
                                        <div key={index} className='prose prose-sm max-w-none'>
                                           <ReactMarkdown>{part.text}</ReactMarkdown>
                                        </div>
                                    ) : part.type === "tool-invocation" ? (
                                        <div key={index} className="bg-white/50 rounded-lg p-2 space-y-2 text-gray-800"> 
                                            <div className='font-medium text-xs'>
                                                {formateToolInvocation(part as ToolPart)}
                                            </div>
                                            {(part as ToolPart).toolInvocation.result && (
                                                <pre className='text-xs bg-whie/75 p-2 rounded overflow-auto max-h-40'>
                                                    {JSON.stringify(
                                                        (part as ToolPart).toolInvocation.result,
                                                        null,
                                                        2
                                                    )}
                                                </pre>
                                            )}
                                        </div>
                                    ) : null
                                )}
                            </div>
                        ): (
                            //user message
                            <div className='prose prose-sm max-w-none text-white'>
                                <ReactMarkdown>{m.content}</ReactMarkdown>
                            </div> 
                        )}  
                        </div>
                    </div>
                ))}

                <div ref={bottomRef}/>

            </div>
        </div>

        {/* input form */}

        <div className='border-t border-pink-900 p-4 bg-black'>
            <div className='space-y-3'>
                <form onSubmit={handleSubmit} className='flex gap-2'>

                    {/* <button 
                        className='rounded-full bg-pink-700 p-2'
                        onClick={()=> {
                            setOpen(!open)
                        }}
                    >
                        <BotIcon/>
                    </button> */}

                    <input 
                    className='flex-1 px-4 py-2 text-sm text-gray-200 border border-gray-700 
                    rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent'
                    type="text" 
                    placeholder={
                        !isVideoAnalysisEnabled 
                        ? "Upgrade to ask anything about the video..."
                        : "Ask any question about your video..."
                    }
                    value={input}
                    onChange={handleInputChange}
                    />
                    <Button
                        type='submit'
                        disabled={
                            status === "streaming" || 
                            status === "submitted" || 
                            !isVideoAnalysisEnabled
                        }
                        className='px-4 py-2 bg-pink-700 text-white text-sm rounded-full
                        hover:bg-pink-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                    {
                        status === "streaming" ? "AI is replying..." 
                        : status === "submitted" ? "AI is thinking..."
                        : <Send/>
                    }
                    </Button>
                </form>

                {/* buttons  */}
                <div className='flex gap-2'>
                <button
                    className='text-xs xl:text-sm w-full flex items-center justify-center gap-2 py-2 px-4 bg-pink-700
                    hover:bg-pink-900 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
                    onClick={generateScript}
                    type = 'button'
                    disabled={!isScriptGenerationEnabled}
                >
                    <LetterTextIcon className='w-4 h-4'/>
                    {isScriptGenerationEnabled? (
                        <span>Generate Script</span>
                    ):(
                        <span>Upgrade to generate a script</span>
                    )}
                </button>   

                <button
                    className='text-xs xl:text-sm w-full flex items-center justify-center gap-2 py-2 px-4 bg-pink-700
                    hover:bg-pink-900 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
                    onClick={generateTitle}
                    type = 'button'
                    disabled={!isTitleGenerationEnabled}
                >
                    <Pen className='w-4 h-4'/>
                    {isTitleGenerationEnabled? (
                        <span>Generate Title</span>
                    ):(
                        <span>Upgrade to generate a title</span>
                    )}
                </button>   

                <button
                    className='text-xs xl:text-sm w-full flex items-center justify-center gap-2 py-2 px-4 bg-pink-700
                    hover:bg-pink-900 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
                    onClick={generateImage}
                    type = 'button'
                    disabled={!isImageGenerationEnabled}
                >
                    <ImageIcon className='w-4 h-4'/>
                    {isImageGenerationEnabled? (
                        <span>Generate Image</span>
                    ):(
                        <span>Upgrade to generate a image</span>
                    )}
                </button>   
                </div>
            </div>
        </div>


    </div>
  )
}

export default AiAgentChat
