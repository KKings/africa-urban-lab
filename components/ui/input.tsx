import * as React from "react";
import { cn } from "../utils";
import clsx from "clsx";
import { textVariants } from "@/components/ui/text";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const defaultInputStyle = [
  "flex h-[44px] w-full rounded-0 border border-foreground bg-background px-3 py-2 text-foreground",
  // "text-meta",
  textVariants({ size: "meta" }),
  "text-meta",
];

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={clsx(
          defaultInputStyle,
          "ring-offset-background",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
