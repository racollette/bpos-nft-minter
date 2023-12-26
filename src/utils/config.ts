import { Chain } from "wagmi";

export const elastos = {
  id: 20,
  name: "Elastos",
  network: "elastos",
  nativeCurrency: {
    decimals: 18,
    name: "Elastos",
    symbol: "ELA",
  },
  rpcUrls: {
    public: { http: ["https://api.elastos.io/esc"] },
    default: { http: ["https://api.elastos.io/esc"] },
  },
  blockExplorers: {
    etherscan: { name: "ESC Block Explorer", url: "https://esc.elastos.io" },
    default: { name: "ESC Block Explorer", url: "https://esc.elastos.io" },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 11_907_934,
    },
  },
} as const satisfies Chain;
