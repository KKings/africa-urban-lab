import { Text } from "@/components/ui/text";
import clsx from "clsx";
import { cn } from "../utils";

export type SectionProps =  JSX.IntrinsicElements['div'] & {
  title?: string | null;
  description?: string | null;
  bgColor?: string;
  textColor?: string;
  fullWidth?: boolean;
  as?: React.ElementType;
};

/* Pretty much the same as the wrapper in <Section/> */

export const Section = ({
  title,
  description,
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
      className={cn(
        "py-24 md:py-32 relative",
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
        { (title || description) && 
          <div className="flex flex-col space-y-4">
            {title && (
              <Text
                as={as}
                caps
                size="subheading"
                weight="medium"
                align="center"
                color="default"
              >
                {title}
              </Text>
            )}
            {description && (
              <Text
                as="div"
                size="lead"
                align="center"
                color="default"
              >
                {description}
              </Text>
            )}
          </div>
        }
        {children}
      </div>
    </div>
  );
};
