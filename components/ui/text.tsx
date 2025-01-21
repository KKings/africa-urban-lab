import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
// import { ThemeColors } from "@/styles/colors.type";
// this overwrites the text-* classes. DUH CN.
// import { cn } from "@/utils/shadcn-utils";

/* TODO: prose system from textVariants */

// HTML styles for titles
// https://tailwindcss.com/docs/hover-focus-and-other-states#using-arbitrary-variants
const titleStyles = [
  "[&_em]:font-serif [&_em]:tracking-[0] [&_em]:text-[112%]",
];

export const textVariants = cva([], {
  variants: {
    variant: {
      default: "",
      link: "underline-offset-4 hover:underline link",
      markdown: "prose", // unsure it should be here?
    },
    size: {
      default: "text-base",
      inherit: "text-inherit",
      fine: "text-fine subpixel-antialiased",
      meta: "text-meta",
      small: "text-small",
      base: "text-base",
      large: "text-large",
      lead: "text-lead",
      subheading: ["text-subheading"],
      heading: ["text-heading"],
      subtitle: ["text-subtitle leading-none tracking-[-0.02em]"],
      title: ["text-title leading-none tracking-[-0.01em]"],
    },
    // These must match button.tsx
    color: {
      default: "text-inherit",
      foreground: "text-foreground",
      background: "text-background",
      primary: "text-primary",
      "primary-f": "text-primary-foreground",
      secondary: "text-secondary",
      destructive: "text-destructive",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semi: "font-semibold",
      bold: "font-bold",
      extra: "font-extrabold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    caps: {
      true: "uppercase",
    },
    inline: {
      true: "leading-none",
    },
    serif: {
      true: "font-serif",
    },
    balance: {
      true: "text-balance",
    },
    bullet: {
      true: [
        // "relative before:content-['']",
        // "before:absolute before:inline-block before:bg-current",
        // "before:-left-[1.25em] before:top-[0.66em] before:h-[0.05em] before:w-[1em]",
        "list-disc",
      ],
    },
  },
  compoundVariants: [
    // Apply classes when lead size and bold weight
    // Applied thus `button({ size: "lead", serif })`
    {
      serif: true,
      caps: true,
      size: ["subheading", "heading"],
      class: "!tracking-[0.05em]",
    },
    {
      caps: true,
      size: ["fine", "meta", "small", "large", "lead", "heading"],
      class: "!tracking-[0.05em] font-extrabold",
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "default",
    // color: "default",
    // weight: "normal",
    // align: "left",
  },
});

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: React.ElementType;
}

export const Text = ({
  as: Component = "p",
  className,
  variant,
  color,
  weight,
  align,
  size,
  caps,
  inline,
  serif,
  balance,
  bullet,
  ...props
}: TextProps) => {
  if (Component === "li") {
    bullet = true;
  }

  return (
    <Component
      {...props}
      className={clsx(
        textVariants({
          variant,
          size,
          color,
          weight,
          align,
          caps,
          inline,
          serif,
          balance,
          bullet,
          className,
        }),
        Component === "ul" ? "pl-[2em]" : ""
      )}
    >
      {/* {format ? formatText(children) : children} */}
      {props.children}
    </Component>
  );
};
