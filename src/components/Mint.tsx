"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
import {
  useWaitForTransaction,
  // useAccount,
} from "wagmi";
import { usePreparedContracts } from "~/utils/contracts";
import { HiRefresh } from "react-icons/hi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/@/components/alert-dialog";

type MintNFTProps = {
  handleSpin: (randomNumber: 1 | 2 | 3) => void;
  spinning: boolean;
  connected: boolean;
};

export function MintNFT({ handleSpin, spinning, connected }: MintNFTProps) {
  const [randomNumber, setRandomNumber] = useState<1 | 2 | 3>(1);

  const { write1, data1, write2, data2, write3, data3 } =
    usePreparedContracts();

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash:
      randomNumber === 1
        ? data1?.hash
        : randomNumber === 2
        ? data2?.hash
        : data3?.hash,
  });

  // Create a ref to track whether isSuccess has changed
  const isFirstSuccess = useRef(true);

  useEffect(() => {
    if (isSuccess && isFirstSuccess.current) {
      isFirstSuccess.current = false; // Set it to false for subsequent renders
      handleSpin(randomNumber);
    }
  }, [isSuccess, handleSpin, randomNumber]);

  const handleMintClick = () => {
    const newRandomNumber = Math.ceil(Math.random() * 3) as 1 | 2 | 3;
    setRandomNumber(newRandomNumber);

    if (isLoading || spinning || !connected) return;

    if (newRandomNumber === 1) {
      write1 && write1();
    } else if (newRandomNumber === 2) {
      write2 && write2();
    } else {
      write3 && write3();
    }
    isFirstSuccess.current = true; // Set the ref back to true
  };

  return (
    <div className="flex w-full flex-row items-center justify-center">
      <AlertDialog>
        <AlertDialogTrigger className="flex w-[200px] items-center justify-center rounded-md bg-fuchsia-600 p-2 font-bold text-white hover:bg-fuchsia-500">
          {isLoading ? (
            <div className="flex flex-row items-center justify-center gap-2">
              <HiRefresh size={20} className="animate-spin font-extrabold" />
              Minting...
            </div>
          ) : (
            "Mint"
          )}
        </AlertDialogTrigger>
        <AlertDialogContent className="mx-4 w-5/6 border-none bg-indigo-800/60">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-semibold text-white">
              Mint an NFT
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white ">
              The mint price is <b>20</b> ELA and you will receive one of the 3
              NFTs at random. Do you wish to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-none bg-zinc-300 hover:bg-zinc-500">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="text-md rounded-md bg-fuchsia-600 p-2 font-bold text-white hover:bg-fuchsia-800 disabled:cursor-not-allowed md:w-[100px]"
              disabled={
                !write1 ||
                !write2 ||
                !write3 ||
                isLoading ||
                spinning ||
                !connected
              }
              onClick={() => handleMintClick()}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
          {/* <button className="rounded-md bg-black/40 p-2">Cancel</button> */}
        </AlertDialogContent>
      </AlertDialog>

      {/* {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
      {(isPrepareError || isError) && (
        <div className="text-white">
          Error: {(prepareError ?? error)?.message}
        </div>
      )} */}
    </div>
  );
}
