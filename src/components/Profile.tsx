"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { AiOutlineDisconnect } from "react-icons/ai";
import { useNetwork } from "wagmi"; // Import the useNetwork hook
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/@/components/dialog";
import Image from "next/image";

export function Profile() {
  const { address, connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();

  if (isConnected) {
    if (chain && chain.id !== 20) {
      return (
        <div className="text-red-500">
          Please switch to the Elastos Smart Chain
        </div>
      );
    }

    return (
      <div className="flex flex-row items-center justify-center gap-2">
        <button
          className="flex w-[200px] flex-row items-center justify-center gap-2 rounded-md bg-sky-400 p-2 font-bold text-white hover:bg-sky-500"
          onClick={() => disconnect()}
        >
          <div className="text-white">{address?.slice(0, 8)}</div>
          <AiOutlineDisconnect size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <Dialog>
        <DialogTrigger className="flex w-[200px] items-center justify-center rounded-md bg-sky-400 p-2 font-bold text-white hover:bg-sky-500">
          Connect Wallet
        </DialogTrigger>
        <DialogContent className="mx-4 w-5/6 border-none bg-indigo-800/60">
          <DialogHeader>
            <DialogTitle className="font-semibold text-white">
              Choose Wallet
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 text-white md:flex-row">
            {connectors.map((connector) => (
              <button
                className="flex flex-row items-center justify-center gap-2 rounded-md bg-indigo-800 p-2 text-sm font-extrabold"
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
              >
                <Image
                  src={
                    connector.id === "injected"
                      ? `/icons/metamask.svg`
                      : `/icons/walletConnect.svg`
                  }
                  width={26}
                  height={26}
                  alt={
                    connector.id === "injected" ? `MetaMask` : `Wallet Connect`
                  }
                />
                {connector.name}
                {/* {isLoading &&
                  pendingConnector?.id === connector.id &&
                  " (connecting)"} */}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
