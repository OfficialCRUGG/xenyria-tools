import { Barricade } from "@phosphor-icons/react";
import MainLayout from "../layouts/MainLayout";

export default function Server() {
  return (
    <MainLayout centerContent>
      <div className="flex flex-col items-center text-center">
        <Barricade size={128} weight="fill" />
        <h1 className="font-bold text-3xl">This Page is not available yet!</h1>
      </div>
    </MainLayout>
  );
}
