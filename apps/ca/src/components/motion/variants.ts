import { motionTokens } from "@/styles/tokens/motion";

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: motionTokens.durations.medium,
      ease: motionTokens.easing.premium
    }
  }
};

export const textRevealParentVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const textRevealChildVariant = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: {
      duration: motionTokens.durations.long,
      ease: motionTokens.easing.premium
    }
  }
};
