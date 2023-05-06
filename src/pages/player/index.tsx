import { useRouter } from "next/router";
import { useEffect } from "react";

export default function PlayerIndex() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return null;
}
