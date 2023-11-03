import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { api } from "~/utils/api";
import ImageSpinner from "~/components/Spinner";
import { Profile } from "~/components/Profile";
import { MintNFT } from "~/components/Mint";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/@/components/accordion";

export default function Home() {
  return (
    <>
      <Head>
        <title>BPoS NFT</title>
        <meta name="description" content="Celebrating Elastic Consensus" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Elastos <span className="text-[hsl(280,100%,70%)]">BPoS</span> NFT
          </h1>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-none text-white">
              <AccordionTrigger>What is this?</AccordionTrigger>
              <AccordionContent>
                Elastos’ Elastic Consensus, including its novel variable Bonded
                Proof of Stake consensus, is up and running with new upgrades to
                the blockchain infrastructure recently implemented. To mark the
                occasion, Elastos has also commissioned three unique NFTs each
                representing a different aspect of the Elastic Consensus
                (AuxPoW, BPoS and PoI) and each with a unique benefit for the
                Elastos ecosystem. When combined, you get the full picture and
                an added benefit.
              </AccordionContent>
            </AccordionItem>
            {/* <AccordionItem value="item-2" className="border-none text-white">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem> */}
          </Accordion>
        </div>
        {/* <div className="flex h-full w-full flex-row items-center justify-center">
          <MintNFT />
        </div> */}
        {/* <div className="flex flex-row">
          <Image
            src="/NFT1_AuXPoW.png"
            height={400}
            width={400}
            alt="Proof of Work"
          />
          <Image
            src="/NFT2_BPoS.png"
            height={400}
            width={400}
            alt="Proof of Stake"
          />
          <Image
            src="/NFT3_PoI.png"
            height={400}
            width={400}
            alt="Proof of Integrity"
          />
        </div> */}
        <div className="m-2">
          <Profile />
        </div>
        <div className="flex h-full w-full flex-row items-center justify-center">
          <ImageSpinner />
        </div>
      </main>
    </>
  );
}
