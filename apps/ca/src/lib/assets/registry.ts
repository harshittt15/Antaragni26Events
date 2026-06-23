import { Asset, AssetKey } from "./types";

export const AssetRegistry: Record<AssetKey, Asset> = {
  "logo-monogram": {
    id: "logo-monogram",
    path: "/logos/antaragni-monogram.svg",
    type: "svg",
    alt: "Antaragni Monogram Logo"
  },
  "hero-silhouette": {
    id: "hero-silhouette",
    path: "/images/hero-silhouette.webp",
    type: "image",
    alt: "Silhouette of a person standing on stage"
  },
  "crowd-photo": {
    id: "crowd-photo",
    path: "/images/manifesto-crowd.webp",
    type: "image",
    alt: "Massive concert crowd"
  },
  "portrait-testimonial": {
    id: "portrait-testimonial",
    path: "/images/testimonial-bg.webp",
    type: "image",
    alt: "Testimonial portrait"
  },
  "team-1": {
    id: "team-1",
    path: "/portraits/team-member-1.webp",
    type: "image",
    alt: "Team member portrait"
  },
  "product-plaque": {
    id: "product-plaque",
    path: "/products/incentive-plaque.webp",
    type: "image",
    alt: "Plaque of honour"
  }
};
