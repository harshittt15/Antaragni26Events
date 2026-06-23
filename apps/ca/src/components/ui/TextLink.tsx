import { BaseProps } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface TextLinkProps extends BaseProps {
  href: string;
  variant?: "nav" | "cta";
}

export function TextLink({ children, className, href, variant = "nav" }: TextLinkProps) {
  return (
    <Link 
      href={href}
      className={cn(
        "font-sans uppercase text-xs tracking-wider transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        variant === "nav" && "text-muted hover:text-foreground",
        variant === "cta" && "text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-accent after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300",
        className
      )}
    >
      {children}
    </Link>
  );
}
