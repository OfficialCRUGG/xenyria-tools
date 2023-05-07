import DataCard from "@/components/DataCard";
import PlayerLayout from "@/layouts/PlayerLayout";
import { getSDK } from "@/lib/sdk";
import { Star, User as UserIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { PlayerRank, PlayerVotes, Player } from "xenyria-sdk";

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
    <PlayerLayout player={player} rank={rank} notFound={notFound}>
      <DataCard
        heading="Profile"
        icon={UserIcon}
        open={profileOpen}
        onHeadingClick={() => {
          setProfileOpen(!profileOpen);
        }}
      >
        <div className="grid grid-cols-2 grid-cols-[min-content,1fr] gap-x-6">
          <div className="font-semibold whitespace-nowrap">Play time</div>
          <div className="font w-full place-self-center">
            {formatPlayTime(player?.playTime.seconds || 0)}
          </div>
          <div className="font-semibold whitespace-nowrap">Xenyria ID</div>
          <div className="font-mono text-sm w-full place-self-center">
            {player?.xenId}
          </div>
          <div className="font-semibold whitespace-nowrap">UUID</div>
          <div className="font-mono text-sm w-full place-self-center">
            {player?.uuid}
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
          <div className="font-semibold whitespace-nowrap">Total Votes</div>
          <div className="font w-full place-self-center">{votes?.votes}</div>
          <div className="font-semibold whitespace-nowrap">Vote Streak</div>
          <div className="font w-full place-self-center">
            {votes?.voteStreak}
          </div>
        </div>
      </DataCard>
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
