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
import Link from "next/link";
import { Header } from "~/components/Header";

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
      <Header />
      <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {/* Hero Image */}
        <div className="hero-image absolute left-0 top-0 w-full brightness-[0.35]">
          <Image
            src="/images/Combined_NFT.png"
            alt="Elastic Consensus NFT"
            width={1920}
            height={400}
            className="hidden md:block"
          />
          <Image
            src="/images/NFT1_AuXPoW.png"
            alt="Elastic Consensus NFT"
            width={600}
            height={600}
            className="block md:hidden"
          />
          {/* <Image
            src="/images/NFT2_BPoS.png"
            alt="Elastic Consensus NFT"
            width={400}
            height={400}
            className="block md:hidden"
          />
          <Image
            src="/images/NFT3_PoI.png"
            alt="Elastic Consensus NFT"
            width={400}
            height={400}
            className="block md:hidden"
          /> */}
        </div>

        <div className="container relative z-10 flex flex-col items-center justify-center gap-8 px-4 pb-8 pt-16">
          <h1 className="flex flex-row gap-2 font-shadows text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            Celebrating
            <span className="animate-bounce text-[hsl(280,100%,70%)]">
              Elastic
            </span>
            Consensus
          </h1>
          <h2 className="font-shadows text-xl font-semibold text-white">
            <Link
              href="https://elastos.info"
              target="_blank"
              className="flex flex-row gap-2"
            >
              <span>Securing the</span>
              <Image
                src="/images/logo_no_background.png"
                alt="Elastos"
                width={24}
                height={20}
              />
              <span>Elastos economy</span>
            </Link>
          </h2>
          <Accordion type="single" collapsible>
            <AccordionItem
              value="item-1"
              className="border-none text-white md:w-[500px]"
            >
              <AccordionTrigger className="text-semibold font-shadows text-xl">
                What is this?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Elastos’{" "}
                  <Link
                    target="_blank"
                    className="text-sky-500 underline"
                    href="https://elastos.info/blog/now-is-a-good-time-to-be-a-validator-with-elastos-elastic-consensus/"
                  >
                    Elastic Consensus
                  </Link>
                  , including its novel variable Bonded Proof of Stake (BPosS)
                  is up and running!
                </p>
                <br />
                <p>
                  To mark the occasion, Elastos has commissioned three unique
                  NFTs, each representing a different pillar of the{" "}
                  <Link
                    target="_blank"
                    className="text-sky-500 underline"
                    href="https://elastos.info/blog/elastic-consensus-technical-overview/"
                  >
                    Elastic Consensus
                  </Link>
                  : Auxiliary Proof of Work (AuxPoW, aka Bitcoin merge mining),
                  Bonded Proof of Stake (BPoS) and Proof of Integrity (PoI, aka
                  The Cyber Republic Council). Each NFT comes with a unique
                  benefit within the Elastos ecosystem. Collecting all three
                  gives users even more benefits.
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
              className="border-none text-white md:w-[500px]"
            >
              <AccordionTrigger className="text-semibold font-shadows text-xl">
                Why collect them all?
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold">
                    {`Elastos'`}{" "}
                    <Link
                      target="_blank"
                      className="text-sky-500 underline"
                      href="https://elastos.info/blog/blockchain-consensus-mechanisms-and-what-makes-elastos-unique/"
                    >
                      Elastic Consensus
                    </Link>{" "}
                    {`combines three powerful mechanisms that provide security,
                    flexibility and transparency. By collecting and completing
                    the full picture you'll unlock an additional benefit!`}
                  </p>
                  <p>
                    {`Holders of all three NFTs receive the benefits of each
                    (hover over images to see their utility) as well as the
                    ability to earn additional ELA.`}
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
