// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSDK } from "@/lib/sdk";
import { ratelimit } from "@/middleware/ratelimit";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  PSLeaderboardEntry,
  PSLeaderboardEntryInterface,
  PSPlayerStats,
} from "xenyria-sdk";
import type {
  PaintSquadLeaderboardRankingType,
  PaintSquadLeaderboardTimeSpan,
} from "xenyria-api-types";

export type LeaderboardPositionResponseData = {
  above: PSLeaderboardEntryInterface[];
  player: PSLeaderboardEntryInterface | PSPlayerStats;
  below: PSLeaderboardEntryInterface[];
};

type LeaderboardPositionResponse = {
  data?: LeaderboardPositionResponseData;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LeaderboardPositionResponse>
) {
  if (ratelimit(req))
    return res.status(429).json({ error: "Too many requests" });
  const { xenId, timespan, rankingType } = req.query;
  if (!xenId) return res.status(400).json({ error: "Missing xenId" });
  if (!timespan) return res.status(400).json({ error: "Missing timespan" });
  if (!rankingType)
    return res.status(400).json({ error: "Missing rankingType" });
  if (typeof xenId !== "string")
    return res.status(400).json({ error: "Invalid xenId" });
  if (typeof timespan !== "string")
    return res.status(400).json({ error: "Invalid timespan" });
  if (typeof rankingType !== "string")
    return res.status(400).json({ error: "Invalid rankingType" });
  const leaderboard = await getSDK()
    .paintsquad.getLeaderboard(
      timespan as PaintSquadLeaderboardTimeSpan,
      rankingType as PaintSquadLeaderboardRankingType
    )
    .catch(() => undefined);
  if (!leaderboard)
    return res.status(404).json({
      error:
        "Data not found. Either the player, timespan or rankingType weren't found.",
    });
  const playerOnLeaderboard = leaderboard.find(
    (entry) => entry.xenId === parseInt(xenId)
  );
  if (!playerOnLeaderboard) {
    const playerStats = await getSDK()
      .paintsquad.getPlayerStats(
        parseInt(xenId),
        timespan as PaintSquadLeaderboardTimeSpan,
        rankingType as PaintSquadLeaderboardRankingType
      )
      .catch(() => undefined);
    if (!playerStats)
      return res.status(404).json({
        error:
          "Data not found. Either the player, timespan or rankingType weren't found.",
      });
    const lastTwoEntries = leaderboard.slice(leaderboard.length - 2);
    return res.status(200).json({
      data: { above: lastTwoEntries, player: playerStats, below: [] },
    });
  } else {
    const index = leaderboard.indexOf(playerOnLeaderboard);
    const above = leaderboard.slice(Math.max(0, index - 2), index);
    const below = leaderboard.slice(index + 1, index + 3);
    return res.status(200).json({
      data: { above, player: playerOnLeaderboard, below },
    });
  }
}
