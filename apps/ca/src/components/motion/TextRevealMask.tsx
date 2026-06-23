"use client";

import { motion } from "framer-motion";
import { textRevealParentVariant, textRevealChildVariant } from "./variants";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  lines: string[];
  className?: string;
  as?: React.ElementType;
}

export function TextRevealMask({ lines, className, as: Component = "h2" }: TextRevealProps) {
  return (
    <motion.div
      className={cn("flex flex-col", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20%" }}
      variants={textRevealParentVariant}
      aria-label={lines.join(" ")}
    >
      {lines.map((line, index) => (
        <span key={index} className="overflow-hidden block" aria-hidden="true">
          <motion.span className="block" variants={textRevealChildVariant}>
            {line}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
