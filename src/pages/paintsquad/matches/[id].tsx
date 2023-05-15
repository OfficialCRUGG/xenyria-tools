import MainLayout from "@/layouts/MainLayout";
import { Barricade } from "@phosphor-icons/react";

export default function Match() {
  return (
    <MainLayout centerContent>
      <div className="flex flex-col items-center text-center">
        <Barricade size={128} weight="fill" />
        <h1 className="font-bold text-3xl">Match View is not available yet!</h1>
      </div>
    </MainLayout>
  );
}
