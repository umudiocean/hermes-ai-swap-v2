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
import WalletConnect from './components/WalletConnect';
import NetworkSwitcher from './components/NetworkSwitcher';

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
    <div className="min-h-screen relative overflow-hidden">
      {/* AI Robot Silhouette */}
      <div className="robot-silhouette"></div>
      
      {/* Shooting Stars */}
      <div className="shooting-star-1"></div>
      <div className="shooting-star-2"></div>
      
      {/* Additional Stars */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-40 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-80 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-3000"></div>
        
        {/* Random Scattered Stars */}
        <div className="absolute top-15 left-15 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-35 right-25 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse delay-1500"></div>
        <div className="absolute top-55 left-2/3 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-2500"></div>
        <div className="absolute top-75 right-1/3 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse delay-3500"></div>
        <div className="absolute top-25 left-3/4 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-750"></div>
        <div className="absolute top-45 right-2/3 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse delay-1750"></div>
        <div className="absolute top-65 left-1/4 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-2750"></div>
        <div className="absolute top-85 right-1/2 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse delay-3750"></div>
        <div className="absolute top-10 left-1/2 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-1250"></div>
        <div className="absolute top-30 right-1/6 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse delay-2250"></div>
        <div className="absolute top-50 left-1/6 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-3250"></div>
        <div className="absolute top-70 right-3/4 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse delay-4250"></div>
        <div className="absolute top-90 left-3/4 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-5250"></div>
        <div className="absolute top-5 right-1/3 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse delay-6250"></div>
        <div className="absolute top-95 left-1/3 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-7250"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-4 md:space-x-8">
          {/* Logo */}
          <div className="flex items-center space-x-2 relative group">
            {/* Logo Container */}
            <div className="relative px-4 py-2 rounded-lg border border-[#62cbc1] bg-black bg-opacity-20 backdrop-blur-sm">
              <div className="flex items-center space-x-1">
                <span className="text-white text-lg md:text-xl font-bold relative z-10">Hermes</span>
                <span className="text-[#62cbc1] text-lg md:text-xl font-bold relative z-10">AI</span>
                <span className="text-[#62cbc1] text-lg md:text-xl font-bold relative z-10">Swap</span>
              </div>
              
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#62cbc1] to-transparent opacity-15 animate-pulse" style={{animationDuration: '4s'}}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#62cbc1] to-transparent opacity-10 animate-pulse delay-1000" style={{animationDuration: '4s'}}></div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#62cbc1] to-transparent opacity-10 blur-sm group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            
            {/* Version Badge */}
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-[#62cbc1] rounded-full animate-pulse"></div>
              <span className="text-xs text-[#62cbc1] font-medium">V4</span>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex items-center space-x-2 md:space-x-4">
            <button 
              onClick={() => setSelectedModule('swap')}
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 relative group button-animate ${
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
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 relative group button-animate ${
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
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 relative group button-animate ${
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
            
            <button 
              onClick={() => setSelectedModule('analysis')}
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 relative group button-animate ${
                selectedModule === 'analysis' 
                  ? 'bg-jupiter-green text-black shadow-lg ring-2 ring-jupiter-green ring-opacity-50' 
                  : 'text-white hover:text-jupiter-green'
              }`}
            >
              <span className="relative z-10 text-sm md:text-base">AI Crypto Analysis</span>
              <div className={`absolute inset-0 bg-jupiter-green rounded-lg transition-opacity duration-300 ${
                selectedModule === 'analysis' ? 'opacity-20' : 'opacity-0 group-hover:opacity-10'
              }`}></div>
            </button>
            
            <a 
              href="https://x.com/hermes_ai_trade" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-jupiter-green transition-all duration-300 transform hover:scale-105 flex items-center space-x-1 group px-3 py-2 rounded-lg button-animate"
            >
              <span className="relative z-10 text-sm md:text-base">Join X</span>
              <ExternalLink className="w-3 h-3 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            </a>
            
            <a 
              href="https://t.me/hermes_ai_trade" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-jupiter-green transition-all duration-300 transform hover:scale-105 flex items-center space-x-1 group px-3 py-2 rounded-lg button-animate"
            >
              <span className="relative z-10 text-sm md:text-base">Join Telegram</span>
              <ExternalLink className="w-3 h-3 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            </a>
          </nav>
          
          {/* Connect Button */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <NetworkSwitcher />
              <WalletConnect />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-sm">
          {/* Swap Card */}
          <div className="bg-jupiter-gray rounded-2xl p-4 border border-gray-700 relative button-animate">
            {/* Pulsing Background Effect */}
            <div className="swap-card-pulse"></div>
            {/* Rotating Laser Border */}
            <div className="laser-border"></div>
            {/* Tabs */}
            <div className="flex space-x-1 mb-4">
              <button 
                onClick={() => setSelectedModule('swap')}
                className={`flex-1 rounded-lg py-2 px-4 font-medium flex items-center justify-center space-x-2 transform hover:scale-105 transition-all duration-200 hover:shadow-lg relative overflow-hidden group button-animate ${
                  selectedModule === 'swap' 
                    ? 'bg-jupiter-green text-black shadow-lg ring-2 ring-jupiter-green ring-opacity-50' 
                    : 'bg-transparent text-gray-400 hover:text-white'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-jupiter-green to-[#62cbc1] transition-opacity duration-300 ${
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
                className={`flex-1 rounded-lg py-2 px-4 font-medium flex items-center justify-center space-x-2 transform hover:scale-105 transition-all duration-200 relative overflow-hidden group button-animate ${
                  selectedModule === 'referral' 
                    ? 'bg-jupiter-green text-black shadow-lg ring-2 ring-jupiter-green ring-opacity-50' 
                    : 'bg-transparent text-gray-400 hover:text-white'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-jupiter-green to-[#62cbc1] transition-opacity duration-300 ${
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
                className={`flex-1 rounded-lg py-2 px-4 font-medium flex items-center justify-center space-x-2 transform hover:scale-105 transition-all duration-200 relative overflow-hidden group button-animate ${
                  selectedModule === 'stake' 
                    ? 'bg-jupiter-green text-black shadow-lg ring-2 ring-jupiter-green ring-opacity-50' 
                    : 'bg-transparent text-gray-400 hover:text-white'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-jupiter-green to-[#62cbc1] transition-opacity duration-300 ${
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
              <label className="block text-sm font-medium text-gray-300 mb-2">Selling</label>
              <div className="bg-jupiter-light-gray rounded-lg p-3 border border-gray-600 button-animate">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{sellToken.icon}</span>
                    <div>
                      <div className="text-white font-medium">{sellToken.symbol}</div>
                      <div className="text-xs text-gray-400">{sellToken.address.slice(0, 4)}...{sellToken.address.slice(-4)}</div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{sellAmount}</div>
                    <div className="text-sm text-gray-400">$0</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center mb-4">
              <button 
                onClick={swapTokens}
                className="bg-jupiter-gray border border-gray-600 rounded-full p-2 hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 button-animate"
              >
                <RefreshCw className="w-5 h-5 text-jupiter-green" />
              </button>
            </div>

            {/* Buying Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Buying</label>
              <div className="bg-jupiter-light-gray rounded-lg p-3 border border-gray-600 button-animate">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{buyToken.icon}</span>
                    <div>
                      <div className="text-white font-medium">{buyToken.symbol}</div>
                      <div className="text-xs text-gray-400">{buyToken.address.slice(0, 4)}...{buyToken.address.slice(-4)}</div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{buyAmount}</div>
                    <div className="text-sm text-gray-400">$0</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connect Wallet Button */}
            <button 
              className="w-full bg-jupiter-green text-black font-bold py-3 px-4 rounded-lg hover:bg-[#62cbc1] hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 button-animate"
            >
              <Wallet className="w-5 h-5" />
              <span>Connect Wallet</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App; 