import React from "react";
import { nftType } from "~/utils/contracts";

type OverlayProps = {
  image: string;
  mintedData:
    | (
        | {
            error: Error;
            result?: undefined;
            status: "failure";
          }
        | {
            error?: undefined;
            result: unknown;
            status: "success";
          }
      )[]
    | undefined;
};

function getNFTNumber(url: string): 1 | 2 | 3 {
  if (url.includes("PoW")) return 1;
  if (url.includes("BPoS")) return 2;
  return 3;
}

const Overlay = ({ image, mintedData }: OverlayProps) => {
  const max = 88;
  const nftNumber = getNFTNumber(image);
  const mintedValue = mintedData?.[nftNumber - 1]?.result;

  return (
    <div className="absolute left-0 top-0 z-50 flex h-full w-full transform flex-col items-center justify-center gap-2 bg-black bg-opacity-80 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
      <h1 className="text-xl font-extrabold">
        {nftType[getNFTNumber(image)].title}
      </h1>
      <p className="w-5/6 text-center">
        <span className="font-bold">Utility:&nbsp;</span>
        {nftType[getNFTNumber(image)].details}
      </p>

      <p>
        <span className="font-bold">
          Minted:&nbsp;{String(mintedValue ?? "-")}/{max}
        </span>
      </p>
    </div>
  );
};

export default Overlay;
