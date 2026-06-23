"use client";

import { motion } from "framer-motion";
import { fadeUpVariant } from "./variants";
import { BaseProps } from "@/types";

interface FadeUpProps extends BaseProps {
  delay?: number;
}

export function FadeUpWrapper({ children, className, delay = 0 }: FadeUpProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20%" }}
      variants={{
        ...fadeUpVariant,
        visible: {
          ...fadeUpVariant.visible,
          transition: {
            ...fadeUpVariant.visible.transition,
            delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}
