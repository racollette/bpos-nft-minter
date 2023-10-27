"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useBlockNumber } from "wagmi";

const images = [
  "/NFT1_AuXPoW.png",
  "/NFT2_BPoS.png",
  "/NFT3_PoI.png",
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

const nftType = {
  1: "Proof of Work",
  2: "Proof of Stake",
  3: "Proof of Integrity",
};

const Spinner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [spin, setSpin] = useState(false);
  const [spinState, setSpinState] = useState<1 | 2 | 3>(1);
  const [type, setType] = useState<string>("");
  const [startingPoint, setStartingPoint] = useState();
  const spinnerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const spinDuration = 10000;

  const { data, isError, isLoading } = useBlockNumber();
  console.log(data);

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
      setType(nftType[randomNumber]);
    }, spinDuration);
  };

  console.log(spinState);
  console.log(type);

  useEffect(() => {
    const spinnerWidth = spinnerRef.current?.clientWidth;
    console.log(spinnerWidth);
    const containerWidth = containerRef.current?.clientWidth;
    console.log(containerWidth);

    // const
    // const imagesFromStart = containerWidth && containerWidth / 2 / imageWidth;
    // console.log(imagesFromStart);
  }, [spin]);

  return (
    <div
      className="flex h-[500px] w-4/5 flex-col items-center gap-8 overflow-hidden"
      ref={containerRef}
    >
      <button
        className="text-md h-20 w-1/4 rounded-lg bg-fuchsia-600 font-bold text-white hover:bg-fuchsia-500 disabled:cursor-not-allowed"
        onClick={handleSpin}
        disabled={spin}
      >
        Spin
      </button>
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
            <Image
              key={index}
              src={image}
              alt={`Image ${index}`}
              height={316}
              width={316}
              className={`mx-0.5 transition-opacity ${
                index === currentIndex ? "opacity-100" : "opacity-100"
              }`}
            />
          ))}
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 transform text-center">
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
