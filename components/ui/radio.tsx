import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import React from "react";
import { cn } from "../utils";
import { Label } from "./label";

const RadioGroup = RadioGroupPrimitive.Root;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    labelText?: React.ReactNode;
  }
>(({ className, children, id, labelText, ...props }, ref) => (
  <>
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "w-[25px] h-[25px] rounded-[100%] border border-foreground bg-background",
        className
      )}
      id={id}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
    { labelText && <Label htmlFor={id}>{labelText}</Label> }
  </>
));

RadioGroupItem.displayName = RadioGroupPrimitive.Indicator.displayName;

const RadioGroupIndicator = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Indicator
    ref={ref}
    className={cn(
      "flex items-center justify-center w-full h-full relative",
      'after:content-[""] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-theme-blue',
      className
    )}
    {...props}
  />
));

RadioGroupIndicator.displayName = RadioGroupPrimitive.Indicator.displayName;

const Radio = React.forwardRef<
  React.ElementRef<typeof RadioGroup>,
  React.ComponentPropsWithoutRef<typeof RadioGroup>
>(({ className, children, ...props }, ref) => (
  <RadioGroup ref={ref} className={cn("flex gap-[10px] items-center", className)} {...props}>
    {children}
  </RadioGroup>
));
Radio.displayName = RadioGroup.displayName;

export { Radio, RadioGroupItem, RadioGroupIndicator };
