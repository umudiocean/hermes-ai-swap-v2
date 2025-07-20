import React, { useState } from 'react';
import { 
  ChevronDown, 
  Zap,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Wallet,
  TrendingUp,
  Shield
} from 'lucide-react';


// Token data
const tokens = {
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    icon: '💵',
    price: '$0.99991',
    change: '0%',
    changeColor: 'text-red-500',
    chartColor: 'bg-pink-500'
  },
  SOL: {
    symbol: 'SOL',
    name: 'Solana',
    address: 'So11111111111111111111111111111111111111112',
    icon: '☀️',
    price: '$176.9',
    change: '+0.16%',
    changeColor: 'text-green-500',
    chartColor: 'bg-green-500'
  }
};

function App() {
  const [sellToken, setSellToken] = useState(tokens.USDC);
  const [buyToken, setBuyToken] = useState(tokens.SOL);
  const [sellAmount, setSellAmount] = useState('0.00');
  const [buyAmount, setBuyAmount] = useState('0.00');
  const [selectedModule, setSelectedModule] = useState('swap');

  const swapTokens = () => {
    setSellToken(buyToken);
    setBuyToken(sellToken);
    setSellAmount(buyAmount);
    setBuyAmount(sellAmount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-jupiter-dark via-gray-900 to-jupiter-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-stars opacity-20"></div>
      
      {/* Planet Silhouette */}
      <div className="absolute right-1/4 top-1/4 w-64 h-64 rounded-full border-4 border-cyan-400/30 opacity-40"></div>
      <div className="absolute right-1/4 top-1/4 w-48 h-48 rounded-full border-2 border-cyan-300/20 opacity-30"></div>
      
      {/* Cat Silhouette */}
      <div className="absolute bottom-8 left-8 w-16 h-12">
        <div className="w-full h-full bg-gray-600 rounded-full opacity-30"></div>
        <div className="absolute -top-2 left-2 w-3 h-3 bg-gray-600 rounded-full opacity-30"></div>
        <div className="absolute -top-2 right-2 w-3 h-3 bg-gray-600 rounded-full opacity-30"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-4 md:space-x-8">
          {/* Logo */}
          <div className="flex items-center space-x-1 relative">
            <span className="text-white text-lg md:text-xl font-bold relative z-10">Hermes</span>
            <span className="text-jupiter-green text-lg md:text-xl font-bold relative z-10">AI</span>
            <span className="text-jupiter-green text-lg md:text-xl font-bold relative z-10">Swap</span>
            
            {/* Lazer çizgileri */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-jupiter-green to-transparent animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-jupiter-green to-transparent animate-pulse delay-100"></div>
              <div className="absolute top-1/2 left-0 w-0.5 h-full bg-gradient-to-b from-transparent via-jupiter-green to-transparent animate-pulse delay-200"></div>
              <div className="absolute top-1/2 right-0 w-0.5 h-full bg-gradient-to-b from-transparent via-jupiter-green to-transparent animate-pulse delay-300"></div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex items-center space-x-2 md:space-x-4">
            <button 
              onClick={() => setSelectedModule('swap')}
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 relative group ${
                selectedModule === 'swap' 
                  ? 'bg-jupiter-green text-black shadow-lg ring-2 ring-jupiter-green ring-opacity-50' 
                  : 'text-white hover:text-jupiter-green'
              }`}
            >
              <span className="relative z-10 text-sm md:text-base">Swap</span>
              <div className={`absolute inset-0 bg-jupiter-green rounded-lg transition-opacity duration-300 ${
                selectedModule === 'swap' ? 'opacity-20' : 'opacity-0 group-hover:opacity-10'
              }`}></div>
            </button>
            
            <button 
              onClick={() => setSelectedModule('referral')}
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 relative group ${
                selectedModule === 'referral' 
                  ? 'bg-jupiter-green text-black shadow-lg ring-2 ring-jupiter-green ring-opacity-50' 
                  : 'text-white hover:text-jupiter-green'
              }`}
            >
              <span className="relative z-10 text-sm md:text-base">Referral</span>
              <div className={`absolute inset-0 bg-jupiter-green rounded-lg transition-opacity duration-300 ${
                selectedModule === 'referral' ? 'opacity-20' : 'opacity-0 group-hover:opacity-10'
              }`}></div>
            </button>
            
            <button 
              onClick={() => setSelectedModule('stake')}
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 relative group ${
                selectedModule === 'stake' 
                  ? 'bg-jupiter-green text-black shadow-lg ring-2 ring-jupiter-green ring-opacity-50' 
                  : 'text-white hover:text-jupiter-green'
              }`}
            >
              <span className="relative z-10 text-sm md:text-base">Stake</span>
              <div className={`absolute inset-0 bg-jupiter-green rounded-lg transition-opacity duration-300 ${
                selectedModule === 'stake' ? 'opacity-20' : 'opacity-0 group-hover:opacity-10'
              }`}></div>
            </button>
            
            <a 
              href="https://x.com/hermes_ai_trade" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-jupiter-green transition-all duration-300 transform hover:scale-105 flex items-center space-x-1 group px-3 py-2 rounded-lg"
            >
              <span className="relative z-10 text-sm md:text-base">Join X</span>
              <ExternalLink className="w-3 h-3 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            </a>
            
            <a 
              href="https://t.me/hermes_ai_trade" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-jupiter-green transition-all duration-300 transform hover:scale-105 flex items-center space-x-1 group px-3 py-2 rounded-lg"
            >
              <span className="relative z-10 text-sm md:text-base">Join Telegram</span>
              <ExternalLink className="w-3 h-3 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            </a>
          </nav>
          
          {/* Connect Button */}
          <div className="flex items-center">
            <button className="bg-jupiter-gray text-white px-3 md:px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <Shield className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-sm md:text-base">Connect</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-sm">
          {/* Swap Card */}
          <div className="bg-jupiter-gray rounded-2xl p-4 border border-gray-700">
            {/* Tabs */}
            <div className="flex space-x-1 mb-4">
              <button 
                onClick={() => setSelectedModule('swap')}
                className={`flex-1 rounded-lg py-2 px-4 font-medium flex items-center justify-center space-x-2 transform hover:scale-105 transition-all duration-200 hover:shadow-lg relative overflow-hidden group ${
                  selectedModule === 'swap' 
                    ? 'bg-jupiter-green text-black shadow-lg ring-2 ring-jupiter-green ring-opacity-50' 
                    : 'bg-transparent text-gray-400 hover:text-white'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-jupiter-green to-blue-500 transition-opacity duration-300 ${
                  selectedModule === 'swap' ? 'opacity-100' : 'opacity-0 group-hover:opacity-10'
                }`}></div>
                <div className={`absolute inset-0 bg-white transition-opacity duration-300 ${
                  selectedModule === 'swap' ? 'opacity-20 animate-pulse' : 'opacity-0'
                }`}></div>
                <Zap className={`w-4 h-4 relative z-10 transition-all duration-300 ${
                  selectedModule === 'swap' ? 'animate-pulse' : ''
                }`} />
                <span className={`relative z-10 transition-all duration-300 ${
                  selectedModule === 'swap' ? 'font-semibold' : ''
                }`}>Swap</span>
                <div className={`absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full transition-all duration-300 ${
                  selectedModule === 'swap' ? 'animate-ping' : 'opacity-0'
                }`}></div>
              </button>
              
              <button 
                onClick={() => setSelectedModule('referral')}
                className={`flex-1 rounded-lg py-2 px-4 font-medium flex items-center justify-center space-x-2 transform hover:scale-105 transition-all duration-200 relative overflow-hidden group ${
                  selectedModule === 'referral' 
                    ? 'bg-jupiter-green text-black shadow-lg ring-2 ring-jupiter-green ring-opacity-50' 
                    : 'bg-transparent text-gray-400 hover:text-white'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-jupiter-green to-blue-500 transition-opacity duration-300 ${
                  selectedModule === 'referral' ? 'opacity-100' : 'opacity-0 group-hover:opacity-10'
                }`}></div>
                <div className={`absolute inset-0 bg-white transition-opacity duration-300 ${
                  selectedModule === 'referral' ? 'opacity-20 animate-pulse' : 'opacity-0'
                }`}></div>
                <Sparkles className={`w-4 h-4 relative z-10 transition-all duration-300 ${
                  selectedModule === 'referral' ? 'animate-spin' : 'group-hover:animate-spin'
                }`} />
                <span className={`relative z-10 transition-all duration-300 ${
                  selectedModule === 'referral' ? 'font-semibold' : ''
                }`}>Referral</span>
                <div className={`absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full transition-all duration-300 ${
                  selectedModule === 'referral' ? 'animate-ping' : 'opacity-0'
                }`}></div>
              </button>
              
              <button 
                onClick={() => setSelectedModule('stake')}
                className={`flex-1 rounded-lg py-2 px-4 font-medium flex items-center justify-center space-x-2 transform hover:scale-105 transition-all duration-200 relative overflow-hidden group ${
                  selectedModule === 'stake' 
                    ? 'bg-jupiter-green text-black shadow-lg ring-2 ring-jupiter-green ring-opacity-50' 
                    : 'bg-transparent text-gray-400 hover:text-white'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-jupiter-green to-blue-500 transition-opacity duration-300 ${
                  selectedModule === 'stake' ? 'opacity-100' : 'opacity-0 group-hover:opacity-10'
                }`}></div>
                <div className={`absolute inset-0 bg-white transition-opacity duration-300 ${
                  selectedModule === 'stake' ? 'opacity-20 animate-pulse' : 'opacity-0'
                }`}></div>
                <TrendingUp className={`w-4 h-4 relative z-10 transition-all duration-300 ${
                  selectedModule === 'stake' ? 'animate-bounce' : 'group-hover:animate-bounce'
                }`} />
                <span className={`relative z-10 transition-all duration-300 ${
                  selectedModule === 'stake' ? 'font-semibold' : ''
                }`}>Stake</span>
                <div className={`absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full transition-all duration-300 ${
                  selectedModule === 'stake' ? 'animate-ping' : 'opacity-0'
                }`}></div>
              </button>
            </div>

            {/* Version Badge */}
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-xs text-gray-400">Hermes V4</span>
              <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
            </div>

            {/* Selling Section */}
            <div className="mb-4">
              <div className="text-sm text-gray-400 mb-2">Selling</div>
              <div className="flex items-center justify-between bg-jupiter-light-gray rounded-xl p-3 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
                <div className="absolute inset-0 bg-jupiter-green opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl"></div>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{sellToken.icon}</div>
                  <div>
                    <div className="text-white font-medium">{sellToken.symbol}</div>
                    <div className="text-xs text-gray-400">{sellToken.address.slice(0, 4)}...{sellToken.address.slice(-4)}</div>
                  </div>
                  <ChevronDown className="text-gray-400 w-4 h-4" />
                </div>
                <div className="text-right">
                  <input
                    type="text"
                    value={sellAmount}
                    onChange={(e) => setSellAmount(e.target.value)}
                    className="text-2xl font-bold text-white bg-transparent text-right focus:outline-none w-24"
                    placeholder="0.00"
                  />
                  <div className="text-sm text-gray-400">$0</div>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center mb-4">
              <button
                onClick={swapTokens}
                className="bg-jupiter-light-gray p-3 rounded-full hover:bg-gray-600 transition-all duration-300 transform hover:scale-110 hover:rotate-180 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-jupiter-green opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></div>
                <RefreshCw className="w-6 h-6 text-gray-400 group-hover:text-jupiter-green transition-colors duration-300 relative z-10 group-hover:animate-spin" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Buying Section */}
            <div className="mb-6">
              <div className="text-sm text-gray-400 mb-2">Buying</div>
              <div className="flex items-center justify-between bg-jupiter-light-gray rounded-xl p-3 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
                <div className="absolute inset-0 bg-jupiter-green opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl"></div>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{buyToken.icon}</div>
                  <div>
                    <div className="text-white font-medium">{buyToken.symbol}</div>
                    <div className="text-xs text-gray-400">{buyToken.address.slice(0, 4)}...{buyToken.address.slice(-4)}</div>
                  </div>
                  <ChevronDown className="text-gray-400 w-4 h-4" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{buyAmount}</div>
                  <div className="text-sm text-gray-400">$0</div>
                </div>
              </div>
            </div>

            {/* Connect Button */}
            <button className="w-full bg-jupiter-green text-black py-3 rounded-xl font-semibold text-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-jupiter-green via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
              <Wallet className="w-5 h-5 animate-bounce relative z-10 group-hover:animate-spin" />
              <span className="relative z-10 font-bold">Connect Wallet</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            </button>
          </div>


        </div>
      </main>
    </div>
  );
}

export default App; 