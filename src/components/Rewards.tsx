import { useClaimRewards, useRewards } from "~/utils/contracts";
import { type BigNumberish, ethers } from "ethers";
import { useEffect, useState } from "react";
import { HiRefresh } from "react-icons/hi";

const Rewards = () => {
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const { pow, pos, poi, powRewards, ecRewards } = useRewards();
  const { powWrite, powData, ecWrite, ecData, powIsLoading, ecIsLoading } =
    useClaimRewards();

  useEffect(() => {
    const calculateDaysRemaining = () => {
      const rewardExpiryDate = new Date("2024-02-15T00:00:00");
      const currentTimestamp = new Date().getTime();
      const expiryTimestamp = rewardExpiryDate.getTime();
      const timeDiff = expiryTimestamp - currentTimestamp;
      const remainingDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

      return remainingDays;
    };
    const remainingDays = calculateDaysRemaining();
    setDaysRemaining(remainingDays);
  }, []);

  const eligibleForAll =
    (pow as number) > 0 && (pos as number) > 0 && (poi as number) > 0;
  const fullSets = Math.min(Number(pow), Number(pos), Number(poi));

  const eligibleForPow = (pow as number) > 0;

  return (
    <section className="flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col gap-2 text-center font-shadows text-3xl font-extrabold text-white">
        Rewards
        <p className="font-sans text-sm italic text-neutral-300">
          Days Remaining: {daysRemaining}
        </p>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative z-0 w-[300px] items-center justify-center gap-2 overflow-clip rounded-xl bg-gradient-to-br from-cyan-950 to-cyan-400/50">
          <div className="flex flex-col gap-4">
            <div className="flex h-12 items-center justify-center bg-gradient-to-br from-fuchsia-900 to-fuchsia-600 text-center text-sm font-bold uppercase">
              Proof of Work Rewards
              <div className="absolute top-7 p-2 text-center text-lg font-bold text-white">
                {eligibleForPow ? (
                  <span className="mr-4 rounded-md bg-black px-2 py-1 text-sm text-white">
                    Eligible (x{Number(pow)})
                  </span>
                ) : (
                  <>
                    <span className="mr-4 rounded-md bg-black px-2 py-1 text-sm text-white">
                      Not Eligible
                    </span>
                  </>
                )}
              </div>
            </div>
            <ClaimWidget
              rewards={powRewards as BigNumberish}
              token="GLIDE"
              claimFunction={powWrite}
              isLoading={powIsLoading}
            />
          </div>
        </div>
        <div className="relative z-0 w-[300px] items-center justify-center gap-2 overflow-clip rounded-xl bg-gradient-to-br from-cyan-950 to-cyan-400/50">
          <div className="flex flex-col gap-4">
            <div className="flex h-12 items-center justify-center bg-gradient-to-br from-fuchsia-900 to-fuchsia-600 text-center text-sm font-bold uppercase">
              Elastic Consensus Rewards
              <div className="absolute top-7 p-2 text-center text-lg font-bold text-white">
                {eligibleForAll ? (
                  <span className="mr-4 rounded-md bg-black px-2 py-1 text-sm text-white">
                    Eligible (x{Number(fullSets)})
                  </span>
                ) : (
                  <>
                    <span className="mr-4 rounded-md bg-black px-2 py-1 text-sm text-white">
                      Not Eligible
                    </span>
                  </>
                )}
              </div>
            </div>
            <ClaimWidget
              rewards={ecRewards as BigNumberish}
              token="WELA"
              claimFunction={ecWrite}
              isLoading={ecIsLoading}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

type ClaimWidgetProps = {
  rewards: BigNumberish;
  token: string;
  claimFunction: (() => void) | undefined;
  isLoading: boolean;
};

function ClaimWidget({
  rewards,
  token,
  claimFunction,
  isLoading,
}: ClaimWidgetProps) {
  const rewardsInEther = ethers.formatEther(rewards);

  return (
    <div className="flex w-full flex-row items-center justify-between px-4 py-2">
      <div className="flex flex-col justify-start gap-1">
        <div className="text-xs font-bold uppercase">
          <span className="text-white">${token}</span> Claimable
        </div>
        <div className="text-md rounded-md bg-black/50 px-2 py-1 text-left font-bold">
          {Number(rewardsInEther).toFixed(4)}
        </div>
      </div>
      <button
        disabled={Number(rewardsInEther) === 0}
        onClick={claimFunction}
        className="h-10 rounded-lg bg-emerald-600 px-6 py-2 text-sm font-bold uppercase text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-600"
      >
        {!isLoading ? (
          `Collect`
        ) : (
          <div className="flex flex-row items-center justify-center gap-2">
            Collect <HiRefresh className="animate-spin" size={20} />
          </div>
        )}
      </button>
    </div>
  );
}

export default Rewards;
