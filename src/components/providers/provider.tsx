import { ReactNode } from "react";
import TanstackProvider from "./tanstackProvider";
import WagmiProviderWrapper from "./wagmiProvider";
import { ToastContainer } from "react-toastify";

export default function Provider({ children }: { children: ReactNode }) {
	return (
		<WagmiProviderWrapper>
			<TanstackProvider>{children}</TanstackProvider>
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick
				theme="dark"
				className="text-xs font-medium"
			/>
		</WagmiProviderWrapper>
	);
}
