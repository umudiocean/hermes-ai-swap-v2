# 🚀 Hermes AI Swap v2

Universal Multi-Wallet DeFi Exchange Platform with PancakeSwap Integration

## 🌟 Features

- **Multi-Wallet Support**: MetaMask, Trust Wallet, Coinbase Wallet, WalletConnect
- **PancakeSwap Integration**: Real-time token prices and swaps
- **Modern UI/UX**: Beautiful, responsive design with dark theme
- **BSC Network**: Optimized for Binance Smart Chain
- **Real-time Data**: Live token prices and wallet balances
- **Error Handling**: Robust error handling and retry mechanisms

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Wallet Integration**: Ethers.js v6
- **Icons**: Lucide React
- **Build Tool**: Create React App

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/umudiocean/hermes-ai-swap-v2.git
cd hermes-ai-swap-v2
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

4. **Build for production**
```bash
npm run build
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_PANCAKESWAP_API_URL=https://api.pancakeswap.info/api/v2
REACT_APP_BSC_RPC_URL=https://bsc-dataseed.binance.org
```

### Wallet Configuration
The app supports multiple wallet providers:
- MetaMask (injected)
- Trust Wallet (injected)
- Coinbase Wallet (injected)
- WalletConnect (QR code)

## 🎯 Usage

1. **Connect Wallet**: Click the "Connect Wallet" button to connect your preferred wallet
2. **Select Tokens**: Choose tokens to swap using the token selector
3. **Enter Amount**: Input the amount you want to swap
4. **Review & Swap**: Review the transaction details and confirm the swap

## 📁 Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── lib/                # External library integrations
├── services/           # API services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── App.tsx            # Main application component
└── index.tsx          # Application entry point
```

## 🔗 API Integration

### PancakeSwap API
- **Token List**: Fetches available tokens from PancakeSwap
- **Price Data**: Real-time token prices
- **Fallback Tokens**: Predefined token list for reliability

### Supported Networks
- **BSC Mainnet**: Primary network
- **BSC Testnet**: For testing

## 🎨 UI Components

- **Token Selector**: Modal for selecting tokens
- **Wallet Connect**: Multi-wallet connection interface
- **Price Display**: Real-time price updates
- **Balance Display**: Wallet token balances
- **Transaction Status**: Loading and error states

## 🚀 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload build/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [PancakeSwap](https://pancakeswap.finance/) for API integration
- [Ethers.js](https://docs.ethers.io/) for blockchain interaction
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons

## 📞 Support

For support, email support@hermesaiswap.com or create an issue in this repository.

---

**Made with ❤️ by the Hermes AI Swap Team** 