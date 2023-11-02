import * as React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

export function MintNFT() {
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

  return (
    <div className="flex flex-row items-center justify-center">
      <button
        className="rounded-lg bg-green-500 p-4 text-white"
        disabled={!write || isLoading}
        onClick={() => write()}
      >
        {isLoading ? "Minting..." : "Mint"}
      </button>
      {isSuccess && (
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
      )}
    </div>
  );
}
