import { ReactNode } from "react";
import MainLayout from "./MainLayout";
import Tabs from "@/components/Tabs";
import { PlayerInterfaceJSON } from "xenyria-sdk";
import { CarSimple, PaintRoller, User } from "@phosphor-icons/react";

/* eslint-disable @next/next/no-img-element */

export default function PlayerLayout({
  children,
  player,
}: {
  children: ReactNode;
  player?: PlayerInterfaceJSON;
}) {
  return (
    <MainLayout tabs>
      <Tabs
        linkPrefix={`/player/${player?.username}`}
        tabs={
          player && [
            { href: "", label: "General", icon: User },
            { href: "/paintsquad", label: "PaintSquad", icon: PaintRoller },
            { href: "/rush", label: "Rush", icon: CarSimple },
          ]
        }
      >
        {player && (
          <div className="flex space-x-4 items-center">
            <h1 className="font-bold text-4xl">{player.username}</h1>
            {player.language === "german" ? (
              <img
                className="h-6"
                src="https://flags.blazing.works/svg/de.svg"
                alt="German"
              />
            ) : (
              <img
                className="h-6"
                src="https://flags.blazing.works/svg/us.svg"
                alt="English"
              />
            )}
          </div>
        )}
      </Tabs>
      {children}
    </MainLayout>
  );
}
