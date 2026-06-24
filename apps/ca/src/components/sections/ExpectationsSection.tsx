"use client";

import { motion } from "framer-motion";
import { EditorialHeading } from "../ui/EditorialHeading";
import { VerticalLabel } from "../ui/VerticalLabel";
import { GridContainer } from "../layout/GridContainer";
import {
  fadeUp,
  fadeIn,
  staggerContainer,
  scrollReveal,
  EASING,
} from "@/lib/animations";

const expectations = [
  {
    number: "01",
    title: "Advertise",
    description: "PROMOTE EVERY EVENT\nWITH CREATIVITY AND\nMAXIMUM REACH.",
  },
  {
    number: "02",
    title: "Organize",
    description: "PLAN AHEAD, STAY\nSTRUCTURED, AND\nDELIVER SEAMLESSLY.",
  },
  {
    number: "03",
    title: "Conduct",
    description: "ENSURE DISCIPLINE,\nRESPECT, AND THE SPIRIT\nOF EXCELLENCE.",
  },
  {
    number: "04",
    title: "Coordinate",
    description: "BRING PEOPLE TOGETHER\nAND WORK AS ONE\nTOWARDS SUCCESS.",
  },
];

export function ExpectationsSection() {
  return (
    <section id="roles" className="relative w-full flex flex-col py-16 sm:py-24 md:py-32 bg-black overflow-hidden">

      {/* Ambient bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-accent/10 via-accent/3 to-transparent blur-[60px]" />
      </div>

      <GridContainer className="items-stretch relative z-10">

        {/* Main Content Area (Left 11 Columns) */}
        <div className="col-span-1 md:col-span-7 lg:col-span-11 flex flex-col">

          {/* Top Label Block: Label on left, Line on right */}
          <div className="flex items-center gap-6 w-full mb-12 md:mb-16">
            <motion.span
              className="text-accent text-[10px] md:text-[12px] uppercase tracking-[0.25em] font-semibold whitespace-nowrap pl-1"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={scrollReveal}
              transition={{ duration: 1, ease: EASING }}
            >
              WHAT WE EXPECT
            </motion.span>
            <motion.div
              className="h-[1px] flex-grow bg-accent opacity-45 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={scrollReveal}
              transition={{ duration: 1.4, ease: EASING, delay: 0.2 }}
            />
          </div>

          {/* Headline Block: Heading and Diagonal Line */}
          <div className="relative w-full flex flex-col md:flex-row md:items-center justify-between mb-12 md:mb-24 min-h-0 md:min-h-[220px]">
            
            {/* The title "What We Expect" */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollReveal}
              transition={{ duration: 1.1, ease: EASING, delay: 0.1 }}
              className="z-10"
            >
              <EditorialHeading
                as="h2"
                variant="hero"
                className="text-[10vw] md:text-[7vw] lg:text-[76px] xl:text-[90px] text-foreground normal-case leading-[0.9] tracking-[-0.03em]"
              >
                What We Expect
              </EditorialHeading>
            </motion.div>

            {/* Diagonal Line to the right */}
            <motion.div 
              className="absolute right-[8%] lg:right-[15%] top-0 bottom-0 w-[20%] max-w-[200px] hidden md:block"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 0.6, scale: 1 }}
              viewport={scrollReveal}
              transition={{ duration: 1.4, ease: EASING, delay: 0.3 }}
            >
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="100" y1="0" x2="0" y2="100" stroke="var(--accent)" strokeWidth="1" />
              </svg>
            </motion.div>
          </div>

          {/* Expectation Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={scrollReveal}
          >
            {expectations.map((item) => (
              <motion.div
                key={item.number}
                variants={fadeUp}
                className="flex flex-col gap-6 group cursor-default"
              >
                {/* Number & Title */}
                <div className="flex flex-col gap-4">
                  <span className="text-accent font-serif text-[18px] md:text-[22px] leading-none">
                    {item.number}
                  </span>
                  <EditorialHeading
                    as="h3"
                    variant="number"
                    className="text-foreground normal-case leading-none transition-colors duration-300 group-hover:text-white"
                  >
                    {item.title}
                  </EditorialHeading>
                </div>

                {/* Description */}
                <p className="text-muted text-[10px] md:text-[11px] uppercase tracking-[0.15em] leading-[1.9] whitespace-pre-line group-hover:text-white/60 transition-colors duration-500">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* Right Rail (1 Column) */}
        <motion.div
          className="hidden lg:flex lg:col-span-1 flex-col items-end justify-start h-full pt-2"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={scrollReveal}
        >
          <div className="relative flex flex-col items-center gap-6 h-full pb-32">
            <VerticalLabel label="ANTARAGNI '26" color="red" />
            <motion.div
              className="w-[1px] flex-grow bg-accent opacity-45 origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={scrollReveal}
              transition={{ duration: 1.5, ease: EASING, delay: 0.3 }}
            />
          </div>
        </motion.div>

      </GridContainer>
    </section>
  );
}
