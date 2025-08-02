"use client";

import { SendIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Connector, useBalance, useSendTransaction } from "wagmi";
import { Chain, parseEther } from "viem";
import { useRef } from "react";
import { sendTransactionSchema } from "@/lib/schema";
import { showSuccessToastWithTitle } from "../toast/success";

interface SendTransactionProps {
	address: string;
	connector: Connector;
	chain: Chain;
}

export function SendTransaction({ address, chain }: SendTransactionProps) {
	const addressRef = useRef<HTMLInputElement>(null);
	const amountRef = useRef<HTMLInputElement>(null);
	const messageRef = useRef<HTMLInputElement>(null);

	const { data: balance } = useBalance({
		address: address as `0x${string}`,
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

	const { sendTransactionAsync, isPending, isSuccess, isError, error } =
		useSendTransaction();

	const hanldeSendTransaction = async () => {
		const address = addressRef.current?.value;
		const amount = Number(amountRef.current?.value);
		const message = messageRef.current?.value;

		const result = sendTransactionSchema.safeParse({
			address,
			amount,
			message,
		});

		if (!result.success) {
			console.log(result.error);
			return;
		}

		if (amount > Number(balance?.value)) {
			console.log("Insufficient balance");
			return;
		}

		const tx = await sendTransactionAsync({
			to: address as `0x${string}`,
			value: parseEther(amount.toString()),
			data: message as `0x${string}`,
		});

		if (!tx) {
			console.log("Transaction failed");
			return;
		}

		showSuccessToastWithTitle(
			"Transaction Sent",
			"Transaction sent successfully"
		);
		console.log("Transaction sent successfully");
		console.log(tx);
	};

	return (
		<>
			{/* Send Transaction */}
			<div className="space-y-2">
				<label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
					<div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
					Send Transaction
				</label>
			</div>
			<div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4 backdrop-blur-sm">
				<div className="space-y-3">
					{/* Address Input */}
					<div className="space-y-1.5">
						<Label className="text-xs font-medium text-muted-foreground">
							Recipient Address
						</Label>
						<div className="relative">
							<Input
								ref={addressRef}
								type="text"
								placeholder="0x..."
								className="bg-muted/30 border-border/50 focus:border-blue-500/50 focus:ring-blue-500/20 text-xs h-8"
							/>
							<div className="absolute right-2 top-1/2 transform -translate-y-1/2">
								<svg
									className="w-3 h-3 text-muted-foreground"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							</div>
						</div>
					</div>

					{/* Amount Input */}
					<div className="space-y-1.5">
						<Label className="text-xs font-medium text-muted-foreground">
							Amount (ETH)
						</Label>
						<div className="relative">
							<Input
								ref={amountRef}
								type="text"
								placeholder="0.0"
								className="bg-muted/30 border-border/50 focus:border-blue-500/50 focus:ring-blue-500/20 text-xs h-8 pr-12"
							/>
							<div className="absolute right-2 top-1/2 transform -translate-y-1/2">
								<div className="text-xs text-muted-foreground font-medium">
									ETH
								</div>
							</div>
						</div>
					</div>

					{/* Message Input */}
					<div className="space-y-1.5">
						<Label className="text-xs font-medium text-muted-foreground">
							Message (Optional)
						</Label>
						<div className="relative">
							<Input
								ref={messageRef}
								type="text"
								placeholder="Add a message..."
								className="bg-muted/30 border-border/50 focus:border-blue-500/50 focus:ring-blue-500/20 text-xs h-8"
							/>
							<div className="absolute right-2 top-1/2 transform -translate-y-1/2">
								<svg
									className="w-3 h-3 text-muted-foreground"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>

				{/* Send Button */}
				<div className="mt-4 pt-3 border-t border-blue-500/20">
					<Button
						variant="outline"
						className="w-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30 hover:from-blue-500/20 hover:to-cyan-500/20 hover:border-blue-500/50 text-blue-500 hover:text-blue-400 transition-all duration-200 h-8 text-xs"
						onClick={hanldeSendTransaction}
						disabled={isPending}
					>
						<SendIcon className="w-3 h-3 mr-1.5" />
						{isPending ? "Sending..." : "Send Transaction"}
					</Button>
				</div>

				{/* Error Display */}
				{isError && error && (
					<div className="mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400">
						Error: {error.message}
					</div>
				)}

				{/* Success Display */}
				{isSuccess && (
					<div className="mt-3 p-2 bg-green-500/10 border border-green-500/20 rounded text-xs text-green-400">
						Transaction sent successfully!
					</div>
				)}
			</div>
		</>
	);
}
