import { Connector } from "wagmi";
import { Button } from "../ui/button";

interface NewAccountBoxProps {
	handleNewAccountConnection: (connector: Connector) => void;
	connectors: Connector[];
	isPending: boolean;
}

export function NewAccountBox({
	handleNewAccountConnection,
	connectors,
	isPending,
}: NewAccountBoxProps) {
	return (
		<div className="bg-card border border-border rounded-lg p-6 shadow-lg">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-lg font-semibold text-card-foreground">
					Connect New Account
				</h2>
			</div>
			<div className="space-y-2">
				{connectors.map((connectorItem) => (
					<Button
						key={connectorItem.id}
						onClick={() =>
							handleNewAccountConnection(connectorItem)
						}
						disabled={isPending}
						variant="outline"
						className="w-full justify-start"
					>
						{connectorItem.name}
					</Button>
				))}
			</div>
		</div>
	);
}
