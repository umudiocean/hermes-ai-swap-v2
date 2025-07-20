import React, { useState } from 'react';
import { X, Copy, ExternalLink, LogOut, ChevronDown, Wallet, AlertCircle, Check } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

interface WalletConnectProps {
  className?: string;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ className = "" }) => {
  const {
    account,
    isConnected,
    balance,
    chainId,
    networkName,
    isLoading,
    error,
    connectMetaMask,
    connectTrustWallet,
    connectCoinbaseWallet,
    connectWalletConnect,
    disconnectWallet,
    switchNetwork
  } = useWallet();

  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Wallet options with real logos
  const walletOptions = [
    {
      id: 'metamask',
      name: 'MetaMask',
      description: 'Connect to your MetaMask Wallet',
      logo: (
        <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 8.25L13.5 1.5L11.25 6L16.5 9.75L22.56 8.25Z" fill="white"/>
            <path d="M1.44 8.25L10.5 1.5L12.75 6L7.5 9.75L1.44 8.25Z" fill="white"/>
            <path d="M19.5 15L16.5 9.75L11.25 12L7.5 9.75L4.5 15L12 22.5L19.5 15Z" fill="white"/>
          </svg>
        </div>
      ),
      onClick: connectMetaMask,
      installed: typeof window !== 'undefined' && window.ethereum?.isMetaMask,
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      description: 'Scan with WalletConnect to connect',
      logo: (
        <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5.5 9.5C8.5 6.5 15.5 6.5 18.5 9.5L19.5 8.5C15.5 4.5 8.5 4.5 4.5 8.5L5.5 9.5Z" fill="white"/>
            <path d="M7.5 11.5C9.5 9.5 14.5 9.5 16.5 11.5L17.5 10.5C14.5 7.5 9.5 7.5 6.5 10.5L7.5 11.5Z" fill="white"/>
            <path d="M9.5 13.5C10.5 12.5 13.5 12.5 14.5 13.5L15.5 12.5C13.5 10.5 10.5 10.5 8.5 12.5L9.5 13.5Z" fill="white"/>
            <circle cx="12" cy="15" r="1.5" fill="white"/>
          </svg>
        </div>
      ),
      onClick: connectWalletConnect,
      installed: true,
    },
    {
      id: 'trustwallet',
      name: 'Trust Wallet',
      description: 'Connect to your Trust Wallet',
      logo: (
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 6V11C4 16.55 7.84 21.74 12 22C16.16 21.74 20 16.55 20 11V6L12 2Z" fill="white"/>
            <path d="M10 12L8.5 10.5L7 12L10 15L17 8L15.5 6.5L10 12Z" fill="#1E40AF"/>
          </svg>
        </div>
      ),
      onClick: connectTrustWallet,
      installed: typeof window !== 'undefined' && window.ethereum?.isTrust,
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      description: 'Connect to your Coinbase Wallet',
      logo: (
        <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="white"/>
            <rect x="8" y="8" width="8" height="8" rx="2" fill="#1E40AF"/>
          </svg>
        </div>
      ),
      onClick: connectCoinbaseWallet,
      installed: typeof window !== 'undefined' && window.ethereum?.isCoinbaseWallet,
    },
  ];

  const handleWalletConnect = async (walletOption: typeof walletOptions[0]) => {
    try {
      console.log('Connecting to wallet:', walletOption.name);
      await walletOption.onClick();
      setShowWalletModal(false);
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  const copyAddress = async () => {
    if (account) {
      try {
        await navigator.clipboard.writeText(account);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy address:', error);
      }
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const openExplorer = () => {
    if (account) {
      const explorerUrl = chainId === 56 
        ? `https://bscscan.com/address/${account}`
        : `https://etherscan.io/address/${account}`;
      window.open(explorerUrl, '_blank');
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setShowAccountModal(false);
  };

  const handleNetworkSwitch = async () => {
    try {
      await switchNetwork('0x38'); // Switch to BSC
    } catch (error) {
      console.error('Network switch failed:', error);
    }
  };

  // Connected State - Account Button
  if (isConnected && account) {
    return (
      <>
        <button
          onClick={() => setShowAccountModal(true)}
          className={`bg-jupiter-green text-black px-4 py-2 rounded-xl font-medium hover:bg-opacity-90 transition-all duration-300 flex items-center space-x-2 relative group ${className}`}
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="font-mono text-sm">{formatAddress(account)}</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* Account Modal */}
        {showAccountModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowAccountModal(false)}>
            <div className="bg-jupiter-gray rounded-2xl p-6 w-full max-w-sm mx-4 border border-gray-700" onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Account</h3>
                <button
                  onClick={() => setShowAccountModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Connection Status */}
              <div className="flex items-center space-x-2 mb-4 p-3 bg-green-500 bg-opacity-20 rounded-lg border border-green-500 border-opacity-30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Connected to {networkName}</span>
              </div>

              {/* Account Info */}
              <div className="space-y-4">
                {/* Address */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Wallet Address</label>
                  <div className="flex items-center justify-between bg-jupiter-light-gray rounded-lg p-3">
                    <span className="text-white font-mono text-sm">{formatAddress(account)}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={copyAddress}
                        className="text-gray-400 hover:text-jupiter-green transition-colors"
                        title="Copy address"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-jupiter-green" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={openExplorer}
                        className="text-gray-400 hover:text-jupiter-green transition-colors"
                        title="View on explorer"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Balance */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Balance</label>
                  <div className="bg-jupiter-light-gray rounded-lg p-3">
                    <span className="text-white font-medium">
                      {parseFloat(balance).toFixed(4)} {chainId === 56 ? 'BNB' : 'ETH'}
                    </span>
                  </div>
                </div>

                {/* Network Warning */}
                {chainId !== 56 && (
                  <div className="flex items-center space-x-2 p-3 bg-yellow-500 bg-opacity-20 rounded-lg border border-yellow-500 border-opacity-30">
                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                    <div className="flex-1">
                      <p className="text-yellow-400 text-sm font-medium">Wrong Network</p>
                      <p className="text-yellow-300 text-xs">Please switch to Binance Smart Chain</p>
                    </div>
                    <button
                      onClick={handleNetworkSwitch}
                      className="bg-yellow-500 text-black px-3 py-1 rounded-lg text-xs font-medium hover:bg-yellow-400 transition-colors"
                    >
                      Switch
                    </button>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleDisconnect}
                  className="w-full flex items-center justify-center space-x-2 bg-red-500 bg-opacity-20 text-red-400 py-3 rounded-lg hover:bg-opacity-30 transition-colors border border-red-500 border-opacity-30"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Disconnect Wallet</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Disconnected State - Connect Button
  return (
    <>
      <button
        onClick={() => {
          console.log('Connect Wallet button clicked');
          setShowWalletModal(true);
        }}
        className={`bg-jupiter-green text-black font-bold py-3 px-4 rounded-lg hover:bg-[#62cbc1] hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 button-animate ${className}`}
      >
        <Wallet className="w-4 h-4" />
        <span>Connect Wallet</span>
      </button>

      {/* Wallet Selection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowWalletModal(false)}>
          <div className="bg-jupiter-gray rounded-2xl p-6 w-full max-w-md mx-4 border border-gray-700" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Connect a Wallet</h2>
              <button
                onClick={() => setShowWalletModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 text-sm font-medium">Connection Failed</span>
                </div>
                <p className="text-red-300 text-xs mt-1">{error}</p>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="mb-4 text-center">
                <div className="inline-flex items-center space-x-2 text-jupiter-green">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-jupiter-green"></div>
                  <span className="text-sm">Connecting...</span>
                </div>
              </div>
            )}

            {/* Wallet Options */}
            <div className="space-y-3">
              {walletOptions.map((wallet) => (
                <button
                  key={wallet.id}
                  onClick={() => handleWalletConnect(wallet)}
                  disabled={isLoading}
                  className={`w-full flex items-center space-x-4 p-4 rounded-xl border transition-all duration-300 ${
                    wallet.installed
                      ? 'border-gray-700 hover:border-jupiter-green hover:bg-jupiter-green hover:bg-opacity-10'
                      : 'border-gray-800 opacity-50 cursor-not-allowed'
                  }`}
                >
                  {wallet.logo}
                  <div className="flex-1 text-left">
                    <div className="text-white font-medium">{wallet.name}</div>
                    <div className="text-sm text-gray-400">
                      {wallet.installed ? wallet.description : 'Not installed'}
                    </div>
                  </div>
                  {!wallet.installed && (
                    <div className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                      Install
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                By connecting a wallet, you agree to our{' '}
                <span className="text-jupiter-green hover:underline cursor-pointer">
                  Terms of Service
                </span>{' '}
                and acknowledge that you have read and understand the{' '}
                <span className="text-jupiter-green hover:underline cursor-pointer">
                  Protocol Disclaimer
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletConnect;