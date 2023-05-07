// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSDK } from "@/lib/sdk";
import { ratelimit } from "@/middleware/ratelimit";
import type { NextApiRequest, NextApiResponse } from "next";
import { PSPlayerStats } from "xenyria-sdk";
import type {
  PaintSquadLeaderboardRankingType,
  PaintSquadLeaderboardTimeSpan,
} from "xenyria-api-types";

type Data = {
  data?: PSPlayerStats;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
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
  const stats = await getSDK()
    .paintsquad.getPlayerStats(
      parseInt(xenId),
      timespan as PaintSquadLeaderboardTimeSpan,
      rankingType as PaintSquadLeaderboardRankingType
    )
    .catch(() => undefined);
  if (!stats)
    return res.status(404).json({
      error:
        "Data not found. Either the player, timespan or rankingType weren't found.",
    });
  return res.status(200).json({ data: stats });
}
