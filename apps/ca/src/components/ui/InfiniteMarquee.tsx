"use client";

import React from "react";
import { motion } from "framer-motion";

interface InfiniteMarqueeProps {
  text: string;
}

export function InfiniteMarquee({ text }: InfiniteMarqueeProps) {
  // We repeat the text to ensure it covers the screen width, then animate seamlessly
  const repeatedText = Array(10).fill(text);

  return (
    <div className="relative w-full overflow-hidden bg-black/80 backdrop-blur-md border-y border-white/5 py-4 md:py-5 flex items-center z-20 shadow-[0_15px_50px_rgba(0,0,0,0.8)]">
      {/* Left/Right Fades */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      
      <motion.div
        className="flex shrink-0 items-center whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
      >
        <div className="flex shrink-0 gap-8 md:gap-16 px-4 md:px-8">
          {repeatedText.map((t, i) => (
            <span key={i} className="text-white/40 text-[10px] md:text-xs tracking-[0.4em] uppercase font-medium">
              {i % 2 === 0 ? <span className="text-accent">{t}</span> : t}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 gap-8 md:gap-16 px-4 md:px-8">
          {repeatedText.map((t, i) => (
            <span key={`dup-${i}`} className="text-white/40 text-[10px] md:text-xs tracking-[0.4em] uppercase font-medium">
              {i % 2 === 0 ? <span className="text-accent">{t}</span> : t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
