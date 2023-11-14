import Image from "next/image";
import Link from "next/link";
import { useAccount, useContractRead } from "wagmi";
import { abi } from "~/utils/contracts";
import { nftType } from "~/utils/contracts";

const Rewards = () => {
  const { address, connector: activeConnector, isConnected } = useAccount();
  const {
    data: pow,
    // isError,
    // isLoading,
  } = useContractRead({
    address: `0x${nftType[1].address}`,
    abi: abi,
    functionName: "balanceOf",
    args: [address],
  });

  const {
    data: pos,
    // isError,
    // isLoading,
  } = useContractRead({
    address: `0x${nftType[2].address}`,

    abi: abi,
    functionName: "balanceOf",
    args: [address],
  });

  const {
    data: poi,
    // isError,
    // isLoading,
  } = useContractRead({
    address: `0x${nftType[3].address}`,

    abi: abi,
    functionName: "balanceOf",
    args: [address],
  });

  const eligibleForAll =
    (pow as number) > 0 && (pos as number) > 0 && (poi as number) > 0;
  const fullSets = Math.min(Number(pow), Number(pos), Number(poi));

  const eligibleForPow = (pow as number) > 0;

  return (
    <section className="flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col gap-2 text-center font-shadows text-3xl font-extrabold text-white">
        Rewards
        <p className="font-sans text-sm italic text-neutral-300">
          Reward distribution will begin on 11/17
        </p>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-[300px] items-center justify-center gap-2 rounded-lg bg-cyan-600/60 p-2">
          <h1 className="  px-2 py-2 text-center text-lg font-bold">
            $GLIDE Rewards
          </h1>
          <h1 className="text-center text-lg font-bold text-white">
            <span className="mr-4 rounded-md bg-black px-2 py-1 text-sm text-white">
              My Status
            </span>
            {eligibleForPow ? (
              <span className="text-sm">Eligible (x{Number(pos)})</span>
            ) : (
              <span className="text-sm">Not Eligible</span>
            )}
          </h1>
        </div>
        <div className="w-[300px] items-center justify-center gap-2 rounded-lg bg-cyan-600/60 p-2">
          <h1 className="  px-2 py-2 text-center text-lg font-bold">
            $ELA Rewards
          </h1>
          <h1 className="text-center text-lg font-bold text-white">
            <span className="mr-4 rounded-md bg-black px-2 py-1 text-sm text-white">
              My Status
            </span>
            {eligibleForAll ? (
              <span className="text-sm">Eligible (x{fullSets})</span>
            ) : (
              <span className="text-sm">Not Eligible</span>
            )}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Rewards;
