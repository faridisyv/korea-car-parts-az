import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-amber-500 text-black font-bold",
        secondary:
          "border-white/10 bg-zinc-800/80 text-zinc-300",
        destructive:
          "border-transparent bg-red-500/20 text-red-400 border-red-500/30",
        outline:
          "text-foreground border-white/20",
        gold:
          "border-amber-500/40 bg-amber-500/10 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.15)]",
        green:
          "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
        blue:
          "border-sky-500/40 bg-sky-500/10 text-sky-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
