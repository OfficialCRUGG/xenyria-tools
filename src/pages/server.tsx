/* eslint-disable @next/next/no-img-element */
import {
  Car,
  ChartPie,
  ClockCounterClockwise,
  Cloud,
  PaintRoller,
  Users,
  UsersThree,
} from "@phosphor-icons/react";
import MainLayout from "../layouts/MainLayout";
import DataCard from "@/components/DataCard";
import Container from "@/components/Container";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSDK } from "@/lib/sdk";
import { Server } from "xenyria-sdk";
import { PartialPlayer } from "xenyria-sdk";
import Link from "next/link";
import { prettyNumber } from "@blazingworks/utils/numbers";

export async function getServerSideProps() {
  const playerData = (await getSDK().network.getServers()).map(
    (server: Server) => ({
      id: server.id,
      players: server.players.map((player: PartialPlayer) => ({
        username: player.username,
        uuid: player.uuid,
      })),
    })
  );

  return {
    props: {
      data: playerData,
    },
  };
}

export default function Server({
  data,
}: {
  data: (Server & { players: { username: string; uuid: string }[] })[];
}) {
  const [playersOpen, setPlayersOpen] = useState(true);
  const [networkGraphOpen, setNetworkGraphOpen] = useState(true);
  const [paintsquadGraphOpen, setPaintsquadGraphOpen] = useState(true);
  const [rushGraphOpen, setRushGraphOpen] = useState(true);
  const [networkPieOpen, setNetworkPieOpen] = useState(true);

  const playerTabs = ["Network", "PaintSquad", "Rush"];
  const [playerTab, setPlayerTab] = useState(playerTabs[0]);

  function filterPlayers(tab: (typeof playerTabs)[number]) {
    console.log(data);
    const filteredServers = (() => {
      switch (tab) {
        case "Network":
          return data;
        case "PaintSquad":
          return data.filter((server) => server.id.startsWith("ps-"));
        case "Rush":
          return data.filter((server) => server.id.startsWith("rush-"));
      }
    })();
    return filteredServers?.flatMap((server) => server.players);
  }

  const filteredPlayers = filterPlayers(playerTab);

  return (
    <MainLayout>
      <Container>
        <DataCard
          heading="Online Players"
          icon={Users}
          tabs={playerTabs}
          tab={playerTab}
          setTab={setPlayerTab}
          open={playersOpen}
          onHeadingClick={() => {
            setPlayersOpen(!playersOpen);
          }}
          noPadding
        >
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(4rem,_1fr))] gap-2 py-2 px-4 h-[224px] overflow-y-scroll">
            {filteredPlayers?.map((player) => (
              <Link
                className="h-[4rem] w-[4rem] rounded-lg"
                key={player.uuid}
                href={`/player/${player.username}`}
              >
                <img
                  className="h-[4rem] w-[4rem] rounded-lg"
                  src={`https://crafatar.com/avatars/${player.uuid}`}
                  alt=""
                />
              </Link>
            ))}
          </div>
        </DataCard>
        <div className="flex mt-4 space-x-4">
          <div className="w-[55%] flex flex-col space-y-4">
            <DataCard
              heading="Network Player Count Graph"
              icon={Cloud}
              loading
              open={networkGraphOpen}
              onHeadingClick={() => {
                setNetworkGraphOpen(!networkGraphOpen);
              }}
            >
              <div className="py-4"></div>
            </DataCard>
            <DataCard
              heading="PaintSquad Player Count Graph"
              icon={PaintRoller}
              loading
              open={paintsquadGraphOpen}
              onHeadingClick={() => {
                setPaintsquadGraphOpen(!paintsquadGraphOpen);
              }}
            >
              <div className="py-4"></div>
            </DataCard>
            <DataCard
              heading="Rush Player Count Graph"
              icon={Car}
              loading
              open={rushGraphOpen}
              onHeadingClick={() => {
                setRushGraphOpen(!rushGraphOpen);
              }}
            >
              <div className="py-4"></div>
            </DataCard>
            <DataCard
              heading="Player Distribution Pie"
              icon={ChartPie}
              loading
              open={networkPieOpen}
              onHeadingClick={() => {
                setNetworkPieOpen(!networkPieOpen);
              }}
            >
              <div className="py-4"></div>
            </DataCard>
          </div>
          <div className="w-[45%] flex flex-col space-y-4">
            <DataCard heading="Player Counts" icon={UsersThree}>
              <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                <div className="flex flex-col">
                  <div className="font-regular whitespace-nowrap text-base text-white/75">
                    Total
                  </div>
                  <div className="w-full place-self-center text-2xl font-bold">
                    {prettyNumber(
                      data.reduce((acc, obj) => acc + obj.players.length, 0)
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="font-regular whitespace-nowrap text-base text-white/75">
                    Hub
                  </div>
                  <div className="w-full place-self-center text-2xl font-bold">
                    {prettyNumber(
                      data
                        .filter((s) => s.id.startsWith("hub-"))
                        .reduce((acc, obj) => acc + obj.players.length, 0)
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="font-regular whitespace-nowrap text-base text-white/75">
                    Misc
                  </div>
                  <div className="w-full place-self-center text-2xl font-bold">
                    {prettyNumber(
                      data
                        .filter(
                          (s) =>
                            !s.id.startsWith("hub-") &&
                            !s.id.startsWith("ps-") &&
                            !s.id.startsWith("rush-") &&
                            !s.id.startsWith("kingdoms-")
                        )
                        .reduce((acc, obj) => acc + obj.players.length, 0)
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="font-regular whitespace-nowrap text-base text-white/75">
                    PaintSquad
                  </div>
                  <div className="w-full place-self-center text-2xl font-bold">
                    {prettyNumber(
                      data
                        .filter((s) => s.id.startsWith("ps-"))
                        .reduce((acc, obj) => acc + obj.players.length, 0)
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="font-regular whitespace-nowrap text-base text-white/75">
                    Rush
                  </div>
                  <div className="w-full place-self-center text-2xl font-bold">
                    {prettyNumber(
                      data
                        .filter((s) => s.id.startsWith("rush-"))
                        .reduce((acc, obj) => acc + obj.players.length, 0)
                    )}
                  </div>
                </div>
                <div className="flex flex-col opacity-25">
                  <div className="font-regular whitespace-nowrap text-base text-white/75">
                    Kingdoms
                  </div>
                  <div className="w-full place-self-center text-2xl font-bold">
                    {prettyNumber(
                      data
                        .filter((s) => s.id.startsWith("kingdoms-"))
                        .reduce((acc, obj) => acc + obj.players.length, 0)
                    )}
                  </div>
                </div>
              </div>
            </DataCard>
            <DataCard
              heading="Historical Data"
              icon={ClockCounterClockwise}
              loading
            >
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex flex-col">
                  <div className="font-regular whitespace-nowrap text-base text-white/75">
                    Peak Total Players
                  </div>
                  <div className="w-full place-self-center text-2xl font-bold">
                    0
                  </div>
                  <div className="font-light whitespace-nowrap text-sm text-white/50 italic -mt-1">
                    4 weeks ago
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="font-regular whitespace-nowrap text-base text-white/75">
                    Peak Hub Players
                  </div>
                  <div className="w-full place-self-center text-2xl font-bold">
                    0
                  </div>
                  <div className="font-light whitespace-nowrap text-sm text-white/50 italic -mt-1">
                    4 weeks ago
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="font-regular whitespace-nowrap text-base text-white/75">
                    Peak PaintSquad Players
                  </div>
                  <div className="w-full place-self-center text-2xl font-bold">
                    0
                  </div>
                  <div className="font-light whitespace-nowrap text-sm text-white/50 italic -mt-1">
                    4 weeks ago
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="font-regular whitespace-nowrap text-base text-white/75">
                    Peak Rush Players
                  </div>
                  <div className="w-full place-self-center text-2xl font-bold">
                    0
                  </div>
                  <div className="font-light whitespace-nowrap text-sm text-white/50 italic -mt-1">
                    4 weeks ago
                  </div>
                </div>
              </div>
            </DataCard>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}
