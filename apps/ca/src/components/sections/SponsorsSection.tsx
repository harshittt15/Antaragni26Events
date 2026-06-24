"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { EditorialHeading } from "../ui/EditorialHeading";
import { GridContainer } from "../layout/GridContainer";
import { cn } from "@/lib/utils";
import { assets } from "@/lib/assets";

const sponsorGroups = [
  {
    title: "OUTREACH PARTNERS",
    logos: [
      { id: "L&T", src: assets.sponsors.intrcity, name: "Intrcity" }, // Replaced L&T with intrcity temporarily, user didn't provide L&T
      { id: "HDFC", src: assets.sponsors.vskills, name: "vSkills" }, // Replaced with vskills
    ],
  },
  {
    title: "GOODIES PARTNERS",
    logos: [
      { id: "SBI", src: assets.sponsors.easyShiksha, name: "EasyShiksha" },
      { id: "SAMSUNG", src: assets.sponsors.swashaa, name: "Swashaa" },
      { id: "HYUNDAI", src: assets.sponsors.urbanDrift, name: "Urban Drift" },
    ],
  },
  {
    title: "TRAVELLING PARTNER",
    logos: [
      { id: "productFolks", src: assets.sponsors.productFolks, name: "The Product Folks" },
      { id: "supervek", src: assets.sponsors.supervek, name: "Supervek" },
    ],
  },
];

const easeOut = [0.25, 0.1, 0.25, 1];

// Local animation variants to ensure strict isolation
const titleVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.2, ease: easeOut } 
  }
};

const dividerVariant = {
  hidden: { scaleX: 0 },
  visible: { 
    scaleX: 1, 
    transition: { duration: 1.4, ease: easeOut } 
  }
};

const labelVariant = {
  hidden: { opacity: 0, letterSpacing: "0.4em" },
  visible: { 
    opacity: 1, 
    letterSpacing: "0.2em",
    transition: { duration: 1.2, ease: easeOut } 
  }
};

const logoContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const logoVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: easeOut } 
  }
};

// Subtle parallax hook
function useParallaxMouse() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs to prevent wobble and lag
  const springConfig = { damping: 40, stiffness: 200, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Normalize coordinates from -1 to 1 based on screen size
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = (clientY / window.innerHeight) * 2 - 1;
    
    // Map to maximum 5px movement
    mouseX.set(x * 5);
    mouseY.set(y * 5);
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return { smoothX, smoothY, handleMouseMove, resetMouse };
}

export function SponsorsSection() {
  const { smoothX, smoothY, handleMouseMove, resetMouse } = useParallaxMouse();

  return (
    <section 
      id="sponsors"
      className="relative w-full flex flex-col py-12 md:py-16 overflow-hidden bg-black border-t border-white/5 lg:min-h-[85vh] lg:h-[90vh] justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
    >
      <GridContainer className="items-center h-full flex flex-col">
        
        {/* Main Content Area */}
        <div className="col-span-1 md:col-span-8 lg:col-span-12 flex flex-col w-full h-full justify-center">
          
          {/* Top Row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between w-full mb-8 lg:mb-12">
            <motion.div
              variants={titleVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h2 className="text-accent text-[clamp(20px,5vw,48px)] font-medium uppercase tracking-[0.1em] sm:tracking-[0.2em] leading-tight">
                OUR VALUED SUPPORTERS
              </h2>
            </motion.div>

            {/* Right Metadata Block */}
            <motion.div 
              className="mt-6 md:mt-2 flex flex-col items-start md:items-end gap-1 shrink-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1.2 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <span className="text-muted tracking-[0.2em] text-[10px] md:text-[11px] uppercase">
                ANTARAGNI &apos;26
              </span>
              <span className="text-muted tracking-[0.2em] text-[10px] md:text-[11px] uppercase">
                IIT KANPUR
              </span>
            </motion.div>
          </div>

          {/* Main Sponsor Wall */}
          <div className="w-full flex flex-col relative group/wall flex-grow justify-around max-h-[65vh]">
            
            {sponsorGroups.map((group, groupIndex) => (
              <motion.div 
                key={group.title} 
                className="w-full flex flex-col group/category"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {/* Thin Divider Line (Top of category) */}
                <motion.div 
                  className="w-full h-[1px] bg-white/[0.12] origin-left"
                  variants={dividerVariant}
                />
                
                <div className="w-full py-6 md:py-8 flex flex-col items-center">
                  
                  {/* Category Label */}
                  <motion.span 
                    variants={labelVariant}
                    className="text-accent text-[9px] md:text-[11px] font-medium uppercase mb-6 md:mb-8 text-center"
                  >
                    {group.title}
                  </motion.span>

                  {/* Sponsor Logos */}
                  <motion.div 
                    className="w-full flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16 lg:gap-x-24 group/logos px-4"
                    variants={logoContainerVariant}
                  >
                    {group.logos.map((sponsor) => (
                      <motion.div 
                        key={sponsor.id}
                        variants={logoVariant}
                        whileHover={{ 
                          scale: 1.03, 
                          filter: "brightness(1.2)", 
                          transition: { duration: 0.4 } 
                        }}
                        style={{ x: smoothX, y: smoothY }}
                        className="flex items-center justify-center transition-opacity duration-300 opacity-80 hover:!opacity-100 group-hover/logos:opacity-40 cursor-default"
                      >
                        <div className="relative w-[120px] md:w-[160px] lg:w-[200px] h-[60px] md:h-[80px] lg:h-[100px] flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                           <Image src={sponsor.src} alt={sponsor.name} fill className="object-contain" />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                </div>
              </motion.div>
            ))}

            {/* Final Bottom Divider */}
            <motion.div 
              className="w-full h-[1px] bg-white/[0.12] origin-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={dividerVariant}
            />
          </div>

        </div>
      </GridContainer>
    </section>
  );
}
