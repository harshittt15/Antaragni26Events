"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { EditorialHeading } from "../ui/EditorialHeading";
import { EditorialSubheading } from "../ui/EditorialSubheading";
import { VerticalLabel } from "../ui/VerticalLabel";
import { StatisticBlock } from "../ui/StatisticBlock";
import { GridContainer } from "../layout/GridContainer";
import { fadeUp, fadeIn, staggerContainer, staggerFast, EASING } from "@/lib/animations";
import { assets } from "@/lib/assets";
import { useStore } from "@repo/store";
import { firebaseGoogleSignIn, firebaseGetUser } from "@repo/firebase";

export function HeroSection() {
  const { user, setUser, setLoading } = useStore();
  
  const handleLogin = async () => {
    if (!user) {
      const result = await firebaseGoogleSignIn();
      if (result) {
        await firebaseGetUser("CAs26", setUser, setLoading);
      }
    }
  };
  const { scrollY } = useScroll();
  const archY = useTransform(scrollY, [0, 500], [0, 22]);
  const bgOpacity = useTransform(scrollY, [0, 400], [0.05, 0]);

  return (
    <section id="home" className="relative w-full min-h-[calc(100vh-80px)] flex flex-col pt-8 sm:pt-12 md:pt-20 pb-12 sm:pb-20 overflow-hidden">

      {/* Film grain texture */}
      <div className="grain-overlay z-0" />

      {/* Scan line sweep */}
      <div className="scan-line z-[1]" />

      {/* Background Volumetric Spotlight */}
      <motion.div
        className="absolute top-[40%] right-[20%] w-[800px] h-[800px] pointer-events-none mix-blend-screen"
        style={{ y: archY, opacity: bgOpacity }}
      >
        <Image src={assets.textures.spotlight} alt="spotlight" fill className="object-contain" priority />
      </motion.div>

      {/* Ambient red glow bottom center */}
      <motion.div
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ opacity: bgOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 2.5, ease: EASING }}
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-accent via-accent/20 to-transparent blur-[80px]" />
      </motion.div>

      <GridContainer className="flex-grow relative z-10 items-center">
        {/* Left Side: Typography */}
        <div className="col-span-1 md:col-span-5 lg:col-span-7 flex flex-col justify-center">

          {/* Pre-title label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASING, delay: 0.1 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-6 h-[1px] bg-accent" />
            <span className="text-accent text-[10px] tracking-[0.3em] font-semibold uppercase">
              IIT Kanpur
            </span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <EditorialHeading variant="hero" as="h1" className="mb-2 text-foreground">
              ANTARAGNI
            </EditorialHeading>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={{ delay: 0.2 }}
          >
            <EditorialSubheading className="mb-10 text-foreground text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-[0.15em]">
              CAMPUS<br/>AMBASSADOR<br/>PROGRAM
            </EditorialSubheading>
          </motion.div>

          {/* Taglines with stagger */}
          <motion.div
            variants={staggerFast}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-2 mt-6 md:mt-12"
          >
            {[
              { text: "LEAD CULTURE.", color: "text-muted" },
              { text: "CREATE IMPACT.", color: "text-muted" },
              { text: "BEYOND LIMITS.", color: "text-accent" },
            ].map(({ text, color }) => (
              <motion.p
                key={text}
                variants={fadeUp}
                className={`text-[11px] font-sans font-semibold tracking-[0.22em] uppercase ${color}`}
              >
                {text}
              </motion.p>
            ))}
          </motion.div>

          {/* Decorative horizontal rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.0, ease: EASING }}
            className="w-12 h-[1px] bg-accent mt-8 origin-left"
          />

          {/* Apply Now CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: EASING }}
            className="mt-10"
          >
            {!user && (
              <motion.button
                onClick={handleLogin}
                className="btn-glow group relative border border-accent/40 bg-black/20 backdrop-blur-sm px-10 py-4 lg:px-14 lg:py-5 transition-all duration-500 ease-out hover:border-accent hover:bg-accent/10 active:scale-[0.98]"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <span className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(217,35,35,0.15), transparent)' }} />
                <span className="relative z-10 text-white text-[10px] md:text-[11px] lg:text-xs tracking-[0.35em] font-medium uppercase transition-all duration-300 group-hover:tracking-[0.42em]">
                  APPLY NOW
                </span>
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Right Side: Stats */}
        <div className="col-span-1 md:col-span-3 lg:col-span-4 flex flex-col justify-center relative mt-8 md:mt-0">

          {/* Silhouette Image */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none -z-10 -ml-20 mt-10">
            <motion.div
              className="relative w-[460px] h-[920px]"
              style={{
                y: archY,
                maskImage: "radial-gradient(ellipse at center, black 35%, transparent 85%)",
                WebkitMaskImage: "radial-gradient(ellipse at center, black 35%, transparent 85%)",
              }}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: EASING }}
            >
              <Image src={assets.hero.silhouette} alt="silhouette" fill className="object-contain" priority />
            </motion.div>
          </div>

          {/* Statistics Block */}
          <motion.div
            className="flex flex-col gap-16 items-end text-right z-10 relative"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}>
              <StatisticBlock
                value="60"
                label={"YEARS\nOF LEGACY"}
                className="items-end text-right"
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <StatisticBlock
                value="150"
                suffix="K+"
                label={"ATTENDEES"}
                className="items-end text-right"
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <StatisticBlock
                value="400"
                suffix="+"
                label={"COLLEGES"}
                className="items-end text-right"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Right Edge: Vertical Labels */}
        <motion.div
          className="hidden lg:flex lg:col-span-1 flex-col items-end justify-between h-full py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 1.4, ease: EASING }}
        >
          <div className="relative h-full flex flex-col items-center justify-between">
            {/* Top vertical label with line */}
            <div className="flex flex-col items-center gap-4">
              <VerticalLabel label="ANTARAGNI '26" color="red" />
              <motion.div
                className="w-[1px] h-32 bg-accent"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 0.5 }}
                transition={{ delay: 1.2, duration: 1.2, ease: EASING }}
                style={{ originY: 0 }}
              />
            </div>

            {/* Bottom vertical label */}
            <div className="flex flex-col items-center gap-4">
              <motion.div
                className="w-[1px] h-32 bg-accent"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 0.5 }}
                transition={{ delay: 1.4, duration: 1.2, ease: EASING }}
                style={{ originY: 1 }}
              />
              <VerticalLabel label="IIT KANPUR" color="red" />
            </div>
          </div>
        </motion.div>

      </GridContainer>
    </section>
  );
}
