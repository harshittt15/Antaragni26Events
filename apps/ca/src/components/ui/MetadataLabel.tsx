import { cn } from "@/lib/utils";

interface MetadataLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: "white" | "gray" | "red";
}

export function MetadataLabel({
  color = "gray",
  className,
  children,
  ...props
}: MetadataLabelProps) {
  const colorMap = {
    white: "text-foreground",
    gray: "text-muted",
    red: "text-accent",
  };

  return (
    <span
      className={cn(
        "font-sans font-semibold text-[10px] md:text-[12px] leading-[1.4] tracking-[0.1em] uppercase",
        colorMap[color],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
