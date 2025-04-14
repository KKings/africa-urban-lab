import * as React from "react";
import { cn } from "../utils";
import clsx from "clsx";
import { textVariants } from "@/components/ui/text";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const labelStyle = [
  textVariants({ size: "small", caps: true }),
  "text-small",
];

export const defaultInputStyle = [
  "flex h-[44px] w-full rounded-0 border border-foreground bg-background px-3 py-2 text-foreground",
  // "text-meta",
  textVariants({ size: "small" }),
  "text-small",
];

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, children, ...props }, ref) => {
    return (
      <>
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
        {children}
      </>
    );
  }
);
Input.displayName = "Input";

const FileInput = React.forwardRef<
  HTMLInputElement,
  InputProps & { defaultValue?: string, onOpen?: () => void; }
>(({ className, autoFocus, name, defaultValue, onOpen, onChange, ...props }, ref) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [isDirty, setIsDirty] = React.useState(false);
  const [randoKey, setRandoKey] = React.useState(Math.random().toString(36));
  const fileName = !isDirty && !fileInputRef?.current?.files?.[0]?.name && defaultValue
    ? defaultValue
    : isDirty && fileInputRef?.current?.files?.[0]?.name ? fileInputRef?.current?.files?.[0]?.name : 'No file chosen';

  const handleOnChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true);
    onChange?.(event);
  }, [onChange])

  const handleOnClick = React.useCallback(() => {
    setIsDirty(true);
    if (fileInputRef.current) {
      fileInputRef?.current?.click();
    }
    onOpen?.();
  }, [fileInputRef.current]);
  return (
    <div
      key={randoKey}
      className={clsx(
        defaultInputStyle,
        "ring-offset-background",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "flex items-center gap-4",
        className
      )}
    >
      <input
        type={"file"}
        style={{ display: "none" }}
        onChange={handleOnChange}
        ref={(node) => {
          fileInputRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        {...props}
      />
      <button
        type="button"
        autoFocus={autoFocus}
        className={clsx(
          "h-[calc(100%+18px)] px-4 py-0 bg-theme-grey text-white -ml-3"
        )}
        onClick={handleOnClick}
      >
        Choose File
      </button>
      {fileName}
    </div>
  );
});
FileInput.displayName = "FileInput";

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={clsx(
        defaultInputStyle,
        "h-auto",
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
});
TextArea.displayName = "TextArea";

export { Input, TextArea, FileInput };
