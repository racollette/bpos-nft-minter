import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import { WagmiConfig, createConfig } from "wagmi";
import { createPublicClient, http } from "viem";
import { elastos } from "~/utils/config";

const config = createConfig({
  autoConnect: true,
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
