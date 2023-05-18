import { CronJob } from "cron";
import { getSDK } from "./lib/sdk";
import { getPrisma } from "./lib/prisma";

const job = new CronJob(
  "0 5/5 * * * *",
  async () => {
    const servers = await getSDK().network.getServers();
    const playerCounts = {
      total: 0,
      paintsquad: 0,
      rush: 0,
      kingdoms: 0,
    };
    servers.forEach((server) => {
      playerCounts.total += server.players.length;
      if (server.id.startsWith("ps-")) {
        playerCounts.paintsquad += server.players.length;
      } else if (server.id.startsWith("rush-")) {
        playerCounts.rush += server.players.length;
      } else if (server.id.startsWith("kingdoms-")) {
        playerCounts.kingdoms += server.players.length;
      }
    });
    await getPrisma().playerCount.create({
      data: playerCounts,
    });
  },
  null,
  true,
  "Europe/Berlin"
);
