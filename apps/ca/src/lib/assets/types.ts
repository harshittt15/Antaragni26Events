export type AssetKey = 
  | "logo-monogram"
  | "hero-silhouette"
  | "crowd-photo"
  | "portrait-testimonial"
  | "team-1"
  | "product-plaque";

export interface Asset {
  id: AssetKey;
  path: string;
  type: "image" | "svg" | "3d";
  alt: string;
}
