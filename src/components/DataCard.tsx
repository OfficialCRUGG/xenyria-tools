import { Icon } from "@phosphor-icons/react";
import { ReactNode } from "react";

export default function DataCard({
  heading,
  icon,
  children,
}: {
  heading?: string;
  icon?: Icon;
  children?: ReactNode;
}) {
  const Icon = icon;

  return (
    <div className="bg-white bg-opacity-[2%] w-full border border-white/25 rounded-lg text-lg">
      {heading && (
        <div className="py-2 px-4 border-b border-white/25 flex items-center space-x-1.5">
          {Icon && <Icon weight="fill" />}
          <h2 className="font-semibold">{heading}</h2>
        </div>
      )}
      <div className="py-2 px-4">{children}</div>
    </div>
  );
}
