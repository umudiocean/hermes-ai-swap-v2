import React, { useState } from 'react';
import { ChevronDown, AlertTriangle, Check } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

interface Network {
  chainId: string;
  name: string;
  symbol: string;
  icon: string;
  rpcUrl: string;
  blockExplorer: string;
  isTestnet?: boolean;
}

const SUPPORTED_NETWORKS: Network[] = [
  {
    chainId: '0x38',
    name: 'BNB Smart Chain',
    symbol: 'BNB',
    icon: '🟡',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    blockExplorer: 'https://bscscan.com',
  },
  {
    chainId: '0x1',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: '🔷',
    rpcUrl: 'https://mainnet.infura.io/v3/',
    blockExplorer: 'https://etherscan.io',
  },
  {
    chainId: '0x89',
    name: 'Polygon',
    symbol: 'MATIC',
    icon: '🟣',
    rpcUrl: 'https://polygon-rpc.com/',
    blockExplorer: 'https://polygonscan.com',
  },
  {
    chainId: '0x61',
    name: 'BSC Testnet',
    symbol: 'tBNB',
    icon: '🟡',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    blockExplorer: 'https://testnet.bscscan.com',
    isTestnet: true,
  },
];

const NetworkSwitcher: React.FC = () => {
  const { chainId, switchNetwork, isConnected } = useWallet();
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [switching, setSwitching] = useState<string | null>(null);

  const currentNetwork = SUPPORTED_NETWORKS.find(
    network => parseInt(network.chainId, 16) === chainId
  );

  const handleNetworkSwitch = async (network: Network) => {
    if (!isConnected) return;
    
    setSwitching(network.chainId);
    try {
      await switchNetwork(network.chainId);
      setShowNetworkModal(false);
    } catch (error) {
      console.error('Network switch failed:', error);
    } finally {
      setSwitching(null);
    }
  };

  if (!isConnected) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setShowNetworkModal(true)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-xl border transition-all duration-300 ${
          currentNetwork
            ? 'border-gray-700 bg-jupiter-light-gray hover:border-jupiter-green'
            : 'border-red-500 bg-red-500 bg-opacity-20 text-red-400'
        }`}
      >
        {currentNetwork ? (
          <>
            <span className="text-lg">{currentNetwork.icon}</span>
            <span className="text-white text-sm font-medium hidden sm:block">
              {currentNetwork.name}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </>
        ) : (
          <>
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">Wrong Network</span>
          </>
        )}
      </button>

      {/* Network Selection Modal */}
      {showNetworkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-jupiter-gray rounded-2xl p-6 w-full max-w-md mx-4 border border-gray-700">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Select Network</h3>
              <button
                onClick={() => setShowNetworkModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>

            {/* Network List */}
            <div className="space-y-2">
              {SUPPORTED_NETWORKS.map((network) => {
                const isActive = currentNetwork?.chainId === network.chainId;
                const isSwitching = switching === network.chainId;

                return (
                  <button
                    key={network.chainId}
                    onClick={() => handleNetworkSwitch(network)}
                    disabled={isActive || isSwitching}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? 'border-jupiter-green bg-jupiter-green bg-opacity-20'
                        : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800'
                    } ${isSwitching ? 'opacity-50' : ''}`}
                  >
                    <span className="text-xl">{network.icon}</span>
                    <div className="flex-1 text-left">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{network.name}</span>
                        {network.isTestnet && (
                          <span className="text-xs bg-yellow-500 bg-opacity-20 text-yellow-400 px-2 py-1 rounded">
                            Testnet
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-400">{network.symbol}</div>
                    </div>
                    {isActive && <Check className="w-5 h-5 text-jupiter-green" />}
                    {isSwitching && (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-jupiter-green"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-6 p-3 bg-yellow-500 bg-opacity-20 rounded-lg border border-yellow-500 border-opacity-30">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
                <div>
                  <p className="text-yellow-400 text-sm font-medium">Network Fee Required</p>
                  <p className="text-yellow-300 text-xs mt-1">
                    Switching networks may require a small transaction fee.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NetworkSwitcher;