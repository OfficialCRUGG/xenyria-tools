import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export default function MainLayout({
  children,
  centerContent,
}: {
  children: ReactNode;
  centerContent?: boolean;
}) {
  return (
    <div
      className="flex flex-col justify-between space-y-4"
      style={{ minHeight: "100vh" }}
    >
      {centerContent ? (
        <>
          <Navbar />
          <div>{children}</div>
          <Footer />
        </>
      ) : (
        <>
          <div>
            <Navbar />
            <div>{children}</div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
