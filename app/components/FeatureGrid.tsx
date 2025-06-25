import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  // IconAdjustmentsBolt,
  IconBrain,
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
    description:
      "Get accurate transcriptions of your videos in seconds.",
    icon:
      <IconTextCaption/>
  },
  {
    title: "Image Generation",
    description:
      "Generate Thumbnails and previews for your videos.",
    icon:
      <IconImageInPicture/>
  },
  {
    title: "Image Analysis",
    description:
      "Analyse the images of your videos for insights and trends.",
    icon:
      <IconBrain/>
  },
  {
    title: "Title Generation",
    description:
      "Generate engaging and captivating titles for your videos.",
    icon:
      <IconTiltShiftFilled/>
  },
  {
    title: "Script Generation",
    description:
      "Generate short scripts for your videos.",
    icon: <IconScript/>
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
    <motion.section
      id="features1"
      className="py-20 px-4 relative pt-16 pb-20 scroll-mt-20"
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
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
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-slate-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-200 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-800 dark:from-neutral-900 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-800 dark:from-neutral-900 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-500 dark:text-neutral-300">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-300 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
