import clsx from "clsx";
import NextLink from "next/link";
import { AnchorHTMLAttributes, forwardRef } from "react";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  underline?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, underline, children, ...props }: LinkProps, ref) => {
    const isExternal = /^(https?:)?\/\/|mailto:|tel:/.test(href);

    return isExternal ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        ref={ref}
        className={clsx(underline ? "link" : "")}
        {...props}
      >
        {children}
      </a>
    ) : (
      <NextLink
        href={href}
        ref={ref}
        className={clsx(underline ? "link" : "")}
        {...props}
      >
        {children}
      </NextLink>
    );
  }
);
Link.displayName = "Link";