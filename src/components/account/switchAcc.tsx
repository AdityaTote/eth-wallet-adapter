import { Connector } from "wagmi";
import { Button } from "../ui/button";

interface SwitchAccountProps {
	handleSwitchAccount: (connector: Connector) => void;
	switchConnector: Connector[];
	isPending: boolean;
}

export function SwitchAccount({
	handleSwitchAccount,
	switchConnector,
	isPending,
}: SwitchAccountProps) {
	return (
		<div id="switch-account-section" className="hidden">
			{switchConnector && switchConnector.length > 0 && (
				<div className="space-y-2">
					<label className="text-sm font-medium text-muted-foreground">
						Switch Account
					</label>
					<div className="space-y-2">
						{switchConnector.map((connectorItem) => (
							<Button
								key={connectorItem.id}
								onClick={() =>
									handleSwitchAccount(connectorItem)
								}
								disabled={isPending}
								variant="outline"
								className="w-full justify-start"
							>
								<div className="flex items-center gap-3">
									{connectorItem.icon && (
										<img
											src={connectorItem.icon}
											alt={connectorItem.name}
											className="w-5 h-5 rounded"
										/>
									)}
									<span className="text-sm">
										{connectorItem.name}
									</span>
									{isPending && (
										<div className="ml-auto">
											<div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
										</div>
									)}
								</div>
							</Button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
