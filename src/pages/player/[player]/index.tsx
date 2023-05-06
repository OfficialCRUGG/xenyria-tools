import DataCard from "@/components/DataCard";
import RankBadge from "@/components/RankBadge";
import Tabs from "@/components/Tabs";
import MainLayout from "@/layouts/MainLayout";
import PlayerLayout from "@/layouts/PlayerLayout";
import { getSDK } from "@/lib/sdk";
import {
  Barricade,
  Car,
  CastleTurret,
  PaintRoller,
  SmileySad,
  Star,
  User as UserIcon,
} from "@phosphor-icons/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { PlayerRank, PlayerVotes, Player } from "xenyria-sdk";

const ReactSkinview3d = dynamic(() => import("react-skinview3d"), {
  ssr: false,
});

export async function getServerSideProps({ params }: any) {
  try {
    const player = await getSDK().player.get(params.player);
    const rank = await player.getRank();
    const votes = await player.getVotes();

    return {
      props: {
        player: player.toJSON(),
        rank,
        votes,
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

export default function PlayerView({
  player,
  rank,
  votes,
  notFound,
}: {
  player?: Player;
  rank?: PlayerRank;
  votes?: PlayerVotes;
  notFound?: boolean;
}) {
  const [profileOpen, setProfileOpen] = useState<boolean>(true);
  const [votesOpen, setVotesOpen] = useState<boolean>(true);

  return (
    <PlayerLayout player={player}>
      {notFound || !player || !rank || !votes ? (
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
                heading="Profile"
                icon={UserIcon}
                open={profileOpen}
                onHeadingClick={() => {
                  setProfileOpen(!profileOpen);
                }}
              >
                <div className="grid grid-cols-2 grid-cols-[min-content,1fr] gap-x-6">
                  <div className="font-semibold whitespace-nowrap">
                    Play time
                  </div>
                  <div className="font w-full place-self-center">
                    {formatPlayTime(player.playTime.seconds)}
                  </div>
                  <div className="font-semibold whitespace-nowrap">
                    Xenyria ID
                  </div>
                  <div className="font-mono text-sm w-full place-self-center">
                    {player.xenId}
                  </div>
                  <div className="font-semibold whitespace-nowrap">UUID</div>
                  <div className="font-mono text-sm w-full place-self-center">
                    {player.uuid}
                  </div>
                </div>
              </DataCard>
              <DataCard
                heading="Votes"
                icon={Star}
                open={votesOpen}
                onHeadingClick={() => {
                  setVotesOpen(!votesOpen);
                }}
              >
                <div className="grid grid-cols-2 grid-cols-[min-content,1fr] gap-x-6">
                  <div className="font-semibold whitespace-nowrap">
                    Total Votes
                  </div>
                  <div className="font w-full place-self-center">
                    {votes.votes}
                  </div>
                  <div className="font-semibold whitespace-nowrap">
                    Vote Streak
                  </div>
                  <div className="font w-full place-self-center">
                    {votes.voteStreak}
                  </div>
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
