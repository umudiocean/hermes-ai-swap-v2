import { useState, useEffect, useCallback } from 'react';
import { walletService } from '../services/walletService';

export interface WalletState {
  account: string | null;
  isConnected: boolean;
  balance: string;
  chainId: number | null;
  networkName: string;
  isLoading: boolean;
  error: string | null;
}

export const useWallet = () => {
  const [state, setState] = useState<WalletState>({
    account: null,
    isConnected: false,
    balance: '0',
    chainId: null,
    networkName: '',
    isLoading: false,
    error: null,
  });

  // Connect MetaMask
  const connectMetaMask = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const walletInfo = await walletService.connectMetaMask();
      setState(prev => ({
        ...prev,
        account: walletInfo.address,
        isConnected: true,
        balance: walletInfo.balance,
        chainId: walletInfo.chainId,
        networkName: walletInfo.networkName,
        isLoading: false,
      }));
    } catch (error: any) {
      console.error('MetaMask connection error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Failed to connect MetaMask. Please make sure MetaMask is installed and unlocked.',
      }));
    }
  }, []);

  // Connect Trust Wallet
  const connectTrustWallet = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const walletInfo = await walletService.connectTrustWallet();
      setState(prev => ({
        ...prev,
        account: walletInfo.address,
        isConnected: true,
        balance: walletInfo.balance,
        chainId: walletInfo.chainId,
        networkName: walletInfo.networkName,
        isLoading: false,
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Failed to connect Trust Wallet',
      }));
    }
  }, []);

  // Connect Coinbase Wallet
  const connectCoinbaseWallet = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const walletInfo = await walletService.connectCoinbaseWallet();
      setState(prev => ({
        ...prev,
        account: walletInfo.address,
        isConnected: true,
        balance: walletInfo.balance,
        chainId: walletInfo.chainId,
        networkName: walletInfo.networkName,
        isLoading: false,
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Failed to connect Coinbase Wallet',
      }));
    }
  }, []);

  // Connect WalletConnect
  const connectWalletConnect = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const walletInfo = await walletService.connectWalletConnect();
      setState(prev => ({
        ...prev,
        account: walletInfo.address,
        isConnected: true,
        balance: walletInfo.balance,
        chainId: walletInfo.chainId,
        networkName: walletInfo.networkName,
        isLoading: false,
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Failed to connect WalletConnect',
      }));
    }
  }, []);

  // Disconnect wallet
  const disconnectWallet = useCallback(() => {
    walletService.disconnect();
    setState({
      account: null,
      isConnected: false,
      balance: '0',
      chainId: null,
      networkName: '',
      isLoading: false,
      error: null,
    });
  }, []);

  // Switch network
  const switchNetwork = useCallback(async (chainId: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await walletService.switchNetwork(chainId);
      // Refresh wallet info after network switch
      const provider = walletService.getProvider();
      if (provider && state.account) {
        const balance = await walletService.getBalance(state.account);
        const network = await provider.getNetwork();
        setState(prev => ({
          ...prev,
          balance,
          chainId: Number(network.chainId),
          networkName: network.name,
          isLoading: false,
        }));
      }
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Failed to switch network',
      }));
    }
  }, [state.account]);

  // Refresh balance
  const refreshBalance = useCallback(async () => {
    if (state.account && state.isConnected) {
      try {
        const balance = await walletService.getBalance(state.account);
        setState(prev => ({ ...prev, balance }));
      } catch (error) {
        console.error('Failed to refresh balance:', error);
      }
    }
  }, [state.account, state.isConnected]);

  // Auto-reconnection on page load
  useEffect(() => {
    const checkExistingConnection = async () => {
      if (typeof window !== 'undefined' && window.ethereum && !state.isConnected) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            // Auto-reconnect if wallet is already connected
            await connectMetaMask();
          }
        } catch (error) {
          console.error('Auto-reconnection failed:', error);
        }
      }
    };

    checkExistingConnection();
  }, [connectMetaMask, state.isConnected]);

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected
          disconnectWallet();
        } else if (state.account !== accounts[0]) {
          // Account changed
          setState(prev => ({ ...prev, account: accounts[0] }));
          refreshBalance();
        }
      };

      const handleChainChanged = () => {
        // Refresh page when chain changes
        window.location.reload();
      };

      window.ethereum?.on('accountsChanged', handleAccountsChanged);
      window.ethereum?.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum?.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [state.account, disconnectWallet, refreshBalance]);

  return {
    ...state,
    connectMetaMask,
    connectTrustWallet,
    connectCoinbaseWallet,
    connectWalletConnect,
    disconnectWallet,
    switchNetwork,
    refreshBalance,
  };
}; 