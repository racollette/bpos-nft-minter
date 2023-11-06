import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import { WagmiConfig, createConfig } from "wagmi";
import { createPublicClient, http } from "viem";
import { elastos } from "~/utils/config";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
// import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const config = createConfig({
  autoConnect: true,
  connectors: [
    // new MetaMaskConnector(),
    new InjectedConnector({
      options: {
        name: "Browser Wallet",
      },
    }),
    new WalletConnectConnector({
      chains: [elastos],
      options: {
        projectId: "02f588d124c1f0e3ab7981e8b5043840",
      },
    }),
  ],
  // @ts-expect-error I don't know
  publicClient: createPublicClient({
    chain: elastos,
    transport: http(),
  }),
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <WagmiConfig config={config}>
        <Component {...pageProps} />
      </WagmiConfig>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
