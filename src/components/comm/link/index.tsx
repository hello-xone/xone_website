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
    <a {...rest} href={href} target="_blank" className={className}>
      {children}
    </a>
  );
};
