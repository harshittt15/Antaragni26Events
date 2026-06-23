import { cn } from "@/lib/utils";
import { MetadataLabel } from "./MetadataLabel";

interface VerticalLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  color?: "white" | "gray" | "red";
}

export function VerticalLabel({ label, color = "red", className, ...props }: VerticalLabelProps) {
  return (
    <div 
      className={cn("flex items-center justify-center opacity-80 whitespace-nowrap", className)} 
      style={{ 
        writingMode: 'vertical-rl', 
        textOrientation: 'mixed',
        wordBreak: 'keep-all',
        overflowWrap: 'normal'
      }}
      {...props}
    >
      <MetadataLabel color={color}>{label}</MetadataLabel>
    </div>
  );
}
