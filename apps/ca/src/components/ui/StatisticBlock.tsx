import { EditorialHeading } from "./EditorialHeading";
import { MetadataLabel } from "./MetadataLabel";
import { cn } from "@/lib/utils";

interface StatisticBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
  suffix?: string;
  valueColor?: "white" | "gray" | "red";
  labelColor?: "white" | "gray" | "red";
}

export function StatisticBlock({ 
  value, 
  label, 
  suffix = "", 
  valueColor = "white",
  labelColor = "red",
  className, 
  ...props 
}: StatisticBlockProps) {
  
  const valueColorMap = {
    white: "text-foreground",
    gray: "text-muted",
    red: "text-accent",
  };

  return (
    <div className={cn("flex flex-col items-start gap-2", className)} {...props}>
      <EditorialHeading variant="number" as="span" className={valueColorMap[valueColor]}>
        {value}{suffix && <span className={cn(valueColorMap[valueColor], "text-[0.8em]")}>{suffix}</span>}
      </EditorialHeading>
      <MetadataLabel color={labelColor} className="whitespace-pre-line">{label}</MetadataLabel>
    </div>
  );
}
