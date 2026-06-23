export type BaseProps = {
  className?: string;
  children?: React.ReactNode;
};

export type AssetReference = {
  id: string;
  type: "image" | "svg" | "3d" | "video";
  path: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export type AnimationVariant = "fade-up" | "text-reveal" | "none";
