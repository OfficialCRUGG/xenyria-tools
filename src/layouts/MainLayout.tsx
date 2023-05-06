import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export default function MainLayout({
  children,
  centerContent,
  tabs,
}: {
  children: ReactNode;
  centerContent?: boolean;
  tabs?: boolean;
}) {
  return (
    <div
      className="flex flex-col justify-between space-y-4"
      style={{ minHeight: "100vh" }}
    >
      {centerContent ? (
        <>
          <Navbar tabs={tabs} />
          <div>{children}</div>
          <Footer />
        </>
      ) : (
        <>
          <div>
            <Navbar tabs={tabs} />
            <div>{children}</div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
