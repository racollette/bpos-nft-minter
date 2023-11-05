"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useBlockNumber, useContractReads, useNetwork } from "wagmi";
import { MintNFT } from "~/components/Mint";
import { Profile } from "~/components/Profile";
import abi from "~/utils/abi.json";

const images = [
  "/images/NFT1_AuXPoW.png",
  "/images/NFT2_BPoS.png",
  "/images/NFT3_PoI.png",
  // Add more image paths as needed
];

const repetitions = 20;
const spinnerImages = Array.from(
  { length: images.length * repetitions },
  () => [...images],
).flat();

const finalXTranslation = {
  1: 11700,
  2: 14016,
  3: 16043,
};

// QmYfxHFQoBsHbZs2KHBdLYLCd5SerBqMEEaiX7GmictT7R // PoI
// QmRnsd2KQpNYsspjnA2F9qAdicMcuzrZMzSCMupCge4mkf // PoW
// Qmem84KjqcQsgNTnDaxTdngc1hJ4me6TBS2U4VZHdw4pMK // BPoS

export const nftType = {
  1: {
    title: "Proof of Work",
    details: "Earn $GLIDE",
    ipfs: "QmRnsd2KQpNYsspjnA2F9qAdicMcuzrZMzSCMupCge4mkf",
    address: "0292c98C661eA81814488df43734340BdFC7D2f7",
  },
  2: {
    title: "Proof of Stake",
    details: "50% discount on Elasafe (Elastos node service provider)",
    ipfs: "Qmem84KjqcQsgNTnDaxTdngc1hJ4me6TBS2U4VZHdw4pMK",
    address: "06093eBDd2f83cc56caF99A6b4cccf5E2848D619",
  },
  3: {
    title: "Proof of Integrity",
    details: "20% discount using Elacity Flint’s generative AI tools",
    ipfs: "QmYfxHFQoBsHbZs2KHBdLYLCd5SerBqMEEaiX7GmictT7R",
    address: "D3F17dD24EecC74961c69f61f53bE60795EDe436",
  },
};

function getNFTNumber(url: string): 1 | 2 | 3 {
  if (url.includes("PoW")) return 1;
  if (url.includes("BPoS")) return 2;
  return 3;
}

const Spinner: React.FC = () => {
  const { chain } = useNetwork();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [spin, setSpin] = useState(false);
  const [spinState, setSpinState] = useState<1 | 2 | 3>(1);
  const [type, setType] = useState<string>("");
  const spinnerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const spinDuration = 10000;

  const { data, isError, isLoading } = useBlockNumber();

  const handleSpin = () => {
    // spinnerRef.current?.style.setProperty("transform", `translateX(-100px)`);
    setType("");
    const randomNumber = Math.ceil(Math.random() * 3) as 1 | 2 | 3;
    setSpinState(randomNumber);
    setSpin(true);
    spinnerRef.current?.style.setProperty(
      "transform",
      `translateX(-${finalXTranslation[randomNumber]}px)`,
    );

    setTimeout(() => {
      setSpin(false);
      setType(nftType[randomNumber].title);
    }, spinDuration);
  };

  // const mintedCountABI = [
  //   {
  //     type: "function",
  //     inputs: [],
  //     name: "totalMintedNFTs",
  //     outputs: [
  //       {
  //         type: "uint256",
  //         name: "",
  //       },
  //     ],
  //     stateMutability: "view",
  //   },
  // ];

  const {
    data: mintedData,
    isError: isMintedError,
    isLoading: isMintedLoading,
  } = useContractReads({
    contracts: [
      {
        address: `0x${nftType[1].address}`,
        // abi: abi,
        functionName: "totalMintedNFTs",
      },
      {
        address: `0x${nftType[2].address}`,
        // abi: mintedCountABI,
        functionName: "totalMintedNFTs",
      },
      {
        address: `0x${nftType[3].address}`,
        // abi: mintedCountABI,
        functionName: "totalMintedNFTs",
      },
    ],
  });

  console.log(mintedData);

  //console.log(spinState);
  //console.log(type);

  // useEffect(() => {
  //   const spinnerWidth = spinnerRef.current?.clientWidth;
  //   // console.log(spinnerWidth);
  //   const containerWidth = containerRef.current?.clientWidth;
  //   // console.log(containerWidth);

  //   // const
  //   // const imagesFromStart = containerWidth && containerWidth / 2 / imageWidth;
  //   // console.log(imagesFromStart);
  // }, [spin]);

  // console.log(spinnerImages);

  return (
    <div
      className="flex h-[500px] w-4/5 flex-col items-center gap-8 overflow-hidden"
      ref={containerRef}
    >
      <div className="flex justify-center gap-4">
        <Profile />{" "}
        <MintNFT
          handleSpin={handleSpin}
          spinning={spin}
          connected={(chain && chain.id === 20) ?? false}
          spinState={spinState}
        />
      </div>

      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <div
          ref={spinnerRef}
          className={`flex items-center justify-center ${
            spin && spinState === 1
              ? `animate-carousel-spin-1`
              : spin && spinState === 2
              ? `animate-carousel-spin-2`
              : spin && spinState === 3
              ? `animate-carousel-spin-3`
              : ""
          }`}
          //   style={{ animation: "carousel-spin-1 10 linear infinite" }}
        >
          {spinnerImages.map((image, index) => (
            <div
              className="group relative mx-0.5 h-[316px] w-[316px]"
              key={index}
            >
              <Image
                src={image}
                alt={`Image ${index}`}
                // width={316}
                // height={316}
                // className={`mx-0.05 group relative`}
                fill
              />
              <div className="absolute left-0 top-0 z-50 flex h-full w-full transform flex-col items-center justify-center gap-2 bg-black bg-opacity-80 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h1 className="text-xl font-extrabold">
                  {nftType[getNFTNumber(image)].title}
                </h1>
                <p className="w-5/6 text-center">
                  <span className="font-bold">Utility:&nbsp;</span>
                  {nftType[getNFTNumber(image)].details}
                </p>
                {!isLoading && !isError && mintedData && (
                  <p>
                    <span className="font-bold">Minted:&nbsp;</span>
                    <span>
                      {getNFTNumber(image) === 1
                        ? String(mintedData[0]?.result)
                        : getNFTNumber(image) === 2
                        ? String(mintedData[1]?.result)
                        : String(mintedData[2]?.result)}
                      /88
                    </span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute left-1/2 z-0 -translate-x-1/2 transform text-center">
          <div className={`mx-1 h-[400px] w-2 bg-yellow-500`}></div>
        </div>
      </div>
      <div className="h-10">
        {type && (
          <h1 className="text-xl font-extrabold text-white">
            You minted a {type} NFT!
          </h1>
        )}
      </div>
    </div>
  );
};

export default Spinner;
