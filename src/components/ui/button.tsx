import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-amber-500 text-black hover:bg-amber-400 shadow-lg shadow-amber-500/20 font-bold",
        gold:
          "bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-black hover:brightness-110 shadow-lg shadow-amber-500/25 font-extrabold uppercase tracking-wide",
        destructive:
          "bg-red-500/90 text-white hover:bg-red-600 shadow-md shadow-red-500/20",
        outline:
          "border border-white/15 bg-white/5 hover:bg-white/10 hover:border-amber-500/50 text-white",
        secondary:
          "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700",
        ghost:
          "hover:bg-white/10 text-zinc-300 hover:text-white",
        link:
          "text-amber-400 underline-offset-4 hover:underline",
        glass:
          "glass-panel hover:border-amber-500/60 text-white hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-13 rounded-xl px-8 py-3.5 text-base font-bold",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
