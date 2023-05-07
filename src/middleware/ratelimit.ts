import { NextApiRequest } from "next";

const map: Map<string, Date[]> = new Map();

import requestIp from "request-ip";

export function ratelimit(request: NextApiRequest): boolean {
  const ip = requestIp.getClientIp(request) || false;
  if (!ip) return true;
  const now = new Date();
  const minuteAgo = new Date(now.getTime() - 60000);
  const times = (map.get(ip) || []).filter((time) => time > minuteAgo);
  times.push(now);
  map.set(ip, times);
  if (times.length > 30) {
    return true;
  } else {
    return false;
  }
}
