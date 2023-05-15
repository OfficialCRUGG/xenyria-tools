import DataCard from "@/components/DataCard";
import PlayerLayout from "@/layouts/PlayerLayout";
import { getPrisma } from "@/lib/prisma";
import { getSDK } from "@/lib/sdk";
import { prettyNumber } from "@blazingworks/utils/numbers";
import {
  Car,
  CarSimple,
  Star,
  User as UserIcon,
  Wrench,
} from "@phosphor-icons/react";
import { PlayerLookup } from "@prisma/client";
import { useState } from "react";
import { PlayerRank, PlayerVotes, Player } from "xenyria-sdk";

export async function getServerSideProps({ params }: any) {
  try {
    const player = await getSDK().player.get(params.player);
    const rank = await player.getRank();

    return {
      props: {
        player: player.toJSON(),
        rank: rank.toJSON(),
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
  lookups,
  notFound,
}: {
  player?: Player;
  rank?: PlayerRank;
  votes?: PlayerVotes;
  lookups?: { month: number; total: number };
  notFound?: boolean;
}) {
  const [votesOpen, setVotesOpen] = useState<boolean>(true);

  return (
    <PlayerLayout player={player} rank={rank} notFound={notFound}>
      <DataCard heading="Rush" icon={CarSimple}>
        <h1>Rush Stats are not available yet!</h1>
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
