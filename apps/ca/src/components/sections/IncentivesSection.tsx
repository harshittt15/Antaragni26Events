"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { EditorialHeading } from "../ui/EditorialHeading";
import { assets } from "@/lib/assets";
import { VisualEditor } from "../editor/VisualEditor";
import { EditableElement } from "../editor/EditableElement";
import { scrollReveal } from "@/lib/animations";

const TAGLINES = ["RECOGNITION.", "EXPERIENCE.", "GROWTH.", "LEGACY."];

export function IncentivesSection() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const stageAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Spotlight Lerp Tracking
    let requestRef: number;
    let mouseX = window.innerWidth / 2;
    let currentOffsetX = 0;

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
    };

    const tick = () => {
      if (spotlightRef.current) {
        const halfW = window.innerWidth / 2;
        const targetOffsetX = mouseX - halfW;
        currentOffsetX += (targetOffsetX - currentOffsetX) * 0.12;
        spotlightRef.current.style.transform = `translateX(${currentOffsetX}px)`;
      }
      requestRef = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", handlePointerMove);
    requestRef = requestAnimationFrame(tick);

    // 2. Intro Animation via classList — does NOT set inline transform/opacity,
    //    so CSS hover rules (.item-column.is-visible:hover) are never overridden.
    if (stageAreaRef.current) {
      const items = stageAreaRef.current.querySelectorAll('.item-column') as NodeListOf<HTMLElement>;
      items.forEach((item, i) => {
        item.style.transitionDelay = `${0.45 + i * 0.13}s`;
        requestAnimationFrame(() => requestAnimationFrame(() => {
          item.classList.add('is-visible');
        }));
      });
    }

    return () => {
      cancelAnimationFrame(requestRef);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <VisualEditor>
      <section
        id="incentives"
        className="relative w-full flex flex-col pt-4 md:pt-6 pb-12 overflow-hidden border-t border-white/5 bg-[#050505] min-h-screen"
      >
        {/* Base BG */}
        <div className="absolute inset-0 bg-[#050505] -z-10" />

        {/* Moving Spotlight */}
        <EditableElement id="spotlight" className="absolute inset-0 z-5 pointer-events-none">
          <div ref={spotlightRef} className="spotlight-overlay" />
        </EditableElement>

        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col flex-1 min-h-0 relative z-10">

          {/* ── HEADER ROW: Title + Taglines side-by-side ─────────────────── */}
          <EditableElement id="title" className="flex-shrink-0">
            <div className="incentives-header">

              {/* Left: Big Heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <EditorialHeading variant="section" className="text-foreground leading-none">
                  INCENTIVES
                </EditorialHeading>
              </motion.div>

              {/* Right: Taglines in a horizontal row */}
              <motion.div
                className="incentives-taglines"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                {TAGLINES.map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="incentives-tagline-item"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.4 + i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

            </div>
          </EditableElement>

          {/* ── STAGE ─────────────────────────────────────────────────────── */}
          <div className="stage-wrapper mt-auto">
            <div className="stage-container">

              <EditableElement id="pedestals">
                <img
                  src={assets.incentives.pedestals}
                  alt="Exhibition Platforms"
                  className="stage-base drop-shadow-2xl opacity-90 brightness-[0.85]"
                />
              </EditableElement>

              <div className="stage-area" ref={stageAreaRef}>

                {/* 01: Certificate */}
                <div className="item-column">
                  <div className="item-img-wrap" style={{ transform: "translateX(-20%)" }}>
                    <EditableElement id="certificate-image">
                      <img
                        src={assets.incentives.certificate}
                        alt="Certificate"
                        className="item-img"
                        style={{ height: "100%" }}
                      />
                    </EditableElement>
                  </div>
                  <EditableElement id="certificate-label" className="item-label">
                    <span className="item-number text-accent">01</span>
                    <span className="item-name text-white/70">CERTIFICATE</span>
                  </EditableElement>
                </div>

                {/* 02: Pronite Pass */}
                <div className="item-column">
                  <div className="item-img-wrap" style={{ transform: "translateX(-9%)" }}>
                    <EditableElement id="pass-image">
                      <img
                        src={assets.incentives.pass}
                        alt="Pronite Pass"
                        className="item-img"
                        style={{ height: "72%" }}
                      />
                    </EditableElement>
                  </div>
                  <EditableElement id="pass-label" className="item-label">
                    <span className="item-number text-accent">02</span>
                    <span className="item-name text-white/70">PRONITE PASS</span>
                  </EditableElement>
                </div>

                {/* 03: Merchandise */}
                <div className="item-column">
                  <div className="item-img-wrap">
                    <EditableElement id="merchandise-image">
                      <img
                        src={assets.incentives.merchandise}
                        alt="Merchandise"
                        className="item-img"
                        style={{ height: "105%" }}
                      />
                    </EditableElement>
                  </div>
                  <EditableElement id="merchandise-label" className="item-label">
                    <span className="item-number text-accent">03</span>
                    <span className="item-name text-white/70">MERCHANDISE</span>
                  </EditableElement>
                </div>

                {/* 04: Opportunities */}
                <div className="item-column">
                  <div className="item-img-wrap">
                    <EditableElement id="opportunities-image">
                      <img
                        src={assets.incentives.opportunities}
                        alt="Opportunities"
                        className="item-img"
                        style={{ height: "82%" }}
                      />
                    </EditableElement>
                  </div>
                  <EditableElement id="opportunities-label" className="item-label">
                    <span className="item-number text-accent">04</span>
                    <span className="item-name text-white/70">OPPORTUNITIES</span>
                  </EditableElement>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>
    </VisualEditor>
  );
}
