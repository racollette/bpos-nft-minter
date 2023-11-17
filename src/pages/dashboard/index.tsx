/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import { Header } from "~/components/Header";
import dynamic from "next/dynamic";

const CompositeHoldingsNoSSR = dynamic(
  () => import("~/components/CompositeHoldings"),
  { ssr: false },
);

const RewardsNoSSR = dynamic(() => import("~/components/Rewards"), {
  ssr: false,
});

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Elastic Consensus NFT | Dashboard</title>
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
      <main className="relative flex min-h-screen flex-col gap-12 bg-gradient-to-b from-[#2e026d] to-[#15162c] pb-20 pt-12 text-white">
        <CompositeHoldingsNoSSR />
        <RewardsNoSSR />
      </main>
    </>
  );
}
