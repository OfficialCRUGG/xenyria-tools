import { MagnifyingGlass } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export function Hero() {
  const [username, setUsername] = useState<string>("");

  const router = useRouter();

  return (
    <div className="py-48 flex flex-col items-center relative">
      <div className="absolute rounded-full h-72 w-72 bg-green-400 filter blur-3xl opacity-10 top-0 -translate-x-full"></div>
      <div className="absolute rounded-full h-72 w-72 bg-cyan-500 filter blur-3xl opacity-5 bottom-0 translate-x-full"></div>
      <h1 className="text-6xl font-bold text-center">View user stats</h1>
      <input
        className="bg-white bg-opacity-5 rounded-full border-2 border-white border-opacity-5 px-4 py-2 mt-8 w-full max-w-2xl mx-auto text-lg font-medium focus:outline-none focus:border-white focus:border-opacity-[15%] transition duration-200 placeholder:text-white placeholder:text-opacity-25 placeholder:font-normal"
        placeholder="Enter a username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(key) => {
          if (key.code === "Enter" && username.length > 0) {
            router.push(`/user/${username}`);
          }
        }}
        type="text"
      />
      <Link
        className="flex items-center space-x-2 bg-black rounded-full px-8 py-3 text-xl font-semibold mt-4 hover:bg-opacity-10 transition duration-200 hover:bg-opacity-10 hover:bg-black hover:bg-opacity-30"
        href={`/user/${username}`}
      >
        <span>Look up</span>
        <MagnifyingGlass weight="bold" size={24} />
      </Link>
    </div>
  );
}
