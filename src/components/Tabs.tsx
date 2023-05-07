import { Icon } from "@phosphor-icons/react";
import { ReactNode } from "react";
import ActiveLink from "./ActiveLink";
import Container from "./Container";

export default function Tabs({
  children,
  tabs,
  linkPrefix = "",
}: {
  children?: ReactNode;
  tabs?: {
    href: string;
    label: string;
    icon: Icon;
  }[];
  linkPrefix?: string;
}) {
  return (
    <div className="bg-gray-800" style={{ paddingTop: "60px" }}>
      <Container
        className="flex flex-col md:flex-row justify-between"
        noPadding
      >
        {children && <div className="py-2 px-6 md:px-0">{children}</div>}
        {tabs && (
          <div className="flex">
            {tabs.map(({ href, label, icon: Icon }) => (
              <ActiveLink
                key={href}
                href={linkPrefix + href}
                className="h-full flex justify-center items-center px-4 space-x-1 border-b-4 border-transparent bg-white bg-opacity-0 hover:bg-white hover:bg-opacity-5 transition duration-200 rounded-t-lg flex-grow md:flex-grow-0 py-2 md:py-0"
                activeClassName="!border-white"
              >
                <Icon size={18} weight="fill" />
                <span>{label}</span>
              </ActiveLink>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
