import clsx from "clsx";
import NextLink from "next/link";
import { AnchorHTMLAttributes } from "react";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  underline?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  href,
  underline,
  children,
  ...props
}) => {

  const isExternal = /^(https?:)?\/\/|mailto:|tel:/.test(href);

  return isExternal ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(underline ? "link" : "")}
      {...props}
    >
      {children}
    </a>
  ) : (
    <NextLink href={href} className={clsx(underline ? "link" : "")} {...props}>
      {children}
    </NextLink>
  );
};
