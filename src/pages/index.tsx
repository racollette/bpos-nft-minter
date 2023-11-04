import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { api } from "~/utils/api";
import ImageSpinner from "~/components/Spinner";
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
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-6xl">
            Celebrating{" "}
            <span className="text-[hsl(280,100%,70%)]">Elastic</span> Consensus
          </h1>
          <Accordion type="single" collapsible>
            <AccordionItem
              value="item-1"
              className="w-[500px] border-none text-white"
            >
              <AccordionTrigger className="text-semibold text-lg">
                What is this?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  {`Elastos’ Elastic Consensus, including its novel variable Bonded
                Proof of Stake implementation, is up and running!`}
                </p>
                <br />
                <p>
                  {`To mark the occasion, Elastos has also commissioned three unique NFTs, each representing a different pillar of the Elastic Consensus. These include Auxiliary Proof of Work (AuxPoW, aka Bitcoin merge mining), Bonded Proof of Stake (BPoS) and Proof of Integrity (PoI, aka The Cyber Republic Council). Each NFT comes with a unique benefit within the Elastos ecosystem.`}
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-2"
              className="w-[500px] border-none text-white"
            >
              <AccordionTrigger className="text-semibold text-lg">
                Why collect them all?
              </AccordionTrigger>
              <AccordionContent>
                Completing the full picture by collecting one of each NFT comes
                with an added benefit. Holders of all three NFTs get the
                benefits of each as well as the ability to earn some additional
                ELA when staking on Glide Finance.
              </AccordionContent>
            </AccordionItem>
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
        <div className="flex h-full w-full flex-row items-center justify-center">
          <ImageSpinner />
        </div>
      </main>
    </>
  );
}
