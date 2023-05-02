import { CaretDown, Icon } from "@phosphor-icons/react";
import { ReactNode } from "react";
import Card from "./Card";

export default function DataCard({
  heading,
  icon,
  children,
  open,
  onHeadingClick,
}: {
  heading?: string;
  icon?: Icon;
  children?: ReactNode;
  open?: boolean;
  onHeadingClick?: () => void;
}) {
  const Icon = icon;

  const toggleable = open !== undefined && heading;

  return (
    <Card noPadding>
      {heading && (
        <div
          className={`py-2 px-4 flex items-center justify-between ${
            !toggleable || open ? "border-b border-white/25" : ""
          } ${toggleable ? "cursor-pointer" : ""}`}
          onClick={onHeadingClick}
        >
          <div className="flex items-center space-x-1.5">
            {Icon && <Icon weight="fill" />}
            <h2 className="font-semibold">{heading}</h2>
          </div>
          {toggleable && (
            <CaretDown
              size={18}
              weight="fill"
              className={`cursor-pointer transition-all duration-200 transform ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          )}
        </div>
      )}
      {(!toggleable || open) && <div className="py-2 px-4">{children}</div>}
    </Card>
  );
}
