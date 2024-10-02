import { Text } from "@/components/ui/text";
import clsx from "clsx";

export type SectionProps =  JSX.IntrinsicElements['div'] & {
  title?: string | null;
  bgColor?: string;
  textColor?: string;
  fullWidth?: boolean;
  as?: React.ElementType;
};

/* Pretty much the same as the wrapper in <Section/> */

export const Section = ({
  title,
  children,
  className,
  bgColor,
  textColor,
  as = "h2",
  fullWidth = false,
  ...props
}: SectionProps) => {
  
  return (
    <div
      style={{ backgroundColor: bgColor ?? ''}} 
      className={clsx(
        "py-w24 md:py-w32 relative",
        "flex flex-col items-center justify-center",
        "space-y-w16",
        className
      )}
      {...props}
    >
      <div className={clsx([
        "space-y-12",
        {['container']: !fullWidth },
        {['w-full']: fullWidth },
      ])} style={{ color: textColor ?? ''}} >
        {title && (
          <Text
            as={as}
            caps
            serif
            size="subheading"
            weight="medium"
            align="center"
            color="default"
          >
            {title}
          </Text>
        )}
        {children}
      </div>
    </div>
  );
};
