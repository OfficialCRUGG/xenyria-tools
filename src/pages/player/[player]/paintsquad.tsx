/* eslint-disable @next/next/no-img-element */
import DataCard from "@/components/DataCard";
import { DateTime } from "luxon";
import PlayerLayout from "@/layouts/PlayerLayout";
import { gameModeName } from "@/lib/paintsquad";
import { getSDK } from "@/lib/sdk";
import { LeaderboardPositionResponseData } from "@/pages/api/paintsquad/leaderboardPosition";
import { prettyNumber } from "@blazingworks/utils/numbers";
import {
  ChartLine,
  Check,
  GameController,
  Table,
  User as UserIcon,
  X,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RESTGetAPIPaintSquadVersionDataResponse } from "xenyria-api-types";
import {
  PlayerRank,
  Player,
  PSPlayerData,
  PartialPSMatchInterfaceJSON,
  PSLeaderboardEntryInterface,
} from "xenyria-sdk";

export async function getServerSideProps({ params }: any) {
  try {
    const player = await getSDK().player.get(params.player);
    const rank = await player.getRank();
    const data = await player.paintsquad.getData();
    const lastMatches = await player.paintsquad.getLastMatches();
    const psVersion = await getSDK().rawClient.paintsquad.versionData();

    return {
      props: {
        player: player.toJSON(),
        rank: rank.toJSON(),
        data,
        lastMatches: lastMatches.map((match) => match.toJSON()),
        psVersion,
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
  psVersion,
}: {
  player?: Player;
  rank?: PlayerRank;
  data?: PSPlayerData;
  lastMatches?: PartialPSMatchInterfaceJSON[];
  notFound?: boolean;
  psVersion: RESTGetAPIPaintSquadVersionDataResponse;
}) {
  const [generalOpen, setGeneralOpen] = useState<boolean>(true);
  const [statsOpen, setStatsOpen] = useState<boolean>(true);
  const [leaderboardOpen, setLeaderboardOpen] = useState<boolean>(true);
  const [matchesOpen, setMatchedOpen] = useState<boolean>(true);

  const timeUnitTabData = useMemo<Record<string, string>>(() => {
    return {
      "All-time": "all_time",
      Monthly: "month",
      Weekly: "week",
    };
  }, []);

  const modeTabData = useMemo<Record<string, string>>(() => {
    return {
      Global: "global",
      "Turf War": "turfwar",
      Deathmatch: "deathmatch",
      Rainmaker: "rainmaker",
      Paintzones: "splatzones",
      "Tower Control": "tower_control",
      Eightball: "eightball",
      Conquest: "conquest",
      "Clam Attack": "clam_attack",
    };
  }, []);

  const statsTabs = Object.keys(timeUnitTabData);
  const statsSecondaryTabs = Object.keys(modeTabData);

  const [statsTab, setStatsTab] = useState<string>(statsTabs[0]);
  const [statsSecondaryTab, setStatsSecondaryTab] = useState<string>(
    statsSecondaryTabs[0]
  );
  const [statsLoading, setStatsLoading] = useState<boolean>(false);
  const [statsData, setStatsData] = useState<{
    wins: string;
    losses: string;
    points: string;
    kills: string;
    assists: string;
    deaths: string;
  }>({
    wins: "0",
    losses: "0",
    points: "0",
    kills: "0",
    assists: "0",
    deaths: "0",
  });

  const fetchStats = useCallback(async () => {
    if (!player) return;
    setStatsLoading(true);
    fetch(
      `/api/paintsquad/stats?xenId=${player.xenId}&timespan=${timeUnitTabData[statsTab]}&rankingType=${modeTabData[statsSecondaryTab]}`
    ).then(async (res) => {
      const data = (await res.json()).data;
      if (!data) {
        setStatsData({
          wins: "0",
          losses: "0",
          points: "0",
          kills: "0",
          assists: "0",
          deaths: "0",
        });
        return setStatsLoading(false);
      }
      setStatsData({
        wins: prettyNumber(data.wins),
        losses: prettyNumber(data.losses),
        points: prettyNumber(data.points),
        kills: prettyNumber(data.kills),
        assists: prettyNumber(data.assists),
        deaths: prettyNumber(data.deaths),
      });
      setStatsLoading(false);
    });
  }, [player, statsTab, statsSecondaryTab, timeUnitTabData, modeTabData]);

  const [lastStatsFetched, setLastStatsFetched] = useState<
    [string, string] | undefined
  >();

  useEffect(() => {
    if (
      lastStatsFetched &&
      lastStatsFetched[0] === statsTab &&
      lastStatsFetched[1] === statsSecondaryTab
    )
      return;
    setLastStatsFetched([statsTab, statsSecondaryTab]);
    fetchStats();
  }, [statsTab, statsSecondaryTab, fetchStats, lastStatsFetched]);

  /* Rank */

  const publicRank = psVersion?.data.public_mm_ladder.find(
    (l) => (data?.mmr.public || 0) >= l.start && (data?.mmr.public || 0) < l.end
  );

  const invasionRank = psVersion?.data.invasion_mm_ladder.find(
    (l) =>
      (data?.mmr.invasion || 0) >= l.start && (data?.mmr.invasion || 0) < l.end
  );

  /* Leaderboard */

  const dummyPlayer = useMemo(
    () => ({
      xenId: -1,
      username: "Steve",
      uuid: "c06f8906-4c8a-4911-9c29-ea1dbd1aab82",
      position: 0,
      wins: 0,
      losses: 0,
      points: 0,
      kills: 0,
      assists: 0,
      deaths: 0,
    }),
    []
  );

  const leaderboardTabs = Object.keys(timeUnitTabData);
  const leaderboardSecondaryTabs = Object.keys(modeTabData);

  const [leaderboardTab, setLeaderboardTab] = useState<string>(
    leaderboardTabs[0]
  );
  const [leaderboardSecondaryTab, setLeaderboardSecondaryTab] =
    useState<string>(leaderboardSecondaryTabs[0]);
  const [leaderboardLoading, setLeaderboardLoading] = useState<boolean>(false);
  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardPositionResponseData>({
      above: [],
      player: dummyPlayer,
      below: [],
    });

  const fetchLeaderboard = useCallback(async () => {
    if (!player) return;
    setLeaderboardLoading(true);
    fetch(
      `/api/paintsquad/leaderboardPosition?xenId=${player.xenId}&timespan=${timeUnitTabData[leaderboardTab]}&rankingType=${modeTabData[leaderboardSecondaryTab]}`
    ).then(async (res) => {
      const data = (await res.json()).data;
      if (!data) {
        setLeaderboardData({
          above: [],
          player: dummyPlayer,
          below: [],
        });
        return setLeaderboardLoading(false);
      }
      setLeaderboardData(data);
      setLeaderboardLoading(false);
    });
  }, [
    player,
    leaderboardTab,
    leaderboardSecondaryTab,
    timeUnitTabData,
    modeTabData,
    dummyPlayer,
  ]);

  const [lastLeaderboardFetched, setLastLeaderboardFetched] = useState<
    [string, string] | undefined
  >();

  useEffect(() => {
    if (
      lastLeaderboardFetched &&
      lastLeaderboardFetched[0] === leaderboardTab &&
      lastLeaderboardFetched[1] === leaderboardSecondaryTab
    )
      return;
    setLastLeaderboardFetched([leaderboardTab, leaderboardSecondaryTab]);
    fetchLeaderboard();
  }, [
    leaderboardTab,
    leaderboardSecondaryTab,
    fetchLeaderboard,
    lastLeaderboardFetched,
  ]);

  return (
    <PlayerLayout player={player} rank={rank} notFound={notFound}>
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
            {data?.finishedTutorial ? (
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
            {prettyNumber(data?.coins || 0)}
          </div>
          <div className="font-semibold whitespace-nowrap">XP</div>
          <div className="w-full place-self-center">
            {prettyNumber(data?.xp || 0)}
          </div>
          <div className="font-semibold whitespace-nowrap">Rank</div>
          <div className="w-full place-self-center flex items-center space-x-2">
            <div className="h-6 w-32 bg-black bg-opacity-[35%] rounded-lg overflow-hidden">
              <div
                className="h-full bg-white"
                style={{
                  width: `${
                    (((data?.mmr.public || 0) - (publicRank?.start || 0)) /
                      ((publicRank?.end || 0) - (publicRank?.start || 0))) *
                    100
                  }%`,
                }}
              ></div>
            </div>
            <p>
              {publicRank?.title.english} (
              {Math.round(
                (((data?.mmr.public || 0) - (publicRank?.start || 0)) /
                  ((publicRank?.end || 0) - (publicRank?.start || 0))) *
                  100
              )}
              % to next rank)
            </p>
          </div>
          <div className="font-semibold whitespace-nowrap">Invasion Rank</div>
          <div className="w-full place-self-center flex items-center space-x-2">
            <div className="h-6 w-32 bg-black bg-opacity-[35%] rounded-lg overflow-hidden">
              <div
                className="h-full bg-white"
                style={{
                  width: `${
                    (((data?.mmr.invasion || 0) - (invasionRank?.start || 0)) /
                      ((invasionRank?.end || 0) - (invasionRank?.start || 0))) *
                    100
                  }%`,
                }}
              ></div>
            </div>
            <p>
              {invasionRank?.title.english} (
              {Math.round(
                (((data?.mmr.invasion || 0) - (invasionRank?.start || 0)) /
                  ((invasionRank?.end || 0) - (invasionRank?.start || 0))) *
                  100
              )}
              % to next rank)
            </p>
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
        tabs={statsTabs}
        tab={statsTab}
        setTab={setStatsTab}
        secondaryTabs={statsSecondaryTabs}
        secondaryTab={statsSecondaryTab}
        setSecondaryTab={setStatsSecondaryTab}
        loading={statsLoading}
      >
        <div className="grid grid-cols-3 gap-x-6 gap-y-4">
          <div className="flex flex-col">
            <div className="font-regular whitespace-nowrap text-base text-white/75">
              Wins
            </div>
            <div className="w-full place-self-center text-2xl font-bold">
              {statsData.wins}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="font-regular whitespace-nowrap text-base text-white/75">
              Losses
            </div>
            <div className="w-full place-self-center text-2xl font-bold">
              {statsData.losses}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="font-regular whitespace-nowrap text-base text-white/75">
              Points
            </div>
            <div className="w-full place-self-center text-2xl font-bold">
              {statsData.points}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="font-regular whitespace-nowrap text-base text-white/75">
              Kills
            </div>
            <div className="w-full place-self-center text-2xl font-bold">
              {statsData.kills}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="font-regular whitespace-nowrap text-base text-white/75">
              Assists
            </div>
            <div className="w-full place-self-center text-2xl font-bold">
              {statsData.assists}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="font-regular whitespace-nowrap text-base text-white/75">
              Deaths
            </div>
            <div className="w-full place-self-center text-2xl font-bold">
              {statsData.deaths}
            </div>
          </div>
        </div>
      </DataCard>
      <DataCard
        heading="Leaderboard"
        icon={Table}
        open={leaderboardOpen}
        onHeadingClick={() => {
          setLeaderboardOpen(!leaderboardOpen);
        }}
        tabs={leaderboardTabs}
        tab={leaderboardTab}
        setTab={setLeaderboardTab}
        secondaryTabs={leaderboardSecondaryTabs}
        secondaryTab={leaderboardSecondaryTab}
        setSecondaryTab={setLeaderboardSecondaryTab}
        loading={leaderboardLoading}
      >
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col space-y-2 w-full">
            {(leaderboardData.player as PSLeaderboardEntryInterface)
              .position ? (
              <>
                {leaderboardData.above.length >= 2 ? (
                  <LeaderboardItem
                    username={leaderboardData.above[0]?.username}
                    uuid={leaderboardData.above[0]?.uuid}
                    position={leaderboardData.above[0]?.position}
                    points={leaderboardData.above[0]?.points}
                    cardPosition={2}
                  />
                ) : (
                  <LeaderboardItem invisible cardPosition={2} />
                )}
                {leaderboardData.above.length >= 2 ? (
                  <LeaderboardItem
                    username={leaderboardData.above[1]?.username}
                    uuid={leaderboardData.above[1]?.uuid}
                    position={leaderboardData.above[1]?.position}
                    points={leaderboardData.above[1]?.points}
                    cardPosition={1}
                  />
                ) : leaderboardData.above.length === 1 ? (
                  <LeaderboardItem
                    username={leaderboardData.above[0]?.username}
                    uuid={leaderboardData.above[0]?.uuid}
                    position={leaderboardData.above[0]?.position}
                    points={leaderboardData.above[0]?.points}
                    cardPosition={1}
                  />
                ) : (
                  <LeaderboardItem invisible cardPosition={1} />
                )}
              </>
            ) : (
              <>
                <LeaderboardItem
                  username={leaderboardData.above[1]?.username}
                  uuid={leaderboardData.above[1]?.uuid}
                  position={leaderboardData.above[1]?.position}
                  points={leaderboardData.above[1]?.points}
                  cardPosition={2}
                />
                <LeaderboardItem seperator cardPosition={1} />
              </>
            )}
          </div>
          <LeaderboardItem
            username={leaderboardData.player.username}
            uuid={leaderboardData.player.uuid}
            position={
              (leaderboardData.player as PSLeaderboardEntryInterface)
                .position || undefined
            }
            points={leaderboardData.player.points}
          />
          <div className="flex flex-col space-y-2 w-full">
            {(leaderboardData.player as PSLeaderboardEntryInterface)
              .position ? (
              <>
                {leaderboardData.below.length > 0 ? (
                  <LeaderboardItem
                    username={leaderboardData.below[0]?.username}
                    uuid={leaderboardData.below[0]?.uuid}
                    position={leaderboardData.below[0]?.position}
                    points={leaderboardData.below[0]?.points}
                    cardPosition={1}
                  />
                ) : (
                  <LeaderboardItem invisible cardPosition={1} />
                )}
                {leaderboardData.below.length > 1 ? (
                  <LeaderboardItem
                    username={leaderboardData.below[1]?.username}
                    uuid={leaderboardData.below[1]?.uuid}
                    position={leaderboardData.below[1]?.position}
                    points={leaderboardData.below[1]?.points}
                    cardPosition={2}
                  />
                ) : (
                  <LeaderboardItem invisible cardPosition={2} />
                )}
              </>
            ) : (
              <>
                <LeaderboardItem invisible />
                <LeaderboardItem invisible />
              </>
            )}
          </div>
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
          {lastMatches?.map((match) => (
            <Link key={match.id} href={`/paintsquad/matches/${match.id}`}>
              <div className="bg-gray-800 rounded-lg px-4 py-2 flex justify-between items-center">
                <div className="flex space-x-2 items-center">
                  <GameController weight="fill" size={32} />
                  <div className="flex flex-col">
                    <h4 className="text-lg font-semibold -mb-1">
                      {gameModeName(match.gamemode)}
                    </h4>
                    <h5 className="text-sm text-white/75">
                      {
                        psVersion.data.arena.battle.find(
                          (a) => a.id === match.arena
                        )?.name.english
                      }{" "}
                      ▪ {new Date(match.endedAt).toUTCString()}
                      {/*
                      {DateTime.fromMillis(match.endedAt).toLocaleString(
                        DateTime.DATETIME_MED
                      )}{" "}
                      ({DateTime.fromMillis(match.endedAt).toRelative()})*/}
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
    </PlayerLayout>
  );
}

function LeaderboardItem({
  username,
  uuid,
  position,
  points,
  seperator,
  invisible,
  cardPosition = 0,
}: {
  username?: string;
  uuid?: string;
  position?: number;
  points?: number;
  seperator?: boolean;
  invisible?: boolean;
  cardPosition?: number;
}) {
  return (
    <div
      className={`w-full flex ${
        seperator ? "justify-center" : "justify-between bg-gray-800"
      } items-center px-4 py-2 rounded-lg${invisible ? " invisible" : ""} ${
        cardPosition === 1
          ? "transform scale-[95%] opacity-75"
          : cardPosition === 2
          ? "transform scale-[90%] opacity-50"
          : ""
      }`}
    >
      {seperator ? (
        <div className="flex h-12 items-center justify-center space-x-2">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="h-2 w-2 bg-white/25 rounded-full" />
          ))}
        </div>
      ) : (
        <>
          <div className="flex space-x-4 items-center">
            <h5 className="font-bold text-2xl">{position || "???"}</h5>
            {uuid ? (
              <img
                src={`https://crafatar.com/avatars/${uuid}`}
                alt=""
                className="h-12 w-12 rounded-md"
              />
            ) : (
              <div className="h-12 w-12 rounded-md bg-gray-700" />
            )}
            <h5 className="font-semibold text-xl">{username || "Unknown"}</h5>
          </div>
          <p className="font-medium text-lg">{prettyNumber(points || 0)}</p>
        </>
      )}
    </div>
  );
}
