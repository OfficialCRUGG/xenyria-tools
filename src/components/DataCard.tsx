import { CaretDown, Icon } from "@phosphor-icons/react";
import { PropsWithChildren, ReactNode } from "react";
import Card from "./Card";

export default function DataCard({
  heading,
  icon,
  children,
  open,
  onHeadingClick,
  noPadding,
  tabs,
  tab,
  setTab,
  secondaryTabs,
  secondaryTab,
  setSecondaryTab,
  loading,
}: PropsWithChildren<{
  heading?: string;
  icon?: Icon;
  open?: boolean;
  onHeadingClick?: () => void;
  noPadding?: boolean;
  tabs?: string[];
  tab?: string;
  setTab?: (tab: string) => void;
  secondaryTabs?: string[];
  secondaryTab?: string;
  setSecondaryTab?: (tab: string) => void;
  loading?: boolean;
}>) {
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
      {(!toggleable || open) && (
        <>
          {tabs && (
            <div className="flex">
              {tabs.map((tabName) => (
                <div
                  key={tabName}
                  className={`flex items-center justify-center w-full py-2 px-2 border-b border-white/25 transition duration-200 ${
                    loading ? "cursor-not-allowed" : "cursor-pointer"
                  } text-sm text-center ${
                    tab === tabName
                      ? "bg-white bg-opacity-10 hover:bg-white hover:bg-opacity-[15%]"
                      : "hover:bg-white hover:bg-opacity-5"
                  }`}
                  onClick={() => !loading && setTab?.(tabName)}
                >
                  <h3 className="font-semibold">{tabName}</h3>
                </div>
              ))}
            </div>
          )}
          {secondaryTabs && (
            <div className="flex">
              {secondaryTabs.map((secondaryTabName) => (
                <div
                  key={secondaryTabName}
                  className={`flex items-center justify-center w-full py-2 border-b border-white/25 transition duration-200 cursor-pointer text-xs text-center ${
                    secondaryTab === secondaryTabName
                      ? "bg-white bg-opacity-10 hover:bg-white hover:bg-opacity-[15%]"
                      : "hover:bg-white hover:bg-opacity-5"
                  }`}
                  onClick={() =>
                    !loading && setSecondaryTab?.(secondaryTabName)
                  }
                >
                  <h4 className="font-semibold">{secondaryTabName}</h4>
                </div>
              ))}
            </div>
          )}
          <div className="relative">
            {loading && (
              <div className="h-full w-full absolute bg-black bg-opacity-25 backdrop-filter backdrop-blur-sm flex justify-center items-center">
                <div className="h-6 w-6 rounded-full border-4 border-white/25 border-r-4 border-r-white animate-spin"></div>
              </div>
            )}
            <div className={noPadding ? "" : "py-2 px-4"}>{children}</div>
          </div>
        </>
      )}
    </Card>
  );
}
