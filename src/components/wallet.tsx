"use client";

import { useConnections } from "wagmi";
import { Account } from "./account/account";
import { WalletOptions } from "./connectWalllet";

export function Wallet() {
	const connections = useConnections();
	return connections.length === 0 ? <WalletOptions /> : <Account />;
}
