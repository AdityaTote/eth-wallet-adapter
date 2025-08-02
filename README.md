# Ethereum Wallet Adapter

A modern, secure, and user-friendly Ethereum wallet connection interface built with Next.js, Wagmi, and Viem. This project provides a seamless way for users to connect their Ethereum wallets and manage multiple accounts.

## 🚀 Features

-   **Multi-Wallet Support**: Connect with various Ethereum wallets (MetaMask, WalletConnect, etc.)
-   **Account Management**: Switch between multiple accounts seamlessly
-   **Real-time Updates**: Live connection status and account information

## 🛠️ Tech Stack

-   **Wallet Integration**: Wagmi v2 + Viem
-   **State Management**: TanStack Query
-   **Styling**: Tailwind CSS with custom gradients
-   **Type Safety**: TypeScript + Zod validation

## 📦 Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd eth-wallet-adpt
    ```

2. **Install dependencies**

    ```bash
    bun install
    ```

3. **Start the development server**

    ```bash
    bun dev
    ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Connecting a Wallet

1. Open the application in your browser
2. Click on your preferred wallet option (MetaMask, WalletConnect, etc.)
3. Approve the connection in your wallet
4. Your wallet is now connected and ready to use!

### Managing Multiple Accounts

-   **Switch Accounts**: Use the "Switch Account" feature to change between different wallet accounts
-   **Connect New Account**: Add additional wallet connections while keeping existing ones
-   **Disconnect**: Safely disconnect your wallet when done

## 🔧 Configuration

### Supported Networks

The application currently supports:

-   **Ethereum Mainnet**
-   **Sepolia Testnet**

To add more networks, modify the `src/lib/wagmiConf.ts` file:

```typescript
import { mainnet, sepolia, polygon } from "wagmi/chains";

export const config = createConfig({
	chains: [mainnet, sepolia, polygon],
	transports: {
		[mainnet.id]: http(),
		[sepolia.id]: http(),
		[polygon.id]: http(),
	},
});
```

### Environment Variables

Create a `.env.local` file in the root directory for any environment-specific configurations:

```env
NEXT_PUBLIC_APP_NAME=Ethereum Wallet Adapter
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # React components
│   ├── account/           # Account management components
│   ├── providers/         # Context providers
│   ├── toast/             # Notification components
│   ├── ui/                # Reusable UI components
│   ├── connectWalllet.tsx # Wallet connection interface
│   └── wallet.tsx         # Main wallet component
├── icons/                 # Custom icons
├── lib/                   # Utilities and configurations
│   ├── schema.ts          # Zod schemas
│   ├── utils.ts           # Utility functions
│   └── wagmiConf.ts       # Wagmi configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

-   [Wagmi](https://wagmi.sh/) for excellent wallet integration
-   [Viem](https://viem.sh/) for Ethereum interaction
-   [Radix UI](https://www.radix-ui.com/) for accessible components
-   [Tailwind CSS](https://tailwindcss.com/) for styling
-   [Lucide](https://lucide.dev/) for beautiful icons

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/eth-wallet-adpt/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

**Happy coding! 🚀**
