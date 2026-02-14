'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { FREE_NFT_ABI } from '@/lib/contract-abi';
import { 
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Avatar,
  Name,
  Address,
} from '@coinbase/onchainkit/identity';

const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`;

export function MintNFT() {
  const { address, isConnected } = useAccount();
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  const { data: hasMinted } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: FREE_NFT_ABI,
    functionName: 'hasClaimed',
    args: address ? [address] : undefined,
  });

  const { data: totalSupply } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: FREE_NFT_ABI,
    functionName: 'totalMinted',
  });

  const { data: maxSupply } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: FREE_NFT_ABI,
    functionName: 'MAX_SUPPLY',
  });

  const { data: hash, writeContract, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed) {
      setMintSuccess(true);
      setIsMinting(false);
      triggerGlitch();
    }
  }, [isConfirmed]);

  const triggerGlitch = () => {
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 500);
  };

  const handleMint = async () => {
    if (!address || !NFT_CONTRACT_ADDRESS) return;
    
    setIsMinting(true);
    setMintSuccess(false);
    triggerGlitch();

    try {
      writeContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: FREE_NFT_ABI,
        functionName: 'claimGenesis',
      });
    } catch (error) {
      console.error('Error minting NFT:', error);
      setIsMinting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-grid-cyan opacity-10 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/5 to-magenta-500/5"></div>
        
        {/* Scan lines */}
        <div className="absolute inset-0 bg-scan-lines opacity-5 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-md w-full">
          <div className="border border-cyan-500/30 bg-black/90 backdrop-blur-sm p-8 relative group hover:border-cyan-500/60 transition-all duration-300">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-magenta-500"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-magenta-500"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500"></div>
            
            <div className="text-center space-y-6">
              <div className="relative">
                <h1 className="font-mono text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-500 mb-2 animate-pulse-glow">
                  GENESIS
                </h1>
                <p className="font-mono text-cyan-400 text-sm tracking-widest">
                  {'>'} COLLECTION.INIT
                </p>
              </div>
              
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              
              <p className="font-mono text-gray-400 text-sm">
                [CONNECT_WALLET] to access Genesis NFT
              </p>
              
              <div className="pt-4 flex justify-center">
                <Wallet>
                  <ConnectWallet>
                    <div className="border border-cyan-500 bg-transparent hover:bg-cyan-500/10 text-cyan-400 font-mono py-3 px-8 transition-all duration-300 flex items-center justify-center gap-2 group">
                      <span className="text-sm tracking-wider">CONNECT</span>
                      <span className="group-hover:translate-x-1 transition-transform">{'>'}</span>
                    </div>
                  </ConnectWallet>
                  <WalletDropdown>
                    <WalletDropdownDisconnect />
                  </WalletDropdown>
                </Wallet>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentSupply = totalSupply ? Number(totalSupply) : 0;
  const max = maxSupply ? Number(maxSupply) : 0;
  const userHasMinted = Boolean(hasMinted);
  const progress = max > 0 ? (currentSupply / max) * 100 : 0;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-grid-cyan opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-magenta-500/10"></div>
      
      {/* Scan lines */}
      <div className="absolute inset-0 bg-scan-lines opacity-5 pointer-events-none"></div>
      
      {/* Glitch overlay */}
      {glitchActive && (
        <div className="absolute inset-0 bg-cyan-500/20 mix-blend-screen pointer-events-none animate-glitch"></div>
      )}
      
      <div className="relative z-10 max-w-2xl w-full">
        <div className={`border ${mintSuccess ? 'border-magenta-500/60' : 'border-cyan-500/30'} bg-black/90 backdrop-blur-sm p-8 relative transition-all duration-500`}>
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-magenta-500"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-magenta-500"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500"></div>
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-cyan-500/20">
            <div className="flex items-center gap-4">
              <Avatar address={address} className="w-10 h-10 border-2 border-cyan-500/50" />
              <div>
                <Name address={address} className="font-mono text-cyan-400 text-sm" />
                <Address address={address} className="font-mono text-gray-500 text-xs" />
              </div>
            </div>
            
            <Wallet>
              <ConnectWallet>
                <div className="border border-magenta-500/50 px-3 py-1 text-xs font-mono text-magenta-400">
                  CONNECTED
                </div>
              </ConnectWallet>
              <WalletDropdown>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
          
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="font-mono text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-cyan-400 mb-2 animate-gradient">
              GENESIS
            </h1>
            <div className="flex justify-center my-6">
             <img 
               src="/images/icon.png" 
              alt="Genesis NFT" 
              className="w-48 h-48 object-contain opacity-90 hover:opacity-100 transition-opacity"
             />
              </div>
            <p className="font-mono text-cyan-400 text-sm tracking-widest">
              {'>'} NFT_MINT.EXE
            </p>
          </div>
          
          {/* Supply indicator */}
          <div className="mb-8 space-y-3">
            <div className="flex justify-between font-mono text-xs text-gray-400">
              <span>[SUPPLY]</span>
              <span className="text-cyan-400">{currentSupply} / {max}</span>
            </div>
            
            {/* Progress bar */}
            <div className="h-2 bg-gray-900 border border-cyan-500/30 relative overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-magenta-500 transition-all duration-1000 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
              </div>
            </div>
            
            <div className="flex justify-between font-mono text-xs">
              <span className="text-gray-500">{'>'} PROGRESS</span>
              <span className="text-magenta-400">{progress.toFixed(1)}%</span>
            </div>
          </div>
          
          {/* Status / Action */}
          <div className="space-y-4">
            {userHasMinted ? (
              <div className="border border-magenta-500 bg-magenta-500/10 p-6 text-center">
                <p className="font-mono text-magenta-400 text-sm mb-2">
                  [STATUS] GENESIS_CLAIMED
                </p>
                <p className="font-mono text-gray-400 text-xs">
                  {'>'} One NFT per wallet
                </p>
              </div>
            ) : currentSupply >= max ? (
              <div className="border border-red-500 bg-red-500/10 p-6 text-center">
                <p className="font-mono text-red-400 text-sm mb-2">
                  [ERROR] SUPPLY_DEPLETED
                </p>
                <p className="font-mono text-gray-400 text-xs">
                  {'>'} All Genesis NFTs have been claimed
                </p>
              </div>
            ) : (
              <>
                <button
                  onClick={handleMint}
                  disabled={isMinting || isPending || isConfirming}
                  className="w-full border border-cyan-500 bg-transparent hover:bg-cyan-500/10 text-cyan-400 font-mono py-4 px-6 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isPending || isConfirming ? (
                      <>
                        <span className="animate-pulse">PROCESSING</span>
                        <span className="animate-spin">◐</span>
                      </>
                    ) : isMinting ? (
                      <>
                        <span>MINTING</span>
                        <span className="animate-pulse">...</span>
                      </>
                    ) : (
                      <>
                        <span>CLAIM GENESIS</span>
                        <span className="group-hover:translate-x-1 transition-transform">{'>'}</span>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-all"></div>
                </button>

                {mintSuccess && (
                  <div className="border border-magenta-500 bg-magenta-500/10 p-4 animate-fade-in">
                    <p className="font-mono text-magenta-400 text-sm text-center mb-2">
                      [SUCCESS] GENESIS_MINTED
                    </p>
                    {hash && (
                      <a
                        href={`https://basescan.org/tx/${hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-cyan-400 text-xs text-center block hover:text-cyan-300 transition-colors"
                      >
                        {'>'} VIEW_TRANSACTION
                      </a>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-cyan-500/20">
            <p className="font-mono text-gray-600 text-xs text-center">
              [NETWORK] Base • [PROTOCOL] OnchainKit
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }
        
        .animate-glitch {
          animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .bg-grid-cyan {
          background-image: 
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        .bg-scan-lines {
          background-image: repeating-linear-gradient(
            0deg,
            rgba(6, 182, 212, 0.03),
            rgba(6, 182, 212, 0.03) 1px,
            transparent 1px,
            transparent 2px
          );
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}
