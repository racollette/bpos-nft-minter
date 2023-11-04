import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { AiOutlineDisconnect } from "react-icons/ai";
import { useNetwork } from "wagmi"; // Import the useNetwork hook

export function Profile() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  // Use the useNetwork hook to get chain information
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
      <button
        className="flex w-[200px] items-center justify-center rounded-md bg-sky-400 p-2 font-bold text-white hover:bg-sky-500"
        onClick={() => connect()}
      >
        Connect Wallet
      </button>
    </div>
  );
}
