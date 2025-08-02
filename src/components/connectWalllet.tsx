"use client";

import { useConnect } from "wagmi";
import { Button } from "./ui/button";
import { Wallet, Sparkles, Shield } from "lucide-react";

export function WalletOptions() {
	const { connectors, connect } = useConnect();

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 flex items-center justify-center p-4">
			<div className="max-w-md w-full">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="flex justify-center mb-4">
						<div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
							<Wallet className="h-8 w-8 text-white" />
						</div>
					</div>
					<h1 className="text-3xl font-bold text-white mb-2">
						Connect Your Wallet
					</h1>
					<p className="text-gray-400 text-sm">
						Choose your preferred wallet to get started
					</p>
				</div>

				{connectors.length === 0 ? (
					<div className="text-center text-red-500 mb-4">
						No wallet connectors available. Please install a wallet
						extension.
					</div>
				) : (
					<>
						{/* Wallet Options */}
						<div className="space-y-4">
							{connectors.map((connector) => (
								<div
									key={connector.uid}
									className="group relative"
								>
									<Button
										onClick={() => connect({ connector })}
										variant="outline"
										className="w-full h-16 text-left px-6 py-4 bg-gray-800/80 backdrop-blur-sm border-2 border-gray-700 hover:border-blue-400 hover:bg-gray-700 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-blue-500/20 group-hover:scale-[1.02] hover:cursor-pointer"
									>
										<div className="flex items-center justify-between w-full">
											<div className="flex items-center space-x-4">
												<div className="p-2 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg border border-gray-600">
													<img
														src={connector.icon}
														alt={`${connector.name} logo`}
														className="h-6 w-6"
													/>
												</div>
												<div>
													<div className="font-semibold text-white">
														{connector.name}
													</div>
													<div className="text-xs text-gray-400">
														Secure connection
													</div>
												</div>
											</div>
											<div className="flex items-center space-x-2">
												<Shield className="h-4 w-4 text-green-400" />
												<span className="text-xs text-green-400 font-medium">
													Secure
												</span>
											</div>
										</div>
									</Button>
								</div>
							))}
						</div>

						{/* Footer */}
						<div className="mt-8 text-center">
							<p className="text-xs text-gray-500">
								Your wallet connection is encrypted and secure
							</p>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
