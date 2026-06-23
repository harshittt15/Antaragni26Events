import { cn } from "@/lib/utils";

interface GridContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GridContainer({ children, className, ...props }: GridContainerProps) {
  return (
    <div 
      className={cn(
        "w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-4 lg:gap-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
