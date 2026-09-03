import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm ring-offset-background placeholder:text-zinc-500 focus-visible:outline-none focus-visible:border-amber-500 focus-visible:ring-1 focus-visible:ring-amber-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all text-white resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
