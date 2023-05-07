import { PrismaClient } from "@prisma/client";
import { XenyriaSDK } from "xenyria-sdk";

let prisma: PrismaClient | undefined;

export function getPrisma() {
  if (!prisma) prisma = new PrismaClient();

  return prisma;
}
