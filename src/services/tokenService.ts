// Token service for fetching real data
export interface TokenData {
  symbol: string;
  name: string;
  address: string;
  icon: string;
  price: string;
  change: string;
  changeColor: string;
  chartColor: string;
  decimals: number;
  chainId: number;
}

export interface TokenBalance {
  token: TokenData;
  balance: string;
  usdValue: string;
}

// Real token data
export const SUPPORTED_TOKENS: TokenData[] = [
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8',
    icon: '💵',
    price: '$1.00',
    change: '0%',
    changeColor: 'text-gray-500',
    chartColor: 'bg-blue-500',
    decimals: 6,
    chainId: 1
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0x0000000000000000000000000000000000000000',
    icon: '🔷',
    price: '$2,450.67',
    change: '+2.34%',
    changeColor: 'text-green-500',
    chartColor: 'bg-blue-600',
    decimals: 18,
    chainId: 1
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    icon: '💎',
    price: '$1.00',
    change: '0%',
    changeColor: 'text-gray-500',
    chartColor: 'bg-green-500',
    decimals: 6,
    chainId: 1
  },
  {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    icon: '₿',
    price: '$43,250.89',
    change: '+1.23%',
    changeColor: 'text-green-500',
    chartColor: 'bg-orange-500',
    decimals: 8,
    chainId: 1
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    icon: '🟡',
    price: '$1.00',
    change: '0%',
    changeColor: 'text-gray-500',
    chartColor: 'bg-yellow-500',
    decimals: 18,
    chainId: 1
  },
  {
    symbol: 'UNI',
    name: 'Uniswap',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    icon: '🦄',
    price: '$7.89',
    change: '-0.45%',
    changeColor: 'text-red-500',
    chartColor: 'bg-pink-500',
    decimals: 18,
    chainId: 1
  }
];

// Mock API for token prices (in real app, this would be CoinGecko, CoinMarketCap, etc.)
export const fetchTokenPrices = async (): Promise<Record<string, number>> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    'USDC': 1.00,
    'ETH': 2450.67,
    'USDT': 1.00,
    'WBTC': 43250.89,
    'DAI': 1.00,
    'UNI': 7.89
  };
};

// Mock API for token balances
export const fetchTokenBalances = async (address: string): Promise<TokenBalance[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock balances - in real app, this would query blockchain
  return [
    {
      token: SUPPORTED_TOKENS[0], // USDC
      balance: '1250.50',
      usdValue: '$1,250.50'
    },
    {
      token: SUPPORTED_TOKENS[1], // ETH
      balance: '2.5',
      usdValue: '$6,126.68'
    },
    {
      token: SUPPORTED_TOKENS[2], // USDT
      balance: '500.00',
      usdValue: '$500.00'
    }
  ];
};

// Get token by symbol
export const getTokenBySymbol = (symbol: string): TokenData | undefined => {
  return SUPPORTED_TOKENS.find(token => token.symbol === symbol);
};

// Get token by address
export const getTokenByAddress = (address: string): TokenData | undefined => {
  return SUPPORTED_TOKENS.find(token => token.address.toLowerCase() === address.toLowerCase());
};

// Format token amount
export const formatTokenAmount = (amount: string, decimals: number): string => {
  const num = parseFloat(amount) / Math.pow(10, decimals);
  return num.toFixed(6);
};

// Format USD value
export const formatUSDValue = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}; 