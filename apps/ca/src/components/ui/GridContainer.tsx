import { BaseProps } from "@/types";
import { cn } from "@/lib/utils";

interface GridContainerProps extends BaseProps {
  columns?: 4 | 8 | 12;
}

export function GridContainer({ children, className, columns = 12 }: GridContainerProps) {
  return (
    <div 
      className={cn(
        "max-w-[1440px] mx-auto px-4 md:px-8 w-full grid gap-4 md:gap-6", 
        columns === 12 ? "grid-cols-1 md:grid-cols-8 lg:grid-cols-12" : "",
        columns === 8 ? "grid-cols-1 md:grid-cols-4 lg:grid-cols-8" : "",
        columns === 4 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "",
        className
      )}
    >
      {children}
    </div>
  );
}
