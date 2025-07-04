import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  // IconBrain,
  IconImageInPicture,
  IconScript,
  IconTextCaption,
  IconTiltShiftFilled,
} from "@tabler/icons-react";
import { Variants } from "framer-motion";

export function FeaturesSectionDemo() {
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
    // {
    //   title: "Image Analysis",
    //   description: "Analyse the images of your videos for insights and trends.",
    //   icon: <IconBrain size={32} stroke={1.5} />,
    // },
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
      transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] },
    },
  };

  return (
    <motion.section
      id="features1"
      className="py-20 px-4 relative scroll-mt-20 rounded-2xl"
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-7xl mx-auto gap-6">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </motion.section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  // index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col py-10 px-6 w-48 h-64 rounded-2xl bg-[#1a1a1a]/60 backdrop-blur-md transition-all border border-[#2a2a2a]",
        "hover:border-fuchsia-500 hover:shadow-[0_0_20px_#d946ef50]"
      )}
    >
      <div className="mb-4 relative z-10 text-blue-300 flex justify-start items-center">
        <div className="p-3 bg-gradient-to-br from-fuchsia-600 to-indigo-500 rounded-full shadow-lg">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-sm text-slate-300">{description}</p>
    </div>
  );
};
