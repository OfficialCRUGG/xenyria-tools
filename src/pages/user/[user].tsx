/* eslint-disable @next/next/no-img-element */
import DataCard from "@/components/DataCard";
import GroupBadge from "@/components/GroupBadge";
import MainLayout from "@/layouts/MainLayout";
import {
  Barricade,
  Car,
  CastleTurret,
  PaintRoller,
  SmileySad,
  User as UserIcon,
} from "@phosphor-icons/react";
import dynamic from "next/dynamic";

const ReactSkinview3d = dynamic(() => import("react-skinview3d"), {
  ssr: false,
});

export async function getServerSideProps({ params }: any) {
  const xenyriaUser = await (
    await fetch(
      `https://api.xenyria.net/player/fetch?username=${params.user}`,
      {
        headers: {
          Authorization: `Xen-Token ${process.env.XENYRIA_TOKEN}`,
        },
      }
    )
  ).json();

  console.log(xenyriaUser);

  const userExists =
    xenyriaUser?.success && xenyriaUser?.message !== "User not found";

  if (!userExists) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  const xenyriaGroup = await (
    await fetch(
      `https://api.xenyria.net/player/group?xen_id=${xenyriaUser.data.xen_id}`,
      {
        headers: {
          Authorization: `Xen-Token ${process.env.XENYRIA_TOKEN}`,
        },
      }
    )
  ).json();

  const xenyriaVotes = await (
    await fetch(
      `https://api.xenyria.net/player/votes?xen_id=${xenyriaUser.data.xen_id}`,
      {
        headers: {
          Authorization: `Xen-Token ${process.env.XENYRIA_TOKEN}`,
        },
      }
    )
  ).json();

  return {
    props: {
      user: params.user,
      xenyriaUser: xenyriaUser.data,
      xenyriaGroup: xenyriaGroup.data,
      xenyriaVotes: xenyriaVotes.data,
    },
  };
}

export default function User({
  user,
  xenyriaUser,
  xenyriaGroup,
  xenyriaVotes,
  notFound,
}: {
  user: string;
  xenyriaUser?: any;
  xenyriaGroup?: any;
  xenyriaVotes?: any;
  notFound?: boolean;
}) {
  return (
    <MainLayout>
      {notFound ? (
        <div className="flex flex-col items-center text-center">
          <SmileySad size={128} weight="fill" />
          <h1 className="font-bold text-3xl">
            This user doesn&apos;t appear to have played on Xenyria.
          </h1>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex space-x-4 items-center">
            <h1 className="font-bold text-4xl">{user}</h1>
            {xenyriaUser.language === "german" ? (
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
          <div className="flex gap-6 mt-2">
            <div className="flex flex-col space-y-4" style={{ width: 250 }}>
              <div
                className="border border-white/25 rounded-lg checkerboard"
                style={{ height: 400, width: 250 }}
              >
                <ReactSkinview3d
                  skinUrl={`https://crafatar.com/skins/${xenyriaUser.uuid}`}
                  capeUrl={`https://crafatar.com/capes/${xenyriaUser.uuid}`}
                  height="400"
                  width="250"
                />
              </div>
              <GroupBadge group={xenyriaGroup.group_id} />
            </div>
            <div className="w-full flex flex-col space-y-4">
              <DataCard heading="Profile" icon={UserIcon}>
                <div className="grid grid-cols-2 grid-cols-[min-content,1fr] gap-x-6">
                  <div className="font-semibold whitespace-nowrap">
                    Play time
                  </div>
                  <div className="font w-full place-self-center">
                    {formatPlayTime(xenyriaUser.playtime_in_seconds)}
                  </div>
                  <div className="font-semibold whitespace-nowrap">
                    Total Votes
                  </div>
                  <div className="font w-full place-self-center">
                    {xenyriaVotes.total_vote_count}
                  </div>
                  <div className="font-semibold whitespace-nowrap">
                    Vote Streak
                  </div>
                  <div className="font w-full place-self-center">
                    {xenyriaVotes.current_vote_streak}
                  </div>
                  <div className="font-semibold whitespace-nowrap">
                    Xenyria ID
                  </div>
                  <div className="font-mono text-sm w-full place-self-center">
                    {xenyriaUser.xen_id}
                  </div>
                  <div className="font-semibold whitespace-nowrap">UUID</div>
                  <div className="font-mono text-sm w-full place-self-center">
                    {xenyriaUser.uuid}
                  </div>
                </div>
              </DataCard>
              <DataCard heading="PaintSquad" icon={PaintRoller}>
                <div className="py-8 flex flex-col items-center">
                  <Barricade weight="fill" size={64} />
                  <h3 className="font-semibold text-2xl">
                    Feature not yet implemented!
                  </h3>
                  <h4 className="text-white/75">
                    Check back in the near future!
                  </h4>
                </div>
              </DataCard>
              <DataCard heading="Rush" icon={Car}>
                <div className="py-8 flex flex-col items-center">
                  <Barricade weight="fill" size={64} />
                  <h3 className="font-semibold text-2xl">
                    Feature not yet implemented!
                  </h3>
                  <h4 className="text-white/75">
                    Check back in the near future!
                  </h4>
                </div>
              </DataCard>
              <DataCard heading="Kingdoms" icon={CastleTurret}>
                <div className="py-8 flex flex-col items-center">
                  <Barricade weight="fill" size={64} />
                  <h3 className="font-semibold text-2xl">
                    Game mode not out yet!
                  </h3>
                  <h4 className="text-white/75">
                    Check back when Kingdoms is officially released!
                  </h4>
                </div>
              </DataCard>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
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
