import { logger } from '../utils/logger';

// PancakeSwap Token Service
export interface PancakeSwapToken {
  symbol: string;
  name: string;
  address: string;
  chainId: number;
  decimals: number;
  logoURI: string;
  tags: string[];
}

export interface TokenPrice {
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
}

// Updated token sources with better reliability
const PANCAKESWAP_TOKEN_SOURCES = [
  'https://tokens.pancakeswap.finance/pancakeswap-extended.json',
  'https://tokens.pancakeswap.finance/pancakeswap-top-100.json',
  'https://raw.githubusercontent.com/pancakeswap/token-list/main/lists/pancakeswap-extended.json'
];

// Updated API endpoints with better reliability
const PRICE_API_ENDPOINTS = [
  'https://api.pancakeswap.info/api/v2',
  'https://api.pancakeswap.finance/api/v2',
  'https://api.pancakeswap.com/api/v2'
];

// BSC RPC Endpoints for failover
const BSC_RPC_ENDPOINTS = [
  "https://bsc-dataseed.binance.org",
  "https://bsc-dataseed1.binance.org",
  "https://bsc-dataseed1.defibit.io",
  "https://bsc-dataseed1.ninicoin.io",
];

export class PancakeSwapService {
  private tokens: PancakeSwapToken[] = [];
  private prices: Record<string, TokenPrice> = {};
  private currentRpcIndex = 0;
  private currentApiIndex = 0;

  constructor() {
    logger.token("🔄 Loading comprehensive PancakeSwap token list...");
  }

  // Get optimal BSC RPC endpoint
  private getOptimalRpcEndpoint(): string {
    const endpoint = BSC_RPC_ENDPOINTS[this.currentRpcIndex];
    return endpoint;
  }

  // Switch to next RPC endpoint on failure
  private switchRpcEndpoint(): void {
    this.currentRpcIndex = (this.currentRpcIndex + 1) % BSC_RPC_ENDPOINTS.length;
    logger.info(`Switched to BSC RPC: ${BSC_RPC_ENDPOINTS[this.currentRpcIndex]}`);
  }

  // Switch to next API endpoint on failure
  private switchApiEndpoint(): void {
    this.currentApiIndex = (this.currentApiIndex + 1) % PRICE_API_ENDPOINTS.length;
    logger.info(`Switched to API endpoint: ${PRICE_API_ENDPOINTS[this.currentApiIndex]}`);
  }

  // Fetch token list from PancakeSwap with improved error handling
  async fetchTokenList(): Promise<PancakeSwapToken[]> {
    try {
      const allTokens: PancakeSwapToken[] = [];
      
      for (const source of PANCAKESWAP_TOKEN_SOURCES) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

          const response = await fetch(source, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'Hermes-AI-Swap/1.0'
            },
            signal: controller.signal
          });

          clearTimeout(timeoutId);

          if (!response.ok) {
            logger.info(`Token source ${source} returned ${response.status}`);
            continue;
          }

          const data = await response.json();
          
          // Filter valid BSC tokens
          const validTokens = data.tokens?.filter((token: any) => 
            token.chainId === 56 && 
            token.address && 
            token.symbol && 
            token.name
          ) || [];
          
