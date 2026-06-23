import { Variants } from "framer-motion";

export const EASING = [0.16, 1, 0.3, 1]; // Apple-like smooth cubic-bezier
export const EASE_OUT = [0.25, 0.1, 0.25, 1];
export const EASE_IN_OUT = [0.4, 0, 0.2, 1];

// ── Basic Fades ─────────────────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: EASING,
    },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: EASING,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: EASING,
    },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.1,
      ease: EASING,
    },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.1,
      ease: EASING,
    },
  },
};

// ── Stagger Containers ───────────────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// ── Clip-Path Reveals ────────────────────────────────────────────────────────

export const revealMask: Variants = {
  hidden: {
    clipPath: "inset(100% 0 0 0)",
  },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: 1.2,
      ease: EASING,
    },
  },
};

export const revealMaskBottom: Variants = {
  hidden: {
    clipPath: "inset(0 0 100% 0)",
  },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 1.2,
      ease: EASING,
    },
  },
};

export const revealMaskLeft: Variants = {
  hidden: {
    clipPath: "inset(0 100% 0 0)",
  },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 1.3,
      ease: EASING,
    },
  },
};

// ── Line Draws ───────────────────────────────────────────────────────────────

export const lineDraw: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: EASING,
    },
  },
};

export const lineDrawY: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 1.4,
      ease: EASING,
    },
  },
};

// ── Scale Reveals ────────────────────────────────────────────────────────────

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: EASING,
    },
  },
};

// ── Letter-Spacing Expand (for labels) ──────────────────────────────────────

export const letterExpand: Variants = {
  hidden: {
    opacity: 0,
    letterSpacing: "0.5em",
  },
  visible: {
    opacity: 1,
    letterSpacing: "0.22em",
    transition: {
      duration: 1.3,
      ease: EASING,
    },
  },
};

// ── Reusable viewport config ─────────────────────────────────────────────────

// Triggers once at 20% element visibility
export const scrollReveal = { once: true, amount: 0.2 };

// Triggers once at 10% — for tall elements
export const scrollRevealEarly = { once: true, amount: 0.1 };

// Triggers once at 40% — for small elements that should be mostly visible first
export const scrollRevealLate = { once: true, amount: 0.4 };
