/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import Image from "next/image";
import ImageSpinner from "~/components/Spinner";
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
        <title>Elastic Consensus NFT</title>
        <meta name="description" content="Celebrating Elastic Consensus" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nosifer&family=Shadows+Into+Light&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {/* Hero Image */}
        <div className="hero-image absolute left-0 top-0 w-full brightness-[0.35]">
          <Image
            src="/images/Combined_NFT.png" // Update the path to your hero image
            alt="Elastic Consensus NFT"
            width={1920} // Adjust the width to the image's width
            height={400} // Adjust the height to the image's height
          />
        </div>

        <div className="container relative z-10 flex flex-col items-center justify-center gap-12 px-4 pb-8 pt-16">
          <h1 className="font-sa font-shadows flex flex-row gap-4 text-3xl font-extrabold tracking-tight text-white md:text-6xl">
            Celebrating
            <span className="animate-bounce text-[hsl(280,100%,70%)]">
              Elastic
            </span>
            Consensus
          </h1>
          <Accordion type="single" collapsible>
            <AccordionItem
              value="item-1"
              className="w-[500px] border-none text-white"
            >
              <AccordionTrigger className="text-semibold font-shadows text-xl">
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
                <div className="mt-2 flex flex-col gap-2">
                  <p className="font-semibold">
                    Proof of Work{" "}
                    <span className="font-normal">- Earn $GLIDE</span>
                  </p>
                  <p className="font-semibold">
                    Proof of Stake{" "}
                    <span className="font-normal">
                      - 50% discount on Elasafe (Elastos node service provider)
                    </span>
                  </p>
                  <p className="font-semibold">
                    Proof of Integrity{" "}
                    <span className="font-normal">
                      - 20% discount using Elacity Flint’s generative AI tools
                    </span>
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-2"
              className="w-[500px] border-none text-white"
            >
              <AccordionTrigger className="text-semibold font-shadows text-xl">
                Why collect them all?
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold">
                    Completing the full picture by collecting one of each NFT
                    comes with an added benefit!
                  </p>
                  <p>
                    Holders of all three NFTs receive the benefits of each
                    (hover images to see utility) as well as the ability to earn
                    some additional ELA.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="z-20 flex h-full w-full flex-row items-center justify-center">
          <ImageSpinner />
        </div>
      </main>
    </>
  );
}
