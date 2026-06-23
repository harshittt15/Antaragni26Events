import { cn } from "@/lib/utils";

export function DividerLine({ className }: { className?: string }) {
  return (
    <hr className={cn("w-full border-t border-[#262626] m-0", className)} aria-orientation="horizontal" />
  );
}
