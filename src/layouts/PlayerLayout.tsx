import { ReactNode } from "react";
import MainLayout from "./MainLayout";
import Tabs from "@/components/Tabs";
import { PlayerInterfaceJSON, PlayerRank } from "xenyria-sdk";
import { CarSimple, PaintRoller, SmileySad, User } from "@phosphor-icons/react";
import dynamic from "next/dynamic";
import RankBadge from "@/components/RankBadge";

/* eslint-disable @next/next/no-img-element */

const ReactSkinview3d = dynamic(() => import("react-skinview3d"), {
  ssr: false,
});

export default function PlayerLayout({
  children,
  player,
  rank,
  notFound,
}: {
  children: ReactNode;
  player?: PlayerInterfaceJSON;
  rank?: PlayerRank;
  notFound?: boolean;
}) {
  return (
    <MainLayout tabs>
      {notFound || !player || !rank ? (
        <div className="flex flex-col items-center text-center">
          <SmileySad size={128} weight="fill" />
          <h1 className="font-bold text-3xl">
            This user doesn&apos;t appear to have played on Xenyria.
          </h1>
        </div>
      ) : (
        <>
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
            <div className="flex space-x-4 items-center">
              <h1 className="font-bold text-3xl">{player.username}</h1>
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
          </Tabs>
          <div className="max-w-5xl mx-auto w-full px-6 md:px-0">
            <div className="flex flex-col-reverse md:flex-row gap-6 mt-6 md:mt-4">
              <div className="flex flex-col space-y-4 w-full md:w-[250px]">
                <div className="border border-white/25 rounded-lg checkerboard h-[400px] w-full md:w-[250px] flex items-center justify-center">
                  <ReactSkinview3d
                    skinUrl={`https://crafatar.com/skins/${player.uuid}`}
                    capeUrl={`https://crafatar.com/capes/${player.uuid}`}
                    height="400"
                    width="250"
                    onReady={({ viewer }) => {
                      viewer.controls.enableZoom = false;
                      viewer.controls.enableDamping = true;
                      viewer.controls.dampingFactor = 0.2;
                    }}
                  />
                </div>
                <RankBadge category={rank.rankCategory} />
              </div>
              <div className="w-full flex flex-col space-y-4">{children}</div>
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
}
