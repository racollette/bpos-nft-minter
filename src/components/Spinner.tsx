"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useBlockNumber, useContractReads, useNetwork } from "wagmi";
import { MintNFT } from "~/components/Mint";
import { Profile } from "~/components/Profile";
import dynamic from "next/dynamic";
import Link from "next/link";

const OverlayNoSSR = dynamic(() => import("./Overlay"), { ssr: false });

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

export const nftType = {
  1: {
    title: "Proof of Work",
    details: "Earn $GLIDE",
    ipfs: "QmRnsd2KQpNYsspjnA2F9qAdicMcuzrZMzSCMupCge4mkf",
    address: "7C8bD2A803D933557741965205f21F7088311468",
    translation: 11900,
  },
  2: {
    title: "Proof of Stake",
    details: "50% discount on Elasafe (Elastos node service provider)",
    ipfs: "Qmem84KjqcQsgNTnDaxTdngc1hJ4me6TBS2U4VZHdw4pMK",
    address: "fE712eC85326bB9E54637896abf2a646CD081e39",
    translation: 14155,
  },
  3: {
    title: "Proof of Integrity",
    details: "20% discount using Elacity Flint’s generative AI tools",
    ipfs: "QmYfxHFQoBsHbZs2KHBdLYLCd5SerBqMEEaiX7GmictT7R",
    address: "a30ae22b56dE03E94B3773F50089B0A2A557F955",
    translation: 15580,
  },
};

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

  return (
    <div
      className="flex h-[625px] w-full flex-col items-center gap-8 overflow-hidden md:w-4/5"
      ref={containerRef}
    >
      <div className="flex flex-col justify-center  gap-4 md:flex-row">
        <Profile />
        <MintNFT
          handleSpin={handleSpin}
          spinning={spin}
          connected={(chain && chain.id === 20) ?? false}
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
            <h1 className="text-lg font-extrabold text-white md:text-xl">
              You minted a {type} NFT!
            </h1>
            <div className="mt-2 text-lg text-white">
              <Link
                href="https://ela.city/"
                target="_blank"
                className="flex flex-row items-center justify-center gap-4 rounded-2xl bg-emerald-500 py-2 hover:bg-emerald-400"
              >
                <Image
                  src="/images/elacity.jpg"
                  width={50}
                  height={50}
                  alt="Ela.city"
                  className="rounded-full"
                />
                <p className="text-lg font-semibold md:text-xl">
                  Trade it on Ela.city!
                </p>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Spinner;
