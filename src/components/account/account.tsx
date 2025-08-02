"use client";

import { MouseEvent, useState } from "react";
import { Connector } from "wagmi";
import { useAccount, useConnect, useDisconnect, useSwitchAccount } from "wagmi";
import { Button } from "../ui/button";
import { AccountInfo } from "./accountInfo";
import { SwitchAccount } from "./switchAcc";
import { NewAccountBox } from "./newAccount";

export function Account() {
	const { isConnected, isReconnecting, addresses, chain, connector } =
		useAccount();
	const { disconnectAsync, isSuccess, isPending } = useDisconnect();
	const {
		switchAccountAsync,
		isPending: isSwitchingAccount,
		connectors: switchConnector,
	} = useSwitchAccount();
	const { connectAsync, connectors: newConnector } = useConnect();
	const [isNewAccountBoxOpen, setIsNewAccountBoxOpen] =
		useState<boolean>(false);

	const handleNewAccountConnection = async (connector: Connector) => {
		try {
			await connectAsync({ connector });
			setIsNewAccountBoxOpen(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleNewAccountBoxOpen = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsNewAccountBoxOpen(!isNewAccountBoxOpen);
	};

	const handleSwitchAccount = async (connector: Connector) => {
		try {
			await switchAccountAsync({ connector });
		} catch (error) {
			console.error("Failed to switch account:", error);
		}
	};

	const handleDisconnect = async () => {
		try {
			await disconnectAsync();
		} catch (error) {
			console.error("Failed to disconnect:", error);
		}
	};

	// If not connected, show nothing or a message
	if (!isConnected) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900  w-full flex items-center justify-center p-4">
				<div className="w-full max-w-md">
					<div className="bg-card border border-border rounded-lg p-6 shadow-lg">
						<div className="text-center">
							<div className="text-muted-foreground text-sm">
								No wallet connected
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 w-full flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-semibold text-card-foreground">
						Wallet Connected
					</h2>
					<Button variant="outline" onClick={handleNewAccountBoxOpen}>
						Connect New Account
					</Button>
				</div>
				{isNewAccountBoxOpen && (
					<div className="mt-10 my-7">
						<NewAccountBox
							handleNewAccountConnection={
								handleNewAccountConnection
							}
							connectors={newConnector as Connector[]}
							isPending={isPending}
						/>
					</div>
				)}
				<AccountInfo
					isConnected={isConnected}
					isReconnecting={isReconnecting}
					addresses={(addresses as string[]) || []}
					connector={connector}
					chain={chain}
					handleDisconnect={handleDisconnect}
					handleSwitchAccount={handleSwitchAccount}
					switchConnector={switchConnector}
					isPending={isPending}
					isSuccess={isSuccess}
				/>
				{/* Switch Account Section - Always visible when connected */}
				{switchConnector && switchConnector.length > 0 && (
					<div className="mt-4">
						<SwitchAccount
							handleSwitchAccount={handleSwitchAccount}
							switchConnector={[...switchConnector]}
							isPending={isSwitchingAccount}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
