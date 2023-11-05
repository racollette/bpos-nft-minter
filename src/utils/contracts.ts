import { parseEther } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { nftType } from "~/components/Spinner";

const abi = [
  {
    name: "mintNFT",
    type: "function",
    stateMutability: "payable",
    inputs: [
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
];

export const usePreparedContracts = () => {
  const { config: config1 } = usePrepareContractWrite({
    address: `0x${nftType[1].address}`,
    abi: abi,
    functionName: "mintNFT",
    args: [`https://gateway.pinata.cloud/ipfs/${nftType[1].ipfs}`],
    value: parseEther("0.02"),
  });

  const { config: config2 } = usePrepareContractWrite({
    address: `0x${nftType[2].address}`,
    abi: abi,
    functionName: "mintNFT",
    args: [`https://gateway.pinata.cloud/ipfs/${nftType[2].ipfs}`],
    value: parseEther("0.02"),
  });

  const { config: config3 } = usePrepareContractWrite({
    address: `0x${nftType[3].address}`,
    abi: abi,
    functionName: "mintNFT",
    args: [`https://gateway.pinata.cloud/ipfs/${nftType[3].ipfs}`],
    value: parseEther("0.02"),
  });

  const {
    data: data1,
    error,
    isError,
    write: write1,
  } = useContractWrite(config1);

  const { data: data2, write: write2 } = useContractWrite(config2);

  const { data: data3, write: write3 } = useContractWrite(config3);

  return { write1, data1, write2, data2, write3, data3 };
};
