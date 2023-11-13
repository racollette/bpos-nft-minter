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

  console.log(Number(pos));
  return (
    <section className="container flex flex-col gap-8">
      <div className="text-center font-shadows text-3xl font-extrabold text-white">
        My NFTs
      </div>
      <div className="grid grid-cols-3 gap-4 font-bold text-white">
        <div className="relative flex aspect-square items-center justify-center border-2 border-pink-500 bg-black/50">
          <p className="absolute -bottom-5 z-10 rounded-lg border-2 border-pink-500 bg-black px-2 py-1">
            Proof of Work
          </p>
          <div className="flex flex-col gap-2">
            {Number(pow) > 0 ? (
              <>
                <Image src="/images/NFT1_PoW.png" alt="PoW NFT" fill />
                {linktoMarketplace("Trade")}
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className="z-10 rounded-lg bg-cyan-600 px-3 py-2 text-center hover:bg-cyan-500"
                >
                  Spin again!
                </Link>
                {linktoMarketplace("Buy")}
              </>
            )}
          </div>
        </div>
        <div className="relative flex aspect-square items-center justify-center border-2 border-pink-500 bg-black/50">
          <p className="absolute -bottom-5 z-10 rounded-lg border-2 border-pink-500 bg-black px-2 py-1">
            Bonded Proof of Stake
          </p>
          <div className="flex flex-col gap-2">
            {Number(pos) > 0 ? (
              <>
                <Image src="/images/NFT2_BPoS.png" alt="BPoS NFT" fill />
                {linktoMarketplace("Trade")}
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className="z-10 rounded-lg bg-cyan-600 px-3 py-2 text-center hover:bg-cyan-500"
                >
                  Spin again!
                </Link>
                {linktoMarketplace("Buy")}
              </>
            )}
          </div>
        </div>
        <div className="relative flex aspect-square items-center justify-center border-2 border-pink-500 bg-black/50">
          <p className="absolute -bottom-5 z-10 rounded-lg border-2 border-pink-500 bg-black px-2 py-1">
            Proof of Integrity
          </p>

          <div className="flex flex-col gap-2">
            {Number(poi) > 0 ? (
              <>
                <Image src="/images/NFT3_PoI.png" alt="PoI NFT" fill />
                {linktoMarketplace("Trade")}
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className="z-10 rounded-lg bg-cyan-600 px-3 py-2 text-center hover:bg-cyan-500"
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
      className="z-20 flex flex-row items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 hover:bg-emerald-500"
    >
      <Image
        src="/images/elacity.jpg"
        width={35}
        height={35}
        alt="Ela.city"
        className="rounded-full"
      />
      <p className="text-sm font-semibold">{message} on ela.city</p>
    </Link>
  );
}

export default CompositeHoldings;
