import Link from "next/link";

export const Header = () => {
  return (
    <div className="z-10 flex flex-row items-center justify-end gap-6 bg-[#2e026d] px-6 py-1">
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
  );
};
