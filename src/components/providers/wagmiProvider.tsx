"use client"

import { WagmiProvider } from "wagmi";
import { ReactNode } from "react";
import { config } from "@/lib/wagmiConf";

export default function WagmiProviderWrapper({
	children,
}: {
	children: ReactNode;
}) {
	return <WagmiProvider config={config}>{children}</WagmiProvider>;
}
