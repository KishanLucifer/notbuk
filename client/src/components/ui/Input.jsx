import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-lg border border-input bg-secondary/50 px-4 py-2 text-sm text-foreground",
        "placeholder:text-muted-foreground",
        "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
        "transition-all duration-200",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "backdrop-blur-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
