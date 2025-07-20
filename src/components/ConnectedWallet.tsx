import React, { useState } from 'react';
import { Copy, LogOut, Check, ExternalLink } from 'lucide-react';

interface ConnectedWalletProps {
  account: string;
  balance: string;
  networkName: string;
  onDisconnect: () => void;
}

const ConnectedWallet: React.FC<ConnectedWalletProps> = ({
  account,
  balance,
  networkName,
  onDisconnect,
}) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy address:', error);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const openExplorer = () => {
    const explorerUrl = `https://bscscan.com/address/${account}`;
    window.open(explorerUrl, '_blank');
  };

  return (
    <div className="bg-jupiter-gray rounded-xl p-4 border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-jupiter-green rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400">Connected</span>
        </div>
        <button
          onClick={onDisconnect}
          className="text-gray-400 hover:text-red-400 transition-colors"
          title="Disconnect"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Account Info */}
      <div className="space-y-3">
        {/* Address */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Address</span>
          <div className="flex items-center space-x-2">
            <span className="text-white font-mono text-sm">
              {formatAddress(account)}
            </span>
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

        {/* Balance */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Balance</span>
          <span className="text-white font-medium">
            {parseFloat(balance).toFixed(4)} BNB
          </span>
        </div>

        {/* Network */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Network</span>
          <span className="text-jupiter-green text-sm font-medium">
            {networkName}
          </span>
        </div>
      </div>

      {/* Success Message */}
      {copied && (
        <div className="mt-3 p-2 bg-jupiter-green bg-opacity-20 border border-jupiter-green rounded-lg">
          <div className="flex items-center space-x-2 text-jupiter-green text-sm">
            <Check className="w-4 h-4" />
            <span>Address copied to clipboard!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectedWallet; 