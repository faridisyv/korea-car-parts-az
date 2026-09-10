import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-500/20 font-bold",
        primary:
          "bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-500/20 font-bold",
        gold:
          "bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-500/20 font-bold",
        emerald:
          "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-500/20 font-bold",
        soft:
          "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/80 font-bold",
        softEmerald:
          "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/80 font-bold",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-500/20",
        outline:
          "border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 shadow-sm",
        secondary:
          "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/70",
        ghost:
          "hover:bg-slate-100 text-slate-600 hover:text-slate-900",
        link:
          "text-blue-600 underline-offset-4 hover:underline",
        glass:
          "bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50 shadow-sm",
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
