import { getPrisma } from "@/lib/prisma";
import { ratelimit } from "@/middleware/ratelimit";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  month: number;
  total: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const month = await getPrisma().playerLookup.aggregate({
    _sum: {
      count: true,
    },
    where: {
      month: new Date().getUTCMonth() + 1,
    },
  });
  const total = await getPrisma().playerLookup.aggregate({
    _sum: {
      count: true,
    },
  });
  return res
    .status(200)
    .json({ month: month._sum.count || 0, total: total._sum.count || 0 });
}
