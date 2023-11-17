import Link from "next/link";
import { ProfileNoSSR } from "./Spinner";

export const Header = () => {
  return (
    <div className="z-10 flex flex-row items-center justify-between bg-indigo-950 py-1 pl-4 pr-2">
      <div className="flex flex-row items-center gap-6 self-center">
        <Link className="font-shadows text-lg font-bold text-white" href="/">
          Mint
        </Link>
        <Link
          className="font-shadows text-lg font-bold text-white"
          href="/dashboard"
        >
          Dashboard
        </Link>
      </div>
      <div className="justify-self-end">
        <ProfileNoSSR size="sm" />
      </div>
    </div>
  );
};