          allTokens.push(...validTokens);
          logger.token(`Loaded ${validTokens.length} tokens from ${source}`);
        } catch (sourceError) {
          logger.warn(`Failed to fetch from ${source}:`, sourceError?.toString() || '');
          continue;
        }
      }

      // If no tokens loaded from APIs, use fallback
      if (allTokens.length === 0) {
        logger.info('No tokens loaded from APIs, using fallback tokens');
        return this.getFallbackTokens();
      }

      // Remove duplicates and sort by priority
      const uniqueTokens = this.removeDuplicateTokens(allTokens);
      const sortedTokens = this.sortTokensByPriority(uniqueTokens);
      
      this.tokens = sortedTokens;
      logger.success(`✅ Loaded ${this.tokens.length} unique PancakeSwap tokens`);
      
      return this.tokens;
    } catch (error) {
      logger.error('Failed to fetch PancakeSwap tokens:', error?.toString());
      return this.getFallbackTokens();
    }
  }

  // Get fallback tokens if API fails
  private getFallbackTokens(): PancakeSwapToken[] {
    const fallbackTokens: PancakeSwapToken[] = [
      {
        symbol: 'BNB',
        name: 'BNB',
        address: '0xbb4CdB9CBd36B01bD1cBaEF2aBc5c1b3e4d5e5e5',
        chainId: 56,
        decimals: 18,
        logoURI: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
        tags: ['native']
      },
      {
        symbol: 'HERMES',
        name: 'Hermes Token',
        address: '0x1234567890123456789012345678901234567890',
        chainId: 56,
        decimals: 18,
        logoURI: 'https://i.ibb.co/hXr6j8h/10xlogo.jpg',
        tags: ['defi']
      },
      {
        symbol: 'USDT',
        name: 'Tether USD',
        address: '0x55d398326f99059fF775485246999027B3197955',
        chainId: 56,
        decimals: 18,
        logoURI: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
        tags: ['stablecoin']
      },
      {
        symbol: 'CAKE',
        name: 'PancakeSwap Token',
        address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
        chainId: 56,
        decimals: 18,
        logoURI: 'https://cryptologos.cc/logos/pancakeswap-cake-logo.png',
        tags: ['defi']
      },
      {
        symbol: 'BUSD',
        name: 'BUSD Token',
        address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd08D15a',
        chainId: 56,
        decimals: 18,
        logoURI: 'https://cryptologos.cc/logos/busd-busd-logo.png',
        tags: ['stablecoin']
      },
      {
        symbol: 'USDC',
        name: 'USD Coin',
        address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        chainId: 56,
        decimals: 18,
        logoURI: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
        tags: ['stablecoin']
      }
    ];
    
    logger.info('Using fallback tokens due to API failure');
    return fallbackTokens;
  }

  // Remove duplicate tokens
  private removeDuplicateTokens(tokens: PancakeSwapToken[]): PancakeSwapToken[] {
    const seen = new Set();
    return tokens.filter(token => {
      const key = token.address.toLowerCase();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  // Sort tokens by priority (HERMES, BNB, CAKE, USDT first)
  private sortTokensByPriority(tokens: PancakeSwapToken[]): PancakeSwapToken[] {
    const priorityOrder = ['HERMES', 'BNB', 'CAKE', 'USDT', 'BUSD', 'USDC'];
    
    return tokens.sort((a, b) => {
      const aPriority = priorityOrder.indexOf(a.symbol);
      const bPriority = priorityOrder.indexOf(b.symbol);
      
      if (aPriority !== -1 && bPriority !== -1) {
        return aPriority - bPriority;
      }
      if (aPriority !== -1) return -1;
      if (bPriority !== -1) return 1;
      
      return a.symbol.localeCompare(b.symbol);
    });
  }

  // Get token price from PancakeSwap API with improved error handling
  async getTokenPrice(tokenAddress: string): Promise<TokenPrice | null> {
    const maxRetries = 3;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const apiUrl = `${PRICE_API_ENDPOINTS[this.currentApiIndex]}/tokens/${tokenAddress}`;
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Hermes-AI-Swap/1.0'
          },
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          logger.info(`API endpoint ${apiUrl} returned ${response.status}`);
          this.switchApiEndpoint();
          continue;
        }

        const data = await response.json();
        
        if (data.data && data.data[tokenAddress]) {
          const tokenData = data.data[tokenAddress];
          return {
            symbol: tokenData.symbol,
            price: parseFloat(tokenData.price) || 0,
            priceChange24h: parseFloat(tokenData.price_change_24h) || 0,
            volume24h: parseFloat(tokenData.volume_24h) || 0,
            marketCap: parseFloat(tokenData.market_cap) || 0
          };
        }
        
        return null;
      } catch (error) {
        logger.info(`Attempt ${attempt + 1} failed for token ${tokenAddress}:`, error?.toString() || '');
        this.switchApiEndpoint();
        
        if (attempt === maxRetries - 1) {
          logger.error(`All attempts failed for token ${tokenAddress}`);
          return null;
        }
      }
    }
    
    return null;
  }

  // Get all token prices with improved error handling
  async getAllTokenPrices(): Promise<Record<string, TokenPrice>> {
    const priceMap: Record<string, TokenPrice> = {};
    const maxConcurrent = 5; // Limit concurrent requests
    
    try {
      // Get top tokens first
      const topTokens = this.tokens.slice(0, 20);
      
      for (let i = 0; i < topTokens.length; i += maxConcurrent) {
        const batch = topTokens.slice(i, i + maxConcurrent);
        const promises = batch.map(async (token) => {
          try {
            const price = await this.getTokenPrice(token.address);
            if (price) {
              priceMap[token.symbol] = price;
            }
          } catch (error) {
            logger.info(`Failed to get price for ${token.symbol}:`, error?.toString() || '');
          }
        });
        
        await Promise.allSettled(promises);
        
        // Small delay between batches to avoid rate limiting
        if (i + maxConcurrent < topTokens.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
      logger.success(`✅ Loaded prices for ${Object.keys(priceMap).length} tokens`);
      return priceMap;
    } catch (error) {
      logger.error('Failed to load token prices:', error?.toString());
      return priceMap;
    }
  }

  // Get token by symbol
  getTokenBySymbol(symbol: string): PancakeSwapToken | null {
    return this.tokens.find(token => token.symbol.toUpperCase() === symbol.toUpperCase()) || null;
  }

  // Get token by address
  getTokenByAddress(address: string): PancakeSwapToken | null {
    return this.tokens.find(token => token.address.toLowerCase() === address.toLowerCase()) || null;
  }

  // Get all tokens
  getAllTokens(): PancakeSwapToken[] {
    return this.tokens;
  }

  // Get token logo URL with fallback
  getTokenLogoUrl(token: PancakeSwapToken): string {
    if (token.logoURI) {
      return token.logoURI;
    }
    
    // Fallback to placeholder
    return `https://via.placeholder.com/32x32/FFD700/000000?text=${token.symbol.charAt(0)}`;
  }

  // Execute with retry mechanism
  async executeWithRetry<T>(operation: () => Promise<T>, maxRetries = 3): Promise<T> {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (attempt === maxRetries - 1) {
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
    throw new Error('Max retries exceeded');
  }
}

// Export singleton instance
export const pancakeSwapService = new PancakeSwapService(); 