import { BaseProps } from "@/types";
import { cn } from "@/lib/utils";

interface SectionWrapperProps extends BaseProps {
  variant?: "default" | "compact" | "hero";
  id?: string;
}

export function SectionWrapper({ children, className, variant = "default", id }: SectionWrapperProps) {
  return (
    <section 
      id={id}
      className={cn(
        "w-full flex flex-col items-center",
        variant === "default" && "py-12 md:py-[80px] lg:py-[160px]",
        variant === "compact" && "py-8 md:py-[48px] lg:py-[80px]",
        variant === "hero" && "min-h-screen pt-[120px] pb-12",
        className
      )}
    >
      {children}
    </section>
  );
}
