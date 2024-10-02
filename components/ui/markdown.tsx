import { default as ReactMarkdown } from "react-markdown";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import remarkUnwrapImages from "remark-unwrap-images";

export const components = {
  a: (props: any) => {
    const { node: _, ...rest } = props;
    const isExternal = /^(https?:)?\/\//.test(rest.href);
    return isExternal ? (
      <a
        className="link"
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      />
    ) : (
      <Link className="link" {...rest} />
    );
  },

  // Pass down Text styles to Markdown w/o rendering a p tag.
  // Wrap p tag as Fragment so we can in turn wrap Markdown in Text?
  // This would only work when the markdown string arrives in a p tag!
  p: (props: any) => {
    const { children, node, ...rest } = props;
    return <Text as="p">{children}</Text>;
  },

  ul: (props: any) => <Text as="ul" {...props} />,
  li: (props: any) => <Text as="li" {...props} />,
  blockquote: (props: any) => <blockquote className="py-2" {...props} />,
  h1: (props: any) => <Text as="h1" {...props} />,
  h2: (props: any) => (
    <Text as="h2" size="meta" caps className="pt-w8 first:pt-0" {...props} />
  ),
  h3: (props: any) => (
    <Text
      as="h3"
      size="inherit"
      weight="extra"
      className="pt-w8 pb-2 first:pt-0 last:pb-0"
      {...props}
    />
  ),
  img: (props: any) => <img className="mx-auto" {...props} />,
};

// remarkPlugins={[remarkBreaks]}? Just use `\` for line breaks.
export const Markdown = ({ children, className }: { children: string, className?: string }) => {
  return (
    <ReactMarkdown className={className} remarkPlugins={[remarkUnwrapImages]} components={components}>
      {children}
    </ReactMarkdown>
  );
};
