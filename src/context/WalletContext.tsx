import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WalletContextType {
  account: string | null;
  isConnected: boolean;
  balance: string;
  chainId: number | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (chainId: number) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState('0');
  const [chainId, setChainId] = useState<number | null>(null);

  const connectWallet = async () => {
    try {
      // Wallet connection logic will be implemented here
      console.log('Connecting wallet...');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsConnected(false);
    setBalance('0');
    setChainId(null);
  };

  const switchNetwork = async (newChainId: number) => {
    try {
      // Network switching logic will be implemented here
      console.log('Switching to network:', newChainId);
      setChainId(newChainId);
    } catch (error) {
      console.error('Failed to switch network:', error);
    }
  };

  useEffect(() => {
    // Check for existing wallet connection on page load
    const checkExistingConnection = async () => {
      // Auto-reconnection logic will be implemented here
    };

    checkExistingConnection();
  }, []);

  const value: WalletContextType = {
    account,
    isConnected,
    balance,
    chainId,
    connectWallet,
    disconnectWallet,
    switchNetwork,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}; 