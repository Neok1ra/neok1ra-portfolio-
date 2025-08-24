import React, { useState, useEffect } from 'react';
import { Terminal, Skull, Eye, Zap, Shield, Code2, Ghost, Lock } from 'lucide-react';

export const AboutMeCard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedQuote, setTypedQuote] = useState('');
  const [showStats, setShowStats] = useState(false);
  const [glitchText, setGlitchText] = useState('');

  const quote = `I am Light — code is my weapon, the network my battlefield.
I don't scan. I haunt. I don't hack. I disappear.

Every tool I build leaves no trace — only questions.`;

  const signature = "— Neok1ra";

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Typing animation for the quote
  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index < quote.length) {
        setTypedQuote(quote.slice(0, index + 1));
        if ((window as any).playTypingSound && Math.random() < 0.7) {
          (window as any).playTypingSound();
        }
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowStats(true), 500);
      }
    }, 60);

    return () => clearInterval(timer);
  }, [isVisible]);

  // Glitch effect for signature
  useEffect(() => {
    if (!showStats) return;

    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const originalText = signature;
    
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        let glitched = '';
        for (let i = 0; i < originalText.length; i++) {
          if (Math.random() < 0.3 && originalText[i] !== ' ') {
            glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
          } else {
            glitched += originalText[i];
          }
        }
        setGlitchText(glitched);
        
        setTimeout(() => setGlitchText(originalText), 100);
      }
    }, 2000);

    setGlitchText(originalText);
    return () => clearInterval(glitchInterval);
  }, [showStats]);

  const hackingStats = [
    { icon: Skull, label: 'SYSTEMS_COMPROMISED', value: '∞', color: 'text-red-400' },
    { icon: Ghost, label: 'TRACES_LEFT', value: '0', color: 'text-green-400' },
    { icon: Eye, label: 'WATCHING_YOU', value: 'YES', color: 'text-yellow-400' },
    { icon: Lock, label: 'SECRETS_UNLOCKED', value: '???', color: 'text-purple-400' }
  ];

  const skills = [
    'PHANTOM_INFILTRATION',
    'ZERO_TRACE_EXPLOITATION', 
    'NEURAL_NETWORK_MANIPULATION',
    'QUANTUM_CRYPTOGRAPHY_BYPASS',
    'SHADOW_PROTOCOL_DEVELOPMENT',
    'DIGITAL_GHOST_OPERATIONS'
  ];

  return (
    <div 
      className={`transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="relative border-2 border-green-400/20 bg-gradient-to-br from-black/90 via-gray-900/50 to-black/90 backdrop-blur-lg p-8 hover:border-green-400/60 transition-all duration-700 group overflow-hidden">
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-transparent to-red-400/20 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent animate-pulse"></div>
        </div>

        {/* Header with Terminal Effect */}
        <div className="relative z-10 flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative p-3 border border-green-400/50 bg-black/70 group-hover:bg-green-400/10 transition-all duration-500">
              <Terminal className="w-6 h-6 text-green-400 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-400 font-serif tracking-wider">
                GHOST_PROFILE.exe
              </h2>
              <div className="flex items-center space-x-2 text-xs font-mono">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400/70">SYSTEM_ACTIVE</span>
                <span className="text-green-400/50">|</span>
                <span className="text-red-400/70">CLASSIFIED</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-green-400/70 font-mono text-xs">THREAT_LEVEL</div>
            <div className="text-red-400 font-bold text-lg animate-pulse">MAXIMUM</div>
          </div>
        </div>

        {/* Quote Section with Matrix-style Background */}
        <div className="relative mb-8 p-6 bg-black/80 border-l-4 border-green-400 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="text-green-400 font-mono text-xs leading-tight break-all">
              {Array(20).fill('01001000 01100001 01100011 01101011 01100101 01110010 ').join('')}
            </div>
          </div>
          
          <div className="relative z-10">
            <pre className="text-green-300 leading-relaxed text-sm whitespace-pre-wrap font-bold italic" style={{ fontFamily: 'cursive' }}>
              {typedQuote}
              <span className="animate-pulse text-green-400">|</span>
            </pre>
            
            {showStats && (
              <div className="mt-4 text-right">
                <span 
                  className="text-red-400 font-bold font-mono text-lg tracking-wider"
                  style={{
                    textShadow: '0 0 10px #ff0000, 0 0 20px #ff0000',
                    animation: 'flicker 2s infinite alternate'
                  }}
                >
                  {glitchText}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Hacking Stats Grid */}
        {showStats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {hackingStats.map((stat, index) => (
              <div
                key={stat.label}
                className="relative text-center p-4 border border-gray-700/50 bg-black/60 hover:border-green-400/50 hover:bg-green-400/5 transition-all duration-300 transform hover:scale-105 cursor-pointer group/stat"
                style={{ 
                  animation: `fadeInUp 0.8s ease forwards`,
                  animationDelay: `${0.2 + index * 0.1}s`,
                  opacity: 0
                }}
                onMouseEnter={() => {
                  (window as any).playHoverSound?.();
                  (window as any).playSystemSound?.();
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-400/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500"></div>
                <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2 group-hover/stat:animate-spin`} />
                <div className={`text-xl font-bold ${stat.color} font-mono`}>{stat.value}</div>
                <div className="text-gray-400 text-xs font-mono">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Skills Matrix */}
        {showStats && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-green-400 mb-4 font-mono flex items-center">
              <Code2 className="w-4 h-4 mr-2 animate-pulse" />
              CLASSIFIED_ABILITIES
              <div className="ml-2 px-2 py-1 bg-red-400/20 text-red-400 text-xs border border-red-400/30">
                TOP_SECRET
              </div>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {skills.map((skill, index) => (
                <div
                  key={skill}
                  className="flex items-center space-x-3 p-3 border border-gray-700/30 bg-black/40 hover:border-green-400/50 hover:bg-green-400/5 transition-all duration-300 cursor-pointer group/skill"
                  style={{ 
                    animation: `fadeInUp 0.8s ease forwards`,
                    animationDelay: `${0.5 + index * 0.1}s`,
                    opacity: 0
                  }}
                  onMouseEnter={() => (window as any).playTerminalSound?.()}
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse group-hover/skill:bg-red-400"></div>
                  <span className="text-green-300 text-sm font-mono group-hover/skill:text-green-400 transition-colors">
                    {skill}
                  </span>
                  <div className="ml-auto">
                    <Shield className="w-3 h-3 text-green-400/50 group-hover/skill:text-green-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status Bar */}
        {showStats && (
          <div className="border-t border-green-400/20 pt-6">
            <div className="flex flex-wrap items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-4 text-green-400/70">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>ONLINE</span>
                </div>
                <span>•</span>
                <span>LOCATION: EVERYWHERE</span>
                <span>•</span>
                <span>STATUS: HUNTING</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-3 h-3 text-yellow-400 animate-pulse" />
                <span className="text-yellow-400">POWER_LEVEL: OVER_9000</span>
              </div>
            </div>
          </div>
        )}

        {/* Decorative Corner Elements */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-green-400/50"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-green-400/50"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-green-400/50"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-green-400/50"></div>
      </div>

      <style jsx>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};