import { Connector, useBalance } from "wagmi";
import { Button } from "../ui/button";
import ClipBoardIcon from "@/icons/clipboard";
import { useState } from "react";
import { SendIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SendTransaction } from "./sendTransaction";
import { Chain } from "viem";

interface AccountDataProps {
	isConnected: boolean;
	isReconnecting: boolean;
	addresses: string[];
	connector: unknown;
	chain: unknown;
	handleDisconnect: () => void;
	handleSwitchAccount: (connector: Connector) => void;
	switchConnector: readonly Connector[];
	isPending: boolean;
	isSuccess: boolean;
}

export function AccountInfo({
	isConnected,
	isReconnecting,
	addresses,
	connector,
	chain,
	handleDisconnect,
	switchConnector,
	isPending,
	isSuccess,
}: AccountDataProps) {
	const [isPrivacyMode, setIsPrivacyMode] = useState(false);
	const { data: balance } = useBalance({
		address: addresses[0] as `0x${string}`,
		chainId:
			typeof chain === "object" &&
			chain !== null &&
			"id" in chain &&
			((chain as { id: unknown }).id === 1 ||
				(chain as { id: unknown }).id === 11155111)
				? (chain as { id: 1 | 11155111 }).id
				: undefined,
		unit: "ether",
	});
	const formatAddress = (address: string) => {
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

	return (
		<div className="bg-card border border-border rounded-lg p-6 shadow-lg">
			{/* Header */}
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-3">
					<div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
					<h2 className="text-lg font-semibold text-card-foreground">
						Wallet Connected
					</h2>
				</div>
				<div className="flex gap-4 pt-2">
					<div className="flex items-center gap-2">
						<div
							className={`w-2 h-2 rounded-full ${
								isConnected ? "bg-green-500" : "bg-red-500"
							}`}
						></div>
						<span className="text-xs text-muted-foreground">
							{isConnected ? "Connected" : "Disconnected"}
						</span>
					</div>
					{isReconnecting && (
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
							<span className="text-xs text-muted-foreground">
								Reconnecting...
							</span>
						</div>
					)}
				</div>
			</div>

			{/* Connection Status */}
			<div className="space-y-4">
				{/* Address */}
				<div className="space-y-2">
					<label className="text-sm font-medium text-muted-foreground">
						Address
					</label>
					<div className="bg-muted/50 border border-border rounded-md p-3 flex justify-between items-center">
						<div className="font-mono text-sm text-card-foreground">
							{addresses?.[0]
								? formatAddress(addresses[0])
								: "N/A"}
						</div>
						<Button
							variant="ghost"
							onClick={() => {
								navigator.clipboard.writeText(
									addresses[0] || ""
								);
							}}
							className="p-2 hover:bg-muted/50 hover:text-card-foreground hover:cursor-pointer"
						>
							<ClipBoardIcon />
						</Button>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-3">
					{/* Chain Information */}
					<div className="space-y-2">
						<label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
							<div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
							Network
						</label>
						<div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-3 backdrop-blur-sm">
							<div className="flex items-center gap-2">
								<div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
									<svg
										className="w-3 h-3 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13 10V3L4 14h7v7l9-11h-7z"
										/>
									</svg>
								</div>
								<div>
									<span className="text-xs font-medium text-card-foreground">
										{(chain as { name?: string })?.name ||
											"Unknown Network"}
									</span>
									<div className="text-xs text-muted-foreground">
										Active
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Connector */}
					<div className="space-y-2">
						<label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
							<div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
							Connector
						</label>
						<div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-3 backdrop-blur-sm">
							<div className="flex items-center gap-2">
								<img
									src={(connector as { icon?: string })?.icon}
									alt={(connector as { name?: string })?.name}
									className="w-6 h-6 rounded"
								/>
								<div>
									<span className="text-xs font-medium text-card-foreground">
										{(connector as { name?: string })
											?.name || "Unknown"}
									</span>
									<div className="text-xs text-muted-foreground">
										Connected
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Balance */}
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
							<div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
							Balance
						</label>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setIsPrivacyMode(!isPrivacyMode)}
							className="h-6 px-2 text-xs hover:bg-muted/50"
						>
							{isPrivacyMode ? (
								<svg
									className="w-3 h-3"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
							) : (
								<svg
									className="w-3 h-3"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
									/>
								</svg>
							)}
						</Button>
					</div>
					<div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-lg p-3 backdrop-blur-sm">
						<div className="flex items-center gap-2">
							<div className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-md flex items-center justify-center">
								<svg
									className="w-3 h-3 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<div>
								<span className="text-xs font-medium text-card-foreground">
									{isPrivacyMode
										? "••••••••"
										: balance?.value || "0.00"}
								</span>
								<div className="text-xs text-muted-foreground">
									{isPrivacyMode ? "Hidden" : "ETH"}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Send Transaction */}
				<SendTransaction
					address={addresses[0]}
					connector={connector as Connector}
					chain={chain as Chain}
				/>
			</div>

			{/* Action Buttons */}
			<div className="mt-6 pt-4 border-t border-border space-y-3">
				{/* Switch Account Button */}
				{switchConnector && switchConnector.length > 0 && (
					<Button
						onClick={() => {
							// Show switch account options
							const switchSection = document.getElementById(
								"switch-account-section"
							);
							if (switchSection) {
								switchSection.classList.toggle("hidden");
							}
						}}
						variant="outline"
						className="w-full"
					>
						Switch Account
					</Button>
				)}

				{/* Disconnect Button */}
				<Button
					onClick={handleDisconnect}
					disabled={isPending}
					variant="destructive"
					className="w-full"
				>
					{isPending ? "Disconnecting..." : "Disconnect Wallet"}
				</Button>
			</div>

			{/* Success Message */}
			{isSuccess && (
				<div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-md">
					<div className="text-sm text-green-500">
						Successfully disconnected
					</div>
				</div>
			)}
		</div>
	);
}
