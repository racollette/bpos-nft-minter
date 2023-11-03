import * as React from "react";
import { useEffect, useRef } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

type MintNFTProps = {
  handleSpin: () => void;
  spinning: boolean;
  connected: boolean;
  spinState: number;
};

export function MintNFT({ handleSpin, spinning, connected }: MintNFTProps) {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: "0xE3443516C9fb60b15241869A3F52231fbe634143",
    abi: [
      {
        name: "mintNFT",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "string",
            name: "tokenURI",
            type: "string",
          },
        ],
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
      },
    ],
    functionName: "mintNFT",
    args: [
      "0x2a63619B9a8707d83Cd2BCF61384864dD281DD76",
      "https://gateway.pinata.cloud/ipfs/QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP",
    ],
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  // Create a ref to track whether isSuccess has changed
  const isFirstSuccess = useRef(true);

  useEffect(() => {
    if (isSuccess && isFirstSuccess.current) {
      isFirstSuccess.current = false; // Set it to false for subsequent renders
      handleSpin();
    }
  }, [isSuccess, handleSpin]);

  const handleMintClick = () => {
    if (!write || isLoading || spinning || !connected) return;
    write();
    // You can add code here to reset the ref if needed
    isFirstSuccess.current = true; // Set the ref back to true
  };

  return (
    <div className="flex w-full flex-row items-center justify-center">
      <button
        className="text-md h-14 w-1/4 rounded-lg bg-fuchsia-600 font-bold text-white hover:bg-fuchsia-500 disabled:cursor-not-allowed"
        disabled={!write || isLoading || spinning || !connected}
        onClick={() => handleMintClick()}
      >
        {isLoading ? "Minting..." : "Mint"}
      </button>
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
