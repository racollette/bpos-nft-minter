import Link from "next/link";
import Profile from "./Profile";

export const Header = () => {
  return (
    <div className="z-10 flex flex-row items-center justify-between bg-indigo-950 px-6 py-1">
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
        <Profile size="sm" />
      </div>
    </div>
  );
};
