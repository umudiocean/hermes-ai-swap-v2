// Ethereum Provider Types
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      isCoinbaseWallet?: boolean;
      isTrust?: boolean;
      isPhantom?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, handler: (...args: any[]) => void) => void;
      removeListener: (eventName: string, handler: (...args: any[]) => void) => void;
      removeAllListeners: (eventName: string) => void;
      selectedAddress?: string;
      networkVersion?: string;
      chainId?: string;
      autoRefreshOnNetworkChange?: boolean;
      isConnected?: () => boolean;
      enable?: () => Promise<string[]>;
      send?: (method: string, params?: any[]) => Promise<any>;
      sendAsync?: (request: any, callback: (error: any, response: any) => void) => void;
    };
  }
}

export {}; 