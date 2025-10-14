import { PropsWithChildren } from "react";

export const Link = ({
  children,
  href,
  className,
  ...rest
}: PropsWithChildren<{
  href: string;
  className?: string;
  [key: string]: any;
}>) => {
  return (
    <a {...rest} href={href} target="_blank" rel="nofollow noopener noreferrer" className={className}>
      {children}
    </a>
  );
};
