'use client'

// import { Card, CardContent } from "@/components/ui/card";
// import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { FeatureCard } from "./components/FeatureCard";
// import clsx from "clsx";
// import { Separator } from "@/components/ui/separator";
import { WavyBackground } from "@/components/ui/wavy-background";
// import { Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
// import { FeaturesSectionDemo } from "./components/FeatureGrid";
import YoutubeVideoForm from "./components/YoutubeVideoForm";
import {
  IconBrain,
  IconImageInPicture,
  IconScript,
  IconTextCaption,
  IconTiltShiftFilled,
} from "@tabler/icons-react";


export default function Home() {


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


const features = [
  {
    title: "Transcription",
    description: "Get accurate transcriptions of your videos in seconds.",
    icon: <IconTextCaption size={32} stroke={1.5} />,
  },
  {
    title: "Image Generation",
    description: "Generate Thumbnails and previews for your videos.",
    icon: <IconImageInPicture size={32} stroke={1.5} />,
  },
  {
    title: "Image Analysis",
    description: "Analyse the images of your videos for insights and trends.",
    icon: <IconBrain size={32} stroke={1.5} />,
  },
  {
    title: "Title Generation",
    description: "Generate engaging and captivating titles for your videos.",
    icon: <IconTiltShiftFilled size={32} stroke={1.5} />,
  },
  {
    title: "Script Generation",
    description: "Generate short scripts for your videos.",
    icon: <IconScript size={32} stroke={1.5} />,
  },
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
                    Unlock the Power of Content with <span className="text-[#2a002e]">AgenYT</span>
                  </h1>
                  <p className="mt-4 text-sm md:text-base text-slate-100 max-w-xl mx-auto leading-relaxed">
                    Create faster. Engage better. Let AgenYT generate titles, scripts, transcriptions, thumbnails, and insights — all from your videos.
                  </p>  
                </div>

                <YoutubeVideoForm/>
              </section>
              
            </WavyBackground>

        
          {/* Features section */}
            {/* <motion.section
              id="features"
              className="relative mb-20 py-20 px-4 sm:px-8 lg:px-20 scroll-mt-20 bg-gradient-to-t from-[#19001b] via-black to-black overflow-hidden rounded-2xl"
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
            
              <div className="absolute inset-0 pointer-events-none">
                <div className="rounded-2xl absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#3c0056] via-transparent to-black opacity-20" />
              </div>

              <div className="relative z-10 mx-auto w-full max-w-screen-xl">
                <div className="text-center mb-16">
                  <h2
                    className={clsx(
                      "text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight",
                      "text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-transparent bg-gradient-to-r from-pink-100 via-blue-200 to-white bg-clip-text drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                    )}
                  >
                    Discover What You Can Do
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-[#c5b9d6]">
                    Powerful tools to transform your videos with ease.
                  </p>
                  <FeaturesSectionDemo />

                </div>
              </div>
            </motion.section> */}



            {/* skew scroll bg divider */}
          
            {/* Features new section */}
            <motion.section 
              id="features"
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="py-20 px-4 relative mt-20 sm:px-8 lg:px-20 bg-gradient-to-t from-[#19001b] via-black to-black overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="rounded-2xl absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#3c0056] via-transparent to-black opacity-25" />
              </div>

              <div className="relative z-10 mx-auto w-full max-w-screen-xl">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-transparent bg-gradient-to-r from-pink-100 via-blue-200 to-white bg-clip-text drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                    Discover What You Can Do
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-[#c5b9d6]">
                    Powerful tools to transform your videos with ease.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl border border-[#4c1d95] bg-[#1a1a1a]/60 backdrop-blur-md
                      transition-all hover:shadow-[0_0_14px_#e879f9] hover:border-fuchsia-400"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full 
                      bg-gradient-to-br from-purple-700 to-pink-500 text-white shadow-lg">
                        <span className="text-2xl font-bold">{feature.icon}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                      <p className="text-[#d0d0f0] text-sm">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>



          {/* how it works section */}
            <motion.section 
              id="features"
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="py-20 px-4 relative mt-20 sm:px-8 lg:px-20 bg-gradient-to-t from-[#19001b] via-black to-black overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="rounded-2xl absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#3c0056] via-transparent to-black opacity-25" />
              </div>

              <div className="relative z-10 mx-auto w-full max-w-screen-xl">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-transparent bg-gradient-to-r from-pink-100 via-blue-200 to-white bg-clip-text drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                    Meet Your AI Agent in 3 Simple Steps
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-[#c5b9d6]">
                    Get more done with fewer clicks. Here’s how it works:
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl border border-[#4c1d95] bg-[#1a1a1a]/60 backdrop-blur-md
                      transition-all hover:shadow-[0_0_14px_#e879f9] hover:border-fuchsia-400"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full 
                      bg-gradient-to-br from-purple-700 to-pink-500 text-white shadow-lg">
                        <span className="text-2xl font-bold">{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                      <p className="text-[#d0d0f0] text-sm">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>



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
