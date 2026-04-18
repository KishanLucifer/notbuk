import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[100px] w-full rounded-lg border border-input bg-secondary/50 px-4 py-3 text-sm text-foreground",
        "placeholder:text-muted-foreground",
        "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
        "transition-all duration-200 resize-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "backdrop-blur-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
