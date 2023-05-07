import Link from "next/link";
import ActiveLink from "./ActiveLink";
import { HardDrives, List, User, Wrench } from "@phosphor-icons/react";
import Container from "./Container";
import Sheet from "react-modal-sheet";
import { useState } from "react";

const links = [
  { href: "/", label: "User Lookup", icon: User, alternativePrefix: "/player" },
  { href: "/server", label: "Server Stats", icon: HardDrives },
  { href: "/more-tools", label: "More Tools", icon: Wrench },
];

export default function Navbar({ tabs }: { tabs?: boolean }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div
      className={tabs ? "fixed w-full" : undefined}
      style={{ height: "60px" }}
    >
      <div
        className={`flex justify-center w-full ${
          tabs ? "bg-gray-800" : "bg-gray-900 fixed"
        } bg-opacity-75 backdrop-filter backdrop-blur-lg`}
      >
        <Container className="flex justify-between w-full py-3">
          <Link className="flex items-center space-x-2 cursor-pointer" href="/">
            <h1 className="text-2xl font-bold">Xenyria Tools</h1>
            <span className="bg-red-500 rounded-full px-2.5 font-medium">
              Beta
            </span>
          </Link>
          <div className="h-full items-center space-x-2 hidden md:flex">
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
          <div className="h-full items-center space-x-2 flex md:hidden">
            <div
              className="h-full px-4 py-1.5 flex justify-center items-center text-md bg-white bg-opacity-5 transition duration-200 rounded-full flex items-center space-x-2 cursor-pointer"
              onClick={() => {
                setMobileNavOpen(true);
              }}
            >
              <List size={18} weight="fill" />
              <span>Menu</span>
            </div>
          </div>
        </Container>
      </div>
      <Sheet
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        detent="content-height"
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div className="flex flex-col space-y-2 pb-4 px-6">
              {links.map(({ href, label, icon: Icon, alternativePrefix }) => (
                <ActiveLink
                  key={`${href}`}
                  activeClassName="bg-white !bg-opacity-[8%] hover:bg-white hover:bg-opacity-[15%] transition duration-200"
                  className="h-full px-2 py-2 flex justify-start items-center text-xl font-medium bg-white bg-opacity-[4%] transition duration-200 rounded-xl flex items-center space-x-4"
                  href={href}
                  alternativePrefix={alternativePrefix}
                >
                  <div className="bg-white bg-opacity-5 rounded-xl flex items-center justify-center p-3">
                    <Icon size={22} weight="fill" />
                  </div>
                  <span>{label}</span>
                </ActiveLink>
              ))}
            </div>
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop onTap={() => setMobileNavOpen(false)} />
      </Sheet>
    </div>
  );
}
