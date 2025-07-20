import React from 'react';
import { X, Wallet, Smartphone, Shield } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectMetaMask: () => void;
  onConnectWalletConnect: () => void;
  onConnectTrustWallet: () => void;
  onConnectCoinbaseWallet: () => void;
  isLoading: boolean;
}

const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  onConnectMetaMask,
  onConnectWalletConnect,
  onConnectTrustWallet,
  onConnectCoinbaseWallet,
  isLoading,
}) => {
  if (!isOpen) return null;

  const walletOptions = [
    {
      id: 'metamask',
      name: 'MetaMask',
      description: 'Connect with MetaMask',
      icon: <Wallet className="w-6 h-6" />,
      onClick: onConnectMetaMask,
      color: 'bg-orange-500 hover:bg-orange-600',
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      description: 'Connect with WalletConnect',
      icon: <Smartphone className="w-6 h-6" />,
      onClick: onConnectWalletConnect,
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      id: 'trustwallet',
      name: 'Trust Wallet',
      description: 'Connect with Trust Wallet',
      icon: <Shield className="w-6 h-6" />,
      onClick: onConnectTrustWallet,
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      description: 'Connect with Coinbase Wallet',
      icon: <Wallet className="w-6 h-6" />,
      onClick: onConnectCoinbaseWallet,
      color: 'bg-purple-500 hover:bg-purple-600',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-jupiter-gray rounded-2xl p-6 w-full max-w-md mx-4 border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Connect Wallet</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Wallet Options */}
        <div className="space-y-3">
          {walletOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                option.onClick();
                onClose();
              }}
              disabled={isLoading}
              className={`w-full flex items-center space-x-4 p-4 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className={`p-3 rounded-lg ${option.color} text-white`}>
                {option.icon}
              </div>
              <div className="flex-1 text-left">
                <div className="text-white font-medium">{option.name}</div>
                <div className="text-sm text-gray-400">{option.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center space-x-2 text-jupiter-green">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-jupiter-green"></div>
              <span>Connecting...</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            By connecting a wallet, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletModal; 