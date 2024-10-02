import { SVGProps } from "react";

// or this from Radix icons?
// IconProps extends React.SVGAttributes<SVGElement>
export type SVGBoxProps = SVGProps<SVGSVGElement>;
export type SVGStyleProps = {
  boxSize?: string;
  useBoxSize?: boolean;
  viewbox?: string;
  className?: string;
};
export type SVGIconProps = SVGBoxProps & SVGStyleProps;

export const SVG = ({
  useBoxSize = true,
  boxSize = "1em",
  viewbox = "0 0 32 32",
  className,
  ...props
}: SVGIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={viewbox}
    fill="none"
    className={className}
    style={
      useBoxSize
        ? {
            width: boxSize,
            height: boxSize,
          }
        : {}
    }
    {...props}
  >
    {props.children}
  </svg>
);
