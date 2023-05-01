import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex flex-col justify-between space-y-4"
      style={{ minHeight: "100vh" }}
    >
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
