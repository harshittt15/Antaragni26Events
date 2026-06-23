import { BaseProps } from "@/types";
import { cn } from "@/lib/utils";
import React from "react";

interface DisplayHeadingProps extends BaseProps {
  variant?: "hero" | "section" | "number";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function DisplayHeading({ 
  children, 
  className, 
  variant = "section",
  as: Component = "h2"
}: DisplayHeadingProps) {
  return (
    <Component 
      className={cn(
        "font-serif uppercase tracking-tight text-foreground",
        variant === "hero" && "text-5xl md:text-7xl lg:text-[clamp(80px,8vw,160px)] leading-[0.9]",
        variant === "section" && "text-4xl md:text-6xl lg:text-[80px] leading-[0.9]",
        variant === "number" && "text-3xl md:text-5xl lg:text-[64px] leading-none text-accent",
        className
      )}
    >
      {children}
    </Component>
  );
}
