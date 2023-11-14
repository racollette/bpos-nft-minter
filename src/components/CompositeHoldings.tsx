import Image from "next/image";
import Link from "next/link";
import { useAccount, useContractRead } from "wagmi";
import { abi } from "~/utils/contracts";

const CompositeHoldings = () => {
  const { address, connector: activeConnector, isConnected } = useAccount();
  const {
    data: pow,
    // isError,
    // isLoading,
  } = useContractRead({
    address: "0x7C8bD2A803D933557741965205f21F7088311468",
    abi: abi,
    functionName: "balanceOf",
    args: [address],
  });

  const {
    data: pos,
    // isError,
    // isLoading,
  } = useContractRead({
    address: "0xfE712eC85326bB9E54637896abf2a646CD081e39",
    abi: abi,
    functionName: "balanceOf",
    args: [address],
  });

  const {
    data: poi,
    // isError,
    // isLoading,
  } = useContractRead({
    address: "0xa30ae22b56dE03E94B3773F50089B0A2A557F955",
    abi: abi,
    functionName: "balanceOf",
    args: [address],
  });

  return (
    <section className="flex flex-col gap-8 p-4 md:container md:p-2">
      <div className="text-center font-shadows text-xl font-extrabold text-white md:text-3xl">
        My NFTs
      </div>
      <div className="flex flex-col gap-8 font-bold text-white md:grid md:grid-cols-3 md:gap-3">
        <div className="relative flex aspect-square items-center justify-center rounded-lg border-2 border-fuchsia-600 bg-black/50">
          <p className="absolute -bottom-5 z-10 rounded-lg border-2 border-fuchsia-600 bg-black px-2 py-1 text-lg">
            Proof of Work
          </p>
          <div className="flex flex-col gap-2">
            {Number(pow) > 0 ? (
              <>
                {Number(pow) > 1 && (
                  <h1 className="z-20 rounded-lg bg-black/60 text-center text-lg font-extrabold text-white md:text-2xl">
                    You own {Number(pow)}!
                  </h1>
                )}
                <Image
                  src="/images/NFT1_AuXPoW.png"
                  alt="PoW NFT"
                  fill
                  className="rounded-lg"
                />
                {linktoMarketplace("Trade")}
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className="z-10 rounded-lg bg-cyan-600 px-3 py-2 text-center text-sm hover:bg-cyan-500 md:text-lg"
                >
                  Spin again!
                </Link>
                {linktoMarketplace("Buy")}
              </>
            )}
          </div>
        </div>
        <div className="relative flex aspect-square items-center justify-center rounded-lg border-2 border-fuchsia-600 bg-black/50">
          <p className="absolute -bottom-5 z-20 rounded-lg border-2 border-fuchsia-600 bg-black px-2 py-1 text-lg">
            Bonded Proof of Stake
          </p>
          <div className="flex flex-col gap-2">
            {Number(pos) > 0 ? (
              <>
                {Number(pos) > 1 && (
                  <h1 className="z-20 rounded-lg bg-black/60 text-center text-lg font-extrabold text-white md:text-2xl">
                    You own {Number(pos)}!
                  </h1>
                )}
                <Image
                  src="/images/NFT2_BPoS.png"
                  alt="BPoS NFT"
                  fill
                  className="rounded-lg"
                />
                {linktoMarketplace("Trade")}
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className="z-10 rounded-lg bg-cyan-600 px-3 py-2 text-center text-sm hover:bg-cyan-500 md:text-lg"
                >
                  Spin again!
                </Link>
                {linktoMarketplace("Buy")}
              </>
            )}
          </div>
        </div>
        <div className="relative flex aspect-square items-center justify-center rounded-lg border-2 border-fuchsia-600 bg-black/50">
          <p className="absolute -bottom-5 z-10 rounded-lg border-2 border-fuchsia-600 bg-black px-2 py-1 text-lg">
            Proof of Integrity
          </p>

          <div className="flex flex-col gap-2">
            {Number(poi) > 0 ? (
              <>
                {Number(poi) > 1 && (
                  <h1 className="z-20 rounded-lg bg-black/60 text-center text-lg font-extrabold text-white md:text-2xl">
                    You own {Number(poi)}!
                  </h1>
                )}

                <Image
                  src="/images/NFT3_PoI.png"
                  alt="PoI NFT"
                  fill
                  className="rounded-lg"
                />
                {linktoMarketplace("Trade")}
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className="z-10 rounded-lg bg-cyan-600 px-3 py-2 text-center text-sm hover:bg-cyan-500 md:text-lg"
                >
                  Spin again!
                </Link>
                {linktoMarketplace("Buy")}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

function linktoMarketplace(message: string) {
  return (
    <Link
      href="https://ela.city/"
      target="_blank"
      className="z-20 flex flex-row items-center justify-center gap-2 rounded-lg bg-emerald-600/80 px-3 py-2 hover:bg-emerald-500/80"
    >
      <Image
        src="/images/elacity.jpg"
        width={35}
        height={35}
        alt="Ela.city"
        className="rounded-full"
      />
      <p className="text-xs font-semibold md:text-sm">{message} on ela.city</p>
    </Link>
  );
}

export default CompositeHoldings;
