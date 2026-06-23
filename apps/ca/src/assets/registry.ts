export const assets = {
  logos: {
    main: "/logos/antaragni-logo.svg",
    mark: "/logos/antaragni-mark.svg",
    iitk: "/logos/iitk-logo.svg",
  },

  hero: {
    stage: "/hero/hero-stage.jpg",
    smoke: "/hero/hero-smoke-overlay.png",
  },

  spirit: {
    crowd: "/spirit/spirit-crowd.jpg",
    background: "/spirit/spirit-background.jpg",
  },

  testimonials: {
    main: "/testimonials/ca-testimonial.jpg",
  },

  incentives: {
    certificate: "/incentives/certificate.png",
    medal: "/incentives/medal.png",
    bottle: "/incentives/bottle.png",
    cap: "/incentives/cap.png",
    giftBox: "/incentives/gift-box.png",
  },

  contact: {
    ambassador1: "/contact/ambassador-1.jpg",
    ambassador2: "/contact/ambassador-2.jpg",
    ambassador3: "/contact/ambassador-3.jpg",
    ambassador4: "/contact/ambassador-4.jpg",
    ambassador5: "/contact/ambassador-5.jpg",
  },

  sponsors: {
    samsung: "/sponsors/samsung.svg",
    cocaCola: "/sponsors/coca-cola.svg",
    hyundai: "/sponsors/hyundai.svg",
    hdfc: "/sponsors/hdfc.svg",
  },
} as const;

export type AssetRegistry = typeof assets;
