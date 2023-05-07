import { PropsWithChildren } from "react";

export default function Container({
  children,
  className,
  noPadding,
}: PropsWithChildren<{
  className?: string;
  noPadding?: boolean;
}>) {
  return (
    <div
      className={`max-w-5xl mx-auto ${
        noPadding ? "" : "px-6 md:px-0 "
      }${className}`}
    >
      {children}
    </div>
  );
}
