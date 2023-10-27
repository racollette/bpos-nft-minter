import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { AiOutlineDisconnect } from "react-icons/ai";

export function Profile() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (isConnected)
    return (
      <div className="flex flex-row items-center justify-center gap-2">
        <button
          className="flex flex-row items-center justify-center gap-2 rounded-md bg-sky-400 p-2 font-bold text-white"
          onClick={() => disconnect()}
        >
          <div className="text-white">{address?.slice(0, 8)}</div>
          <AiOutlineDisconnect size={20} />
        </button>
      </div>
    );
  return (
    <button
      className="rounded-md bg-fuchsia-500 p-2 font-bold text-white"
      onClick={() => connect()}
    >
      Connect Wallet
    </button>
  );
}
