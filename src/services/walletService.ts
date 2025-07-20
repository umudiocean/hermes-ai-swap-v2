import { ethers } from 'ethers';

// BSC Network Configuration
export const BSC_MAINNET = {
  chainId: '0x38',
  chainName: 'Binance Smart Chain',
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18
  },
  blockExplorerUrls: ['https://bscscan.com/']
};

export const BSC_TESTNET = {
  chainId: '0x61',
  chainName: 'BSC Testnet',
  rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
  nativeCurrency: {
    name: 'tBNB',
    symbol: 'tBNB',
    decimals: 18
  },
  blockExplorerUrls: ['https://testnet.bscscan.com/']
};

export interface WalletInfo {
  address: string;
  balance: string;
  chainId: number;
  networkName: string;
}

export class WalletService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;

  // MetaMask Connection
  async connectMetaMask(): Promise<WalletInfo> {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      
      const address = await this.signer.getAddress();
      const balance = await this.provider.getBalance(address);
      const network = await this.provider.getNetwork();
      
      // Get network name based on chainId
      const networkName = this.getNetworkName(Number(network.chainId));
      
      return {
        address,
        balance: ethers.formatEther(balance),
        chainId: Number(network.chainId),
        networkName: networkName
      };
    } catch (error) {
      console.error('MetaMask connection failed:', error);
      throw error;
    }
  }

  // WalletConnect Connection
  async connectWalletConnect(): Promise<WalletInfo> {
    try {
      if (!window.ethereum) {
        throw new Error('No wallet provider found');
      }

      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      
      const address = await this.signer.getAddress();
      const balance = await this.provider.getBalance(address);
      const network = await this.provider.getNetwork();
      
      // Get network name based on chainId
      const networkName = this.getNetworkName(Number(network.chainId));
      
      return {
        address,
        balance: ethers.formatEther(balance),
        chainId: Number(network.chainId),
        networkName: networkName
      };
    } catch (error) {
      console.error('WalletConnect connection failed:', error);
      throw error;
    }
  }

  // Trust Wallet Connection
  async connectTrustWallet(): Promise<WalletInfo> {
    try {
      if (!window.ethereum) {
        throw new Error('Trust Wallet is not installed');
      }

      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      
      const address = await this.signer.getAddress();
      const balance = await this.provider.getBalance(address);
      const network = await this.provider.getNetwork();
      
      // Get network name based on chainId
      const networkName = this.getNetworkName(Number(network.chainId));
      
      return {
        address,
        balance: ethers.formatEther(balance),
        chainId: Number(network.chainId),
        networkName: networkName
      };
    } catch (error) {
      console.error('Trust Wallet connection failed:', error);
      throw error;
    }
  }

  // Coinbase Wallet Connection
  async connectCoinbaseWallet(): Promise<WalletInfo> {
    try {
      if (!window.ethereum) {
        throw new Error('Coinbase Wallet is not installed');
      }

      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      
      const address = await this.signer.getAddress();
      const balance = await this.provider.getBalance(address);
      const network = await this.provider.getNetwork();
      
      // Get network name based on chainId
      const networkName = this.getNetworkName(Number(network.chainId));
      
      return {
        address,
        balance: ethers.formatEther(balance),
        chainId: Number(network.chainId),
        networkName: networkName
      };
    } catch (error) {
      console.error('Coinbase Wallet connection failed:', error);
      throw error;
    }
  }

  // Switch Network
  async switchNetwork(chainId: string): Promise<void> {
    try {
      if (!window.ethereum) {
        throw new Error('No wallet provider found');
      }

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        // Chain not added, add it
        await this.addNetwork(chainId);
      } else {
        throw error;
      }
    }
  }

  // Add Network
  async addNetwork(chainId: string): Promise<void> {
    try {
      if (!window.ethereum) {
        throw new Error('No wallet provider found');
      }

      const networkConfig = chainId === '0x38' ? BSC_MAINNET : BSC_TESTNET;
      
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [networkConfig],
      });
    } catch (error) {
      console.error('Failed to add network:', error);
      throw error;
    }
  }

  // Get Balance
  async getBalance(address: string): Promise<string> {
    try {
      if (!this.provider) {
        throw new Error('No provider connected');
      }

      const balance = await this.provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Failed to get balance:', error);
      throw error;
    }
  }

  // Disconnect
  disconnect(): void {
    this.provider = null;
    this.signer = null;
  }

  // Get Provider
  getProvider(): ethers.BrowserProvider | null {
    return this.provider;
  }

  // Get Signer
  getSigner(): ethers.JsonRpcSigner | null {
    return this.signer;
  }

  // Get Network Name
  private getNetworkName(chainId: number): string {
    switch (chainId) {
      case 1:
        return 'Ethereum Mainnet';
      case 56:
        return 'Binance Smart Chain';
      case 97:
        return 'BSC Testnet';
      case 137:
        return 'Polygon';
      case 42161:
        return 'Arbitrum One';
      case 10:
        return 'Optimism';
      default:
        return `Chain ID ${chainId}`;
    }
  }
}

export const walletService = new WalletService(); 