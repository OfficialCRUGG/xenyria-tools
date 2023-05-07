import { Icon } from "@phosphor-icons/react";
import { ReactNode } from "react";

export default function Card({
  children,
  noPadding,
}: {
  children?: ReactNode;
  noPadding?: boolean;
}) {
  return (
    <div className="bg-white bg-opacity-[2%] w-full border border-white/25 rounded-lg text-lg overflow-hidden">
      {!noPadding ? (
        <div className="py-2 px-4">{children}</div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}
