'use client'

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface Feature {
  image: string;
  title: string;
  description: string;
}

export function FeatureCard({ feature }: { feature: Feature }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0, scale: 1 },
        hidden: { opacity: 0, y: 20, scale: 0.95 },
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="group relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-[#1a2029]/60 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-transform hover:scale-[1.04] hover:shadow-2xl duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer">
            {/* Image with overlay */}
            <div className="relative aspect-video bg-cover bg-center" style={{ backgroundImage: `url('${feature.image}')` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-lg font-semibold">{feature.title}</h3>
                <Badge variant="secondary" className="text-xs text-[#14191f] bg-[#d2e2f3] shadow-md">
                  AI
                </Badge>
              </div>
              <p className="text-[#b1c0d6] text-sm leading-relaxed">{feature.description}</p>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent className="bg-white text-black border-none shadow-md">
          {`Click to learn more about ${feature.title}`}
        </TooltipContent>
      </Tooltip>
    </motion.div>
  );
}
