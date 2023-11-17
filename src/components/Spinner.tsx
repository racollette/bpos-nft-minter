"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useBlockNumber, useContractReads, useNetwork } from "wagmi";
import { MintNFT } from "~/components/Mint";
import dynamic from "next/dynamic";
import Link from "next/link";
import { nftType } from "~/utils/contracts";

const OverlayNoSSR = dynamic(() => import("./Overlay"), { ssr: false });
export const ProfileNoSSR = dynamic(() => import("./Profile"), { ssr: false });

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

const Spinner: React.FC = () => {
  const { chain } = useNetwork();
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [spin, setSpin] = useState(false);
  const [spinState, setSpinState] = useState<1 | 2 | 3>(2);
  const [type, setType] = useState<string>("");
  const spinnerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const spinDuration = 10000;

  // const { data, isError, isLoading } = useBlockNumber();

  const mintedCountABI = [
    {
      type: "function",
      inputs: [],
      name: "totalMintedNFTs",
      outputs: [
        {
          type: "uint256",
          name: "",
        },
      ],
      stateMutability: "view",
    },
  ];

  const {
    data: mintedData,
    isError: isMintedError,
    isLoading: isMintedLoading,
  } = useContractReads({
    contracts: [
      {
        address: `0x${nftType[1].address}`,
        // @ts-expect-error unknown
        abi: mintedCountABI,
        functionName: "totalMintedNFTs",
      },
      {
        address: `0x${nftType[2].address}`,
        // @ts-expect-error unknown
        abi: mintedCountABI,
        functionName: "totalMintedNFTs",
      },
      {
        address: `0x${nftType[3].address}`,
        // @ts-expect-error unknown
        abi: mintedCountABI,
        functionName: "totalMintedNFTs",
      },
    ],
  });

  const handleSpin = (randomNumber: 1 | 2 | 3) => {
    // spinnerRef.current?.style.setProperty("transform", `translateX(-100px)`);
    setType("");
    setSpinState(randomNumber);
    setSpin(true);

    spinnerRef.current?.style.setProperty(
      "transform",
      `translateX(-${nftType[randomNumber].translation}px)`,
    );

    setTimeout(() => {
      setSpin(false);
      setType(nftType[randomNumber].title);
    }, spinDuration);
  };

  return (
    <div
      className="flex h-[625px] w-full flex-col items-center gap-8 overflow-hidden md:w-4/5"
      ref={containerRef}
    >
      <div className="flex flex-col justify-center gap-4 md:flex-row">
        <ProfileNoSSR />
        <MintNFT
          handleSpin={handleSpin}
          spinning={spin}
          connected={(chain && chain.id === 20) ?? false}
          mintedData={mintedData}
        />
      </div>

      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <div
          ref={spinnerRef}
          className={`flex -translate-x-20 transform items-center justify-center ${
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
              className={`group relative mx-0.5 h-[316px] w-[316px] ${
                image.includes("PoW") && `ml-3`
              } ${image.includes("PoI") && `mr-3`}`}
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
              <OverlayNoSSR image={image} mintedData={mintedData} />
            </div>
          ))}
        </div>
        <div className="absolute left-1/2 z-0 -translate-x-1/2 transform text-center">
          <div className={`mx-1 h-[500px] w-2 bg-yellow-500`}></div>
        </div>
      </div>
      <div className="mb-10 h-48">
        {type && (
          <>
            <h1 className="mb-4 text-lg font-extrabold text-white md:text-xl">
              You minted a {type} NFT!
            </h1>
            <div className="mt-2 text-lg text-white">
              <Link
                href="/dashboard"
                className="flex flex-row items-center justify-center gap-4 rounded-lg bg-fuchsia-600 py-2 hover:bg-fuchsia-700"
              >
                <p className="text-md font-semibold">View on the dashboard!</p>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Spinner;
