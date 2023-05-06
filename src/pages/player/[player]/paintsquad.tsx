import DataCard from "@/components/DataCard";
import RankBadge from "@/components/RankBadge";
import Tabs from "@/components/Tabs";
import MainLayout from "@/layouts/MainLayout";
import PlayerLayout from "@/layouts/PlayerLayout";
import { gameModeName } from "@/lib/paintsquad";
import { getSDK } from "@/lib/sdk";
import { prettyNumber } from "@blazingworks/utils/numbers";
import {
  Barricade,
  Car,
  CastleTurret,
  ChartLine,
  Check,
  Cross,
  GameController,
  PaintRoller,
  SmileySad,
  Star,
  Sword,
  Table,
  User as UserIcon,
  X,
} from "@phosphor-icons/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import {
  PlayerRank,
  Player,
  PSPlayerData,
  PartialPSMatchInterface,
  PartialPSMatchInterfaceJSON,
} from "xenyria-sdk";

const ReactSkinview3d = dynamic(() => import("react-skinview3d"), {
  ssr: false,
});

export async function getServerSideProps({ params }: any) {
  try {
    const player = await getSDK().player.get(params.player);
    const rank = await player.getRank();
    const data = await player.paintsquad.getData();
    const lastMatches = await player.paintsquad.getLastMatches();

    return {
      props: {
        player: player.toJSON(),
        rank,
        data,
        lastMatches: lastMatches.map((match) => match.toJSON()),
      },
    };
  } catch (error) {
    return {
      props: {
        notFound: true,
      },
    };
  }
}

export default function PlayerPSView({
  player,
  rank,
  data,
  lastMatches,
  notFound,
}: {
  player?: Player;
  rank?: PlayerRank;
  data?: PSPlayerData;
  lastMatches?: PartialPSMatchInterfaceJSON[];
  notFound?: boolean;
}) {
  const [generalOpen, setGeneralOpen] = useState<boolean>(true);
  const [statsOpen, setStatsOpen] = useState<boolean>(true);
  const [leaderboardOpen, setLeaderboardOpen] = useState<boolean>(true);
  const [matchesOpen, setMatchedOpen] = useState<boolean>(true);

  return (
    <PlayerLayout player={player}>
      {notFound || !player || !rank || !data || !lastMatches ? (
        <div className="flex flex-col items-center text-center">
          <SmileySad size={128} weight="fill" />
          <h1 className="font-bold text-3xl">
            This user doesn&apos;t appear to have played on Xenyria.
          </h1>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto w-full">
          <div className="flex gap-6 mt-4">
            <div className="flex flex-col space-y-4" style={{ width: 250 }}>
              <div
                className="border border-white/25 rounded-lg checkerboard"
                style={{ height: 400, width: 250 }}
              >
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
            <div className="w-full flex flex-col space-y-4">
              <DataCard
                heading="General"
                icon={UserIcon}
                open={generalOpen}
                onHeadingClick={() => {
                  setGeneralOpen(!generalOpen);
                }}
              >
                <div className="grid grid-cols-2 grid-cols-[min-content,1fr] gap-x-6">
                  <div className="font-semibold whitespace-nowrap">
                    Finished tutorial
                  </div>
                  <div className="w-full place-self-center">
                    {data.finishedTutorial ? (
                      <div className="flex items-center space-x-1">
                        <Check weight="bold" size={16} />
                        <span>Yes</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-red-800">
                        <X weight="bold" size={16} />
                        <span>No</span>
                      </div>
                    )}
                  </div>
                  <div className="font-semibold whitespace-nowrap">Coins</div>
                  <div className="w-full place-self-center">
                    {prettyNumber(data.coins)}
                  </div>
                  <div className="font-semibold whitespace-nowrap">XP</div>
                  <div className="w-full place-self-center">
                    {prettyNumber(data.xp)}
                  </div>
                  <div className="font-semibold whitespace-nowrap">Rank</div>
                  <div className="w-full place-self-center">
                    this will be painful to implement
                  </div>
                  <div className="font-semibold whitespace-nowrap">
                    Invasion Rank
                  </div>
                  <div className="w-full place-self-center">
                    this will be painful to implement
                  </div>
                </div>
              </DataCard>
              <DataCard
                heading="Statistics"
                icon={ChartLine}
                open={statsOpen}
                onHeadingClick={() => {
                  setStatsOpen(!statsOpen);
                }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Barricade weight="fill" size={48} />
                  <h3 className="text-2xl font-semibold">
                    This section is still in development!
                  </h3>
                </div>
              </DataCard>
              <DataCard
                heading="Leaderboard"
                icon={Table}
                open={leaderboardOpen}
                onHeadingClick={() => {
                  setLeaderboardOpen(!leaderboardOpen);
                }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Barricade weight="fill" size={48} />
                  <h3 className="text-2xl font-semibold">
                    This section is still in development!
                  </h3>
                </div>
              </DataCard>
              <DataCard
                heading="Last Matches"
                icon={GameController}
                open={matchesOpen}
                onHeadingClick={() => {
                  setMatchedOpen(!matchesOpen);
                }}
              >
                <div className="flex flex-col space-y-2">
                  {lastMatches.map((match) => (
                    <Link
                      key={match.id}
                      href={`/paintsquad/matches/${match.id}`}
                    >
                      <div className="bg-gray-800 rounded-lg px-4 py-2 flex justify-between items-center">
                        <div className="flex space-x-2 items-center">
                          <GameController weight="fill" size={32} />
                          <div className="flex flex-col">
                            <h4 className="text-lg font-semibold -mb-1">
                              {gameModeName(match.gamemode)}
                            </h4>
                            <h5 className="text-sm text-white/75">
                              {match.arena} ▪{" "}
                              {new Date(match.endedAt).toUTCString()}
                            </h5>
                          </div>
                        </div>
                        {match.won ? (
                          <div className="text-base rounded-full bg-green-500/25 px-2">
                            Won
                          </div>
                        ) : (
                          <div className="text-base rounded-full bg-red-500/25 px-2">
                            Lost
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </DataCard>
            </div>
          </div>
        </div>
      )}
    </PlayerLayout>
  );
}

function formatPlayTime(playTime: number) {
  if (playTime < 60) return `${playTime} seconds`;
  if (playTime < 3600) return `${Math.floor(playTime / 60)} minutes`;
  if (playTime < 86400)
    return `${Math.floor(playTime / 3600)} hours, ${Math.floor(
      (playTime % 3600) / 60
    )} minutes`;
  if (playTime < 604800)
    return `${Math.floor(playTime / 86400)} days, ${Math.floor(
      (playTime % 86400) / 3600
    )} hours, ${Math.floor((playTime % 3600) / 60)} minutes`;
}
