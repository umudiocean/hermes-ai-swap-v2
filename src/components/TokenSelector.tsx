import React, { useState } from 'react';

interface Token {
  symbol: string;
  name: string;
  icon: string;
  address: string;
  decimals: number;
}

interface TokenSelectorProps {
  selectedToken: Token;
  onTokenSelect: (token: Token) => void;
  isOpen: boolean;
  onClose: () => void;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({ 
  selectedToken, 
  onTokenSelect, 
  isOpen, 
  onClose 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const popularTokens: Token[] = [
    {
      symbol: 'USDC',
      name: 'USD Coin',
      icon: '💰',
      address: '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8',
      decimals: 6
    },
    {
      symbol: 'USDT',
      name: 'Tether USD',
      icon: '💵',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      decimals: 6
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      icon: '⚡',
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      decimals: 18
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      icon: '☀️',
      address: '0x8C3B02B0C8C8C8C8C8C8C8C8C8C8C8C8C8C8C8C8',
      decimals: 9
    },
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      icon: '₿',
      address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      decimals: 8
    },
    {
      symbol: 'MATIC',
      name: 'Polygon',
      icon: '🔷',
      address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608aC1C4C8C',
      decimals: 18
    }
  ];

  const filteredTokens = popularTokens.filter(token =>
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-3xl p-6 max-w-md w-11/12 max-h-96 overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Select Token</h2>
          <button 
            onClick={onClose}
            className="text-white text-2xl hover:text-gray-300 transition-colors"
          >
            ×
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search tokens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        <div className="overflow-y-auto max-h-64 space-y-2">
          {filteredTokens.map((token) => (
            <div
              key={token.address}
              onClick={() => {
                onTokenSelect(token);
                onClose();
              }}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-gray-800 ${
                selectedToken.address === token.address ? 'bg-cyan-900/20 border border-cyan-500/30' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-lg font-bold">
                {token.icon}
              </div>
              <div className="flex-1">
                <div className="text-white font-medium">{token.symbol}</div>
                <div className="text-xs text-gray-400">{token.name}</div>
              </div>
              {selectedToken.address === token.address && (
                <div className="text-cyan-400 text-sm">✓</div>
              )}
            </div>
          ))}
        </div>

        {filteredTokens.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No tokens found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenSelector; 