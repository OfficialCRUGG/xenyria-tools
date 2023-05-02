import Link from "next/link";
import ActiveLink from "./ActiveLink";
import { HardDrives, User, Wrench } from "@phosphor-icons/react";

const links = [
  { href: "/", label: "User Lookup", icon: User, alternativePrefix: "/user" },
  { href: "/server", label: "Server Stats", icon: HardDrives },
  { href: "/more-tools", label: "More Tools", icon: Wrench },
];

export default function Navbar() {
  return (
    <div style={{ height: "60px" }}>
      <div className="flex justify-center fixed w-full bg-gray-900 bg-opacity-75 backdrop-filter backdrop-blur-lg">
        <div className="flex justify-between w-full max-w-4xl py-3">
          <Link className="flex items-center space-x-2 cursor-pointer" href="/">
            <h1 className="text-2xl font-bold">Xenyria Tools</h1>
            <span className="bg-red-500 rounded-full px-2.5 font-medium">
              Beta
            </span>
          </Link>
          <div className="flex h-full items-center space-x-2">
            {links.map(({ href, label, icon: Icon, alternativePrefix }) => (
              <ActiveLink
                key={`${href}`}
                activeClassName="bg-white bg-opacity-10 hover:bg-white hover:bg-opacity-[15%] transition duration-200"
                className="h-full px-4 py-1.5 flex justify-center items-center text-md bg-white bg-opacity-0 hover:bg-white hover:bg-opacity-5 transition duration-200 rounded-full flex items-center space-x-2"
                href={href}
                alternativePrefix={alternativePrefix}
              >
                <Icon size={18} weight="fill" />
                <span>{label}</span>
              </ActiveLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
