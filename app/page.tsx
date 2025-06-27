'use client'

// import { Card, CardContent } from "@/components/ui/card";
// import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { FeatureCard } from "./components/FeatureCard";
import clsx from "clsx";
// import { Separator } from "@/components/ui/separator";
import { WavyBackground } from "@/components/ui/wavy-background";
// import { Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { FeaturesSectionDemo } from "./components/FeatureGrid";
import YoutubeVideoForm from "./components/YoutubeVideoForm";



export default function Home() {

//   const features = [
//   {
//     title: "Transcription",
//     description:
//       "Get accurate transcriptions of your videos in seconds.",
//     image:
//       "Transcription.jpeg",
//   },
//   {
//     title: "Image Generation",
//     description:
//       "Generate Thumbnails and previews for your videos.",
//     image:
//       "Image-Generation.jpeg",
//   },
//   {
//     title: "Image Analysis",
//     description:
//       "Analyse the images of your videos for insights and trends.",
//     image:
//       "Image-analysis.jpeg",
//   },
//   {
//     title: "Title Generation",
//     description:
//       "Generate engaging and captivating titles for your videos.",
//     image:
//       "Title-generator.jpeg",
//   },
//   {
//     title: "Script Generation",
//     description:
//       "Generate short scripts for your videos.",
//     image:
//       "Script-generation.jpeg",
//   },
// ];


const steps =[
  {
    title: "1. Connect Your Content",
    description: "Connect your videos to our platform, and we'll analyze and process them for you.",
    icon : "Video",
  },
  {
    title: "2. AI Agent Analysis",
    description: "Our AI agents will analyze your videos and provide insights, recommendations, and feedback.",
    icon : "Brain",
  },
  { 
    title: "3. Recieve Insights",
    description: "Receive real-time insights and recommendations on your videos.",
    icon : "MessageSquare",
  }

];


const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1], // easeInOut
    },
  },
};


  return (

    <div
      className="relative flex min-h-screen flex-col bg-black overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
       

        {/* Main */}
        <main className="flex flex-1 justify-center px-4 md:px-40">
          <div className="w-full max-w-[960px]">
        
          <WavyBackground
              backgroundFill="black"
              colors={["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"]}
              waveWidth={60}
              blur={20}
              speed="slow"
              waveOpacity={0.4}
              containerClassName="min-h-screen"
            >

              <section className="flex flex-col items-center justify-center gap-6 bg-cover bg-center bg-no-repeat min-h-[480px] rounded-xl">

                <div className="text-center max-w-2xl px-4">
                  <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight bg-clip-text bg-gradient-to-r from-[#bcdaf0] to-[#d2e2f3 text-gray-300 drop-shadow-[0_2px_6px_rgba(255,255,255,0.2)]">
                    Unlock the Power of Content with <span className="text-blue-950">AgenYT</span>
                  </h1>
                  <p className="mt-4 text-sm md:text-base text-slate-100 max-w-xl mx-auto leading-relaxed">
                    Create faster. Engage better. Let AgenYT generate titles, scripts, transcriptions, thumbnails, and insights — all from your videos.
                  </p>  
                </div>

                <YoutubeVideoForm/>

              </section>
              
            </WavyBackground>


            {/* skew scroll bg divider */}
            {/* <div className="relative h-64 overflow-hidden bg-transparent border-transparent">
              <div className="absolute top-0 left-0 w-full h-full transform skew-y-[-6deg] bg-gradient-to-l from-[#51b9e6] to-[#7f88d4] opacity-20" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                <h2 className="text-3xl font-bold">Supercharge Your Workflow</h2>
                <p className="text-sm text-slate-100">AI meets creativity. Elevate your content.</p>
              </div>
            </div> */}

            {/* <Parallax speed={-15}>
              <div className="relative h-[300px] overflow-hidden rounded-2xl w-full">
                <div className="absolute inset-0 bg-[url('/parallex.jpg')] bg-cover bg-center opacity-30" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white drop-shadow-lg">
                    Let Your Content Shine
                  </h2>
                  <p className="mt-2 text-base text-[#cbd5e1]">
                    AgenYT brings AI power right into your video workflow.
                  </p>
                </div>
              </div>
            </Parallax> */}

            {/* <section
              className="flex flex-col items-center justify-center gap-6 bg-cover bg-center bg-no-repeat min-h-[480px] p-4 rounded-xl"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url('landingPage3.jpg')`,
              }}
            >
              <div className="text-center max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-[-0.033em]">
                  Unlock Power of Content By AgenYT
                </h1>
                <p className="text-sm md:text-base text-[#d1d5db] mt-2">
                  Unleash the power of content creation with AgenYT.
                </p>
              </div>  

              <div className="w-full max-w-[480px] h-14 md:h-16">
                <div className="flex h-full rounded-xl overflow-hidden bg-[#14191f]/70 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.05)] transition-all focus-within:shadow-[0_0_0_2px_rgba(210,226,243,0.4)]">
                  <div className="flex items-center px-3 border-r border-[#3b4c5e] text-[#9badc0]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                    </svg>
                  </div>

                  <input
                    placeholder="Enter YouTube URL"
                    className="flex-1 bg-transparent text-white px-4 placeholder:text-[#94a3b8] text-sm md:text-base focus:outline-none"
                  />

                  <button className="h-full px-4 md:px-5 bg-gradient-to-r from-[#bcdaf0] to-[#d2e2f3] text-[#14191f] text-sm font-bold hover:brightness-105 transition-all rounded-r-xl">
                    Analyze
                  </button>
                </div>
              </div>
            </section> */}

            <motion.section
              id="features"
              className="py-20 px-4 relative pt-16 pb-20 scroll-mt-20"
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >

              <div className="mx-auto w-full max-w-screen-xl">
                <div className="text-center mb-10">
                  <h2
                    className={clsx(
                      "text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight",
                      "bg-gradient-to-r from-[#d2e2f3] to-white text-transparent bg-clip-text"
                    )}
                  >
                    Discover What You Can Do
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-[#9badc0]">
                    Powerful tools to transform your videos with ease.
                  </p>
                </div>


                <FeaturesSectionDemo/>
              </div>

            </motion.section>
                    

            {/* how it works section */}
            <section className="py-20 px-4 relative sm:px-8 lg:px-20 bg-black overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="rounded-2xl absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#1f2937] via-transparent to-[#0f172a] opacity-30" />
              </div>
              <div className="relative z-10 mx-auto w-full max-w-screen-xl">
                <div className="text-center mb-16">
                  <h2
                    className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-transparent bg-gradient-to-r from-[#d2e2f3] to-white bg-clip-text"
                  >
                    Meet Your AI Agent in 3 Simple Steps
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-[#9badc0]">
                    Get more done with fewer clicks. Here’s how it works:
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-10">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-xl border border-[#2a3542] bg-[#1a202c]/60 backdrop-blur-md transition-all hover:shadow-[0_0_12px_#38bdf8] hover:border-blue-500"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow-lg">
                        {/* Placeholder for icon or emoji */}
                        <span className="text-2xl">{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                      <p className="text-[#cbd5e1]">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          
          </div>
        </main>

        {/* Footer */}
        <footer className="flex justify-center px-4">
          <div className="w-full max-w-[960px] text-center py-10">
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              <a className="text-[#9badc0] text-base" href="#">Contact Us</a>
              <a className="text-[#9badc0] text-base" href="#">Privacy Policy</a>
              <a className="text-[#9badc0] text-base" href="#">Terms of Service</a>
            </div>
            <p className="text-[#9badc0] text-base">© 2025 AgenYT. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
