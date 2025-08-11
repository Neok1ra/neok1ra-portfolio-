import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Code, Shield, Zap, ArrowLeft, Github, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import { SoundManager } from './components/SoundManager';
import { AboutMeCard } from './components/AboutMeCard';

interface MatrixChar {
  char: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
}

interface CursorTrail {
  x: number;
  y: number;
  id: number;
}

type Page = 'home' | 'exploits' | 'frameworks' | 'contact';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState<CursorTrail[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const matrixChars = useRef<MatrixChar[]>([]);
  const animationId = useRef<number>();

  // Matrix characters
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Initialize matrix characters
      matrixChars.current = [];
      const numChars = Math.floor(canvas.width / 20) * 2;
      
      for (let i = 0; i < numChars; i++) {
        matrixChars.current.push({
          char: chars[Math.floor(Math.random() * chars.length)],
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw matrix rain
      ctx.fillStyle = '#00ff41';
      ctx.font = '16px monospace';

      matrixChars.current.forEach((char, index) => {
        ctx.globalAlpha = char.opacity;
        ctx.fillText(char.char, char.x, char.y);
        
        char.y += char.speed;
        
        if (char.y > canvas.height) {
          char.y = -20;
          char.x = Math.random() * canvas.width;
          char.char = chars[Math.floor(Math.random() * chars.length)];
        }

        // Random character change
        if (Math.random() < 0.02) {
          char.char = chars[Math.floor(Math.random() * chars.length)];
        }
      });

      ctx.globalAlpha = 1;
      animationId.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.documentElement.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / window.innerWidth - 0.5) * 2,
        y: ((e.clientY - rect.top) / window.innerHeight - 0.5) * 2
      });

      // Add cursor trail
      setCursorTrail(prev => [
        ...prev.slice(-8),
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Cursor trail cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorTrail(prev => prev.filter(trail => Date.now() - trail.id < 1000));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const navigateTo = (page: Page) => {
    if ((window as any).playPageTransition) {
      (window as any).playPageTransition();
    }
    setCurrentPage(page);
  };

  const renderHomePage = () => (
    <main className="flex-1 px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image First */}
          <div className="relative order-2 lg:order-1">
            <div 
              className="w-80 h-80 mx-auto rounded-lg border-2 border-green-400 bg-black/30 backdrop-blur-sm flex items-center justify-center relative overflow-hidden"
              style={{
                animation: 'float 6s ease-in-out infinite',
                animationDelay: '2s',
                boxShadow: '0 0 50px rgba(0, 255, 65, 0.3), inset 0 0 50px rgba(0, 255, 65, 0.1)'
              }}
            >
              {/* Animated scan lines */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/10 to-transparent animate-pulse"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-green-400 animate-pulse" style={{ animation: 'scanLine 3s infinite' }}></div>
              
              <div className="text-center space-y-4 z-10">
                <div className="w-16 h-16 mx-auto border border-green-400/50 rounded-full flex items-center justify-center bg-black/50">
                  <Terminal className="w-8 h-8 text-green-400 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <p className="text-green-400 font-mono text-sm animate-pulse">
                    [SCANNING...]
                  </p>
                  <p className="text-green-400/70 font-mono text-xs">
                    IDENTITY_CLASSIFIED
                  </p>
                  <div className="flex justify-center space-x-1">
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-1 h-1 bg-green-400 rounded-full animate-ping"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-green-400 animate-pulse"></div>
            <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-green-400 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-green-400 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-green-400 animate-pulse"></div>
            
            {/* Floating data elements */}
            <div className="absolute -top-2 left-1/4 text-green-400/30 font-mono text-xs animate-bounce">01001000</div>
            <div className="absolute -right-8 top-1/3 text-green-400/30 font-mono text-xs animate-bounce" style={{ animationDelay: '1s' }}>HACK</div>
            <div className="absolute -bottom-2 right-1/4 text-green-400/30 font-mono text-xs animate-bounce" style={{ animationDelay: '2s' }}>0xFF</div>
            <div className="absolute -left-8 bottom-1/3 text-green-400/30 font-mono text-xs animate-bounce" style={{ animationDelay: '0.5s' }}>ROOT</div>
          </div>

          {/* Text Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <h1 
              className="text-4xl lg:text-6xl font-bold leading-tight"
              style={{ 
                fontFamily: 'serif',
                background: 'linear-gradient(45deg, #00ff41, #ffb000, #00ff41)',
                backgroundSize: '200% 200%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradient 3s ease infinite, shake 3s infinite alternate, float 4s ease-in-out infinite',
                textShadow: '0 0 30px rgba(0, 255, 65, 0.5)'
              }}
            >
              CYBER
              <br />
              SECURITY
              <br />
              <span className="text-yellow-400">SPECIALIST</span>
            </h1>

            <div 
              className="text-lg lg:text-xl text-green-300 leading-relaxed font-mono"
              style={{ 
                animation: 'float 5s ease-in-out infinite',
                animationDelay: '1s'
              }}
            >
              🚀 Started as a curious teen breaking my own home router; now I build pro red-team frameworks.
            </div>

            <div className="flex flex-wrap gap-4">
              {[
                { icon: Shield, text: 'PENETRATION TESTING' },
                { icon: Terminal, text: 'EXPLOIT DEVELOPMENT' },
                { icon: Zap, text: 'RED TEAM OPERATIONS' }
              ].map((skill, index) => (
                <div
                  key={skill.text}
                  className="flex items-center space-x-2 px-4 py-2 border border-green-400/30 bg-black/30 backdrop-blur-sm hover:border-green-400 transition-all duration-300 hover:bg-green-400/10 cursor-pointer"
                  style={{ 
                    animation: `fadeInUp 0.8s ease forwards`,
                    animationDelay: `${0.5 + index * 0.2}s`,
                    opacity: 0
                  }}
                  onMouseEnter={() => (window as any).playHoverSound?.()}
                >
                  <skill.icon className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm font-mono">{skill.text}</span>
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={() => navigateTo('exploits')}
                onMouseEnter={() => (window as any).playHoverSound?.()}
                onClick={() => {
                  (window as any).playClickSound?.();
                  navigateTo('exploits');
                }}
                className="px-8 py-3 bg-green-400 text-black font-bold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-400/50"
              >
                VIEW_EXPLOITS
              </button>
              <button 
                onMouseEnter={() => (window as any).playHoverSound?.()}
                onClick={() => {
                  (window as any).playClickSound?.();
                  navigateTo('contact');
                }}
                className="px-8 py-3 border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 transform hover:scale-105"
              >
                CONTACT_ME
              </button>
            </div>
          </div>
        </div>

        {/* About Me Card */}
        <AboutMeCard />
      </div>
    </main>
  );

  const renderExploitsPage = () => (
    <main className="flex-1 px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced header with hacker elements */}
        <div className="flex items-center space-x-4 mb-8">
          <button 
            onClick={() => {
              (window as any).playClickSound?.();
              navigateTo('home');
            }}
            onMouseEnter={() => (window as any).playHoverSound?.()}
            className="p-2 border border-green-400 bg-black/50 backdrop-blur-sm hover:bg-green-400/20 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 text-green-400" />
          </button>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-green-400 mb-2" style={{ fontFamily: 'serif', textShadow: '0 0 20px #00ff41' }}>
              EXPLOITS_ARSENAL.exe
            </h1>
            <div className="flex items-center space-x-4 text-sm font-mono text-green-400/70">
              <span>[LOADING_WEAPONS...]</span>
              <div className="flex space-x-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-red-400 rounded-full animate-ping" style={{ animationDelay: `${i * 0.3}s` }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Buffer Overflow Toolkit',
              description: 'Advanced buffer overflow exploitation framework with automated payload generation',
              tech: ['C', 'Python', 'Assembly'],
              status: 'Active'
            },
            {
              title: 'Web App Scanner',
              description: 'Custom vulnerability scanner for web applications with ML-based detection',
              tech: ['Python', 'JavaScript', 'SQL'],
              status: 'Beta'
            },
            {
              title: 'Network Pivot Tool',
              description: 'Multi-protocol network pivoting and lateral movement framework',
              tech: ['Go', 'C++', 'Bash'],
              status: 'Active'
            },
            {
              title: 'Privilege Escalation Kit',
              description: 'Automated privilege escalation detection and exploitation suite',
              tech: ['PowerShell', 'Python', 'C#'],
              status: 'Development'
            },
            {
              title: 'Wireless Attack Suite',
              description: 'Comprehensive wireless network penetration testing toolkit',
              tech: ['Python', 'C', 'Bash'],
              status: 'Active'
            },
            {
              title: 'Social Engineering Framework',
              description: 'Automated phishing and social engineering campaign management',
              tech: ['PHP', 'JavaScript', 'Python'],
              status: 'Beta'
            }
          ].map((exploit, index) => (
            <div
              key={exploit.title}
              className="border border-green-400/30 bg-black/30 backdrop-blur-sm p-6 hover:border-green-400 hover:bg-green-400/10 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              style={{ 
                animation: `fadeInUp 0.8s ease forwards`,
                animationDelay: `${index * 0.1}s`,
                opacity: 0
              }}
              onMouseEnter={() => (window as any).playHoverSound?.()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-green-400 font-mono">{exploit.title}</h3>
                <span className={`px-2 py-1 text-xs font-mono ${
                  exploit.status === 'Active' ? 'bg-green-400/20 text-green-400' :
                  exploit.status === 'Beta' ? 'bg-yellow-400/20 text-yellow-400' :
                  'bg-red-400/20 text-red-400'
                }`}>
                  {exploit.status}
                </span>
              </div>
              <p className="text-green-300/80 mb-4 text-sm leading-relaxed">{exploit.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {exploit.tech.map(tech => (
                  <span key={tech} className="px-2 py-1 bg-green-400/10 text-green-400 text-xs font-mono border border-green-400/30">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <button 
                  className="flex items-center space-x-1 px-3 py-1 bg-green-400/20 text-green-400 text-xs hover:bg-green-400/30 transition-colors"
                  onMouseEnter={() => (window as any).playHoverSound?.()}
                  onClick={() => (window as any).playClickSound?.()}
                >
                  <Github className="w-3 h-3" />
                  <span>CODE</span>
                </button>
                <button 
                  className="flex items-center space-x-1 px-3 py-1 border border-green-400/30 text-green-400 text-xs hover:bg-green-400/10 transition-colors"
                  onMouseEnter={() => (window as any).playHoverSound?.()}
                  onClick={() => (window as any).playClickSound?.()}
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>DEMO</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );

  const renderFrameworksPage = () => (
    <main className="flex-1 px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced header */}
        <div className="flex items-center space-x-4 mb-8">
          <button 
            onClick={() => {
              (window as any).playClickSound?.();
              navigateTo('home');
            }}
            onMouseEnter={() => (window as any).playHoverSound?.()}
            className="p-2 border border-green-400 bg-black/50 backdrop-blur-sm hover:bg-green-400/20 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 text-green-400" />
          </button>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-green-400 mb-2" style={{ fontFamily: 'serif', textShadow: '0 0 20px #00ff41' }}>
              RED_TEAM_FRAMEWORKS.dll
            </h1>
            <div className="flex items-center space-x-4 text-sm font-mono text-green-400/70">
              <span>[INITIALIZING_ATTACK_VECTORS...]</span>
              <div className="animate-pulse">●●●</div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {[
            {
              name: 'PHANTOM-STRIKE',
              description: 'Advanced persistent threat simulation framework with AI-powered evasion techniques',
              features: ['Multi-vector attacks', 'AI evasion', 'Real-time C2', 'Custom payloads'],
              version: 'v3.2.1',
              downloads: '15.2K'
            },
            {
              name: 'GHOST-NET',
              description: 'Distributed network reconnaissance and mapping framework for large-scale assessments',
              features: ['Distributed scanning', 'Stealth mode', 'Auto-reporting', 'API integration'],
              version: 'v2.8.4',
              downloads: '8.7K'
            },
            {
              name: 'SHADOW-WALKER',
              description: 'Post-exploitation framework focused on persistence and lateral movement',
              features: ['Living off the land', 'Memory injection', 'Process hollowing', 'Fileless attacks'],
              version: 'v1.9.3',
              downloads: '12.1K'
            }
          ].map((framework, index) => (
            <div
              key={framework.name}
              className="border border-green-400/30 bg-black/30 backdrop-blur-sm p-8 hover:border-green-400 hover:bg-green-400/10 transition-all duration-300 cursor-pointer"
              style={{ 
                animation: `fadeInUp 0.8s ease forwards`,
                animationDelay: `${index * 0.2}s`,
                opacity: 0
              }}
              onMouseEnter={() => (window as any).playHoverSound?.()}
            >
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex items-center space-x-4 mb-4">
                    <h2 className="text-2xl font-bold text-green-400 font-mono">{framework.name}</h2>
                    <span className="px-3 py-1 bg-green-400/20 text-green-400 text-sm font-mono">{framework.version}</span>
                  </div>
                  <p className="text-green-300/80 mb-6 leading-relaxed">{framework.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {framework.features.map(feature => (
                      <div key={feature} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-green-400 text-sm font-mono">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-center p-4 border border-green-400/30 bg-green-400/5">
                    <div className="text-2xl font-bold text-green-400 font-mono">{framework.downloads}</div>
                    <div className="text-green-400/70 text-sm">Downloads</div>
                  </div>
                  <div className="space-y-2">
                    <button 
                      className="w-full px-4 py-2 bg-green-400 text-black font-bold hover:bg-yellow-400 transition-colors"
                      onMouseEnter={() => (window as any).playHoverSound?.()}
                      onClick={() => (window as any).playClickSound?.()}
                    >
                      DOWNLOAD
                    </button>
                    <button 
                      className="w-full px-4 py-2 border border-green-400 text-green-400 hover:bg-green-400/10 transition-colors"
                      onMouseEnter={() => (window as any).playHoverSound?.()}
                      onClick={() => (window as any).playClickSound?.()}
                    >
                      DOCUMENTATION
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );

  const renderContactPage = () => (
    <main className="flex-1 px-6 lg:px-8 py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-green-400/20 font-mono text-xs animate-pulse">
          {Array(50).fill('HACK ').join('')}
        </div>
        <div className="absolute bottom-10 right-10 text-red-400/20 font-mono text-xs animate-pulse">
          {Array(50).fill('ROOT ').join('')}
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {/* Enhanced header with terminal-style elements */}
        <div className="flex items-center space-x-4 mb-8">
          <button 
            onClick={() => {
              (window as any).playClickSound?.();
              navigateTo('home');
            }}
            onMouseEnter={() => (window as any).playHoverSound?.()}
            className="p-2 border border-green-400 bg-black/50 backdrop-blur-sm hover:bg-green-400/20 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 text-green-400" />
          </button>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-green-400 mb-2" style={{ fontFamily: 'serif', textShadow: '0 0 20px #00ff41' }}>
              SECURE_CONTACT.exe
            </h1>
            <div className="flex items-center space-x-4 text-sm font-mono text-green-400/70">
              <span>[ESTABLISHING_ENCRYPTED_CHANNEL...]</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
            <div className="border border-green-400/30 bg-black/30 backdrop-blur-sm p-6 relative overflow-hidden">
              {/* Terminal-style header */}
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-green-400/20">
                <h2 className="text-2xl font-bold text-green-400 font-mono flex items-center">
                  <Terminal className="w-5 h-5 mr-2 animate-pulse" />
                  ENCRYPTED_MESSAGE.bat
                </h2>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
              
              {/* Animated scan line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-green-400 text-sm font-mono mb-2 flex items-center">
                    <span className="mr-2">></span>
                    IDENTITY_VERIFICATION:
                    <span className="ml-2 text-red-400 animate-blink">_</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full bg-black/70 border border-green-400/30 text-green-400 px-4 py-3 focus:border-green-400 focus:outline-none transition-all duration-300 font-mono focus:bg-green-400/5 focus:shadow-lg focus:shadow-green-400/20"
                    placeholder="[ENTER_YOUR_HANDLE]"
                    onFocus={() => (window as any).playHoverSound?.()}
                  />
                </div>
                <div>
                  <label className="block text-green-400 text-sm font-mono mb-2 flex items-center">
                    <span className="mr-2">></span>
                    SECURE_CHANNEL_ENDPOINT:
                    <span className="ml-2 text-red-400 animate-blink">_</span>
                  </label>
                  <input 
                    type="email" 
                    className="w-full bg-black/70 border border-green-400/30 text-green-400 px-4 py-3 focus:border-green-400 focus:outline-none transition-all duration-300 font-mono focus:bg-green-400/5 focus:shadow-lg focus:shadow-green-400/20"
                    placeholder="[ENCRYPTED_EMAIL@DARKWEB.onion]"
                    onFocus={() => (window as any).playHoverSound?.()}
                  />
                </div>
                <div>
                  <label className="block text-green-400 text-sm font-mono mb-2 flex items-center">
                    <span className="mr-2">></span>
                    MISSION_TYPE:
                    <span className="ml-2 text-red-400 animate-blink">_</span>
                  </label>
                  <select 
                    className="w-full bg-black/70 border border-green-400/30 text-green-400 px-4 py-3 focus:border-green-400 focus:outline-none transition-all duration-300 font-mono focus:bg-green-400/5 focus:shadow-lg focus:shadow-green-400/20"
                    onFocus={() => (window as any).playHoverSound?.()}
                  >
                    <option>[SELECT_MISSION_TYPE]</option>
                    <option>RED_TEAM_ENGAGEMENT</option>
                    <option>PENETRATION_TESTING</option>
                    <option>ZERO_DAY_CONSULTATION</option>
                    <option>EXPLOIT_DEVELOPMENT</option>
                    <option>CLASSIFIED_OPERATION</option>
                  </select>
                </div>
                <div>
                  <label className="block text-green-400 text-sm font-mono mb-2 flex items-center">
                    <span className="mr-2">></span>
                    ENCRYPTED_PAYLOAD:
                    <span className="ml-2 text-red-400 animate-blink">_</span>
                  </label>
                  <textarea 
                    rows={6}
                    className="w-full bg-black/70 border border-green-400/30 text-green-400 px-4 py-3 focus:border-green-400 focus:outline-none transition-all duration-300 font-mono resize-none focus:bg-green-400/5 focus:shadow-lg focus:shadow-green-400/20"
                    placeholder="[ENTER_ENCRYPTED_MESSAGE_HERE]

WARNING: ALL COMMUNICATIONS MONITORED
USE PGP ENCRYPTION FOR SENSITIVE DATA
NO ILLEGAL ACTIVITIES DISCUSSED"
                    onFocus={() => (window as any).playHoverSound?.()}
                  ></textarea>
                </div>
                
                {/* Security verification */}
                <div className="border border-red-400/30 bg-red-400/5 p-4 rounded">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-4 h-4 text-red-400" />
                    <span className="text-red-400 font-mono text-sm">SECURITY_VERIFICATION</span>
                  </div>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="form-checkbox bg-black border-red-400 text-red-400" />
                    <span className="text-red-400/80 text-xs font-mono">
                      I CONFIRM THIS IS NOT A HONEYPOT OPERATION
                    </span>
                  </label>
                </div>
                
                <button 
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-green-400 to-green-500 text-black font-bold hover:from-red-400 hover:to-red-500 transition-all duration-300 transform hover:scale-105 font-mono text-lg relative overflow-hidden"
                  onMouseEnter={() => (window as any).playHoverSound?.()}
                  onClick={(e) => {
                    e.preventDefault();
                    (window as any).playClickSound?.();
                  }}
                >
                  <span className="relative z-10">TRANSMIT_MESSAGE.exe</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="border border-green-400/30 bg-black/30 backdrop-blur-sm p-6 relative">
              {/* Terminal header */}
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-green-400/20">
                <h2 className="text-2xl font-bold text-green-400 font-mono flex items-center">
                  <Code className="w-5 h-5 mr-2 animate-pulse" />
                  CONTACT_PROTOCOLS.dll
                </h2>
                <div className="text-green-400/70 font-mono text-xs">
                  [ONLINE]
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 border border-green-400/20 bg-black/20 hover:bg-green-400/5 transition-all duration-300">
                  <Mail className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-green-400 font-mono text-sm">SECURE_EMAIL_GATEWAY:</div>
                    <div className="text-green-300 font-mono">ghost@redteamdev.onion</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-green-400/20 bg-black/20 hover:bg-green-400/5 transition-all duration-300">
                  <Phone className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-green-400 font-mono text-sm">ENCRYPTED_VOICE_CHANNEL:</div>
                    <div className="text-green-300 font-mono">+1 (555) GHOST-01</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-green-400/20 bg-black/20 hover:bg-green-400/5 transition-all duration-300">
                  <MapPin className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-green-400 font-mono text-sm">PHYSICAL_COORDINATES:</div>
                    <div className="text-green-300 font-mono">[CLASSIFIED] - Deep Web</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-red-400/30 bg-black/30 backdrop-blur-sm p-6 relative">
              <div className="absolute top-2 right-2 text-red-400 font-mono text-xs animate-pulse">
                [CLASSIFIED]
              </div>
              <h3 className="text-xl font-bold text-red-400 mb-4 font-mono flex items-center">
                <Shield className="w-4 h-4 mr-2 animate-pulse" />
                SECURITY_PROTOCOLS.sys
              </h3>
              <div className="space-y-3 text-green-300/80 text-sm leading-relaxed">
                <p className="flex items-center"><span className="text-red-400 mr-2">●</span>ALL COMMUNICATIONS ENCRYPTED WITH AES-256</p>
                <p className="flex items-center"><span className="text-yellow-400 mr-2">●</span>RESPONSE TIME: 12-24 HOURS [LEGITIMATE ONLY]</p>
                <p className="flex items-center"><span className="text-green-400 mr-2">●</span>PGP KEY: 0xDEADBEEF [REQUEST VIA SECURE CHANNEL]</p>
                <p className="flex items-center"><span className="text-red-400 mr-2">●</span>NO ILLEGAL ACTIVITIES - MONITORED BY AI</p>
                <p className="flex items-center"><span className="text-purple-400 mr-2">●</span>HONEYPOT DETECTION: ACTIVE</p>
              </div>
            </div>

            <div className="border border-green-400/30 bg-black/30 backdrop-blur-sm p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 animate-pulse"></div>
              <h3 className="text-xl font-bold text-green-400 mb-4 font-mono flex items-center">
                <Zap className="w-4 h-4 mr-2 animate-pulse" />
                AVAILABLE_SERVICES.bat
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'PENETRATION_TESTING.exe', status: 'ACTIVE' },
                  { name: 'RED_TEAM_OPERATIONS.dll', status: 'ACTIVE' },
                  { name: 'ZERO_DAY_RESEARCH.sys', status: 'CLASSIFIED' },
                  { name: 'EXPLOIT_DEVELOPMENT.bat', status: 'ACTIVE' },
                  { name: 'SOCIAL_ENGINEERING.py', status: 'BETA' },
                  { name: 'INCIDENT_RESPONSE.sh', status: 'ON_DEMAND' }
                ].map((service, index) => (
                  <div key={service.name} className="flex items-center justify-between space-x-2 p-2 border border-green-400/20 bg-black/20 hover:bg-green-400/5 transition-all duration-300">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full animate-pulse ${
                        service.status === 'ACTIVE' ? 'bg-green-400' :
                        service.status === 'CLASSIFIED' ? 'bg-red-400' :
                        service.status === 'BETA' ? 'bg-yellow-400' :
                        'bg-blue-400'
                      }`}></div>
                      <span className="text-green-400 text-sm font-mono">{service.name}</span>
                    </div>
                    <span className={`text-xs font-mono px-2 py-1 rounded ${
                      service.status === 'ACTIVE' ? 'bg-green-400/20 text-green-400' :
                      service.status === 'CLASSIFIED' ? 'bg-red-400/20 text-red-400' :
                      service.status === 'BETA' ? 'bg-yellow-400/20 text-yellow-400' :
                      'bg-blue-400/20 text-blue-400'
                    }`}>
                      {service.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'exploits':
        return renderExploitsPage();
      case 'frameworks':
        return renderFrameworksPage();
      case 'contact':
        return renderContactPage();
      default:
        return renderHomePage();
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden cursor-none">
      {/* Sound Manager */}
      <SoundManager currentPage={currentPage} />

      {/* Matrix Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(135deg, #000000 0%, #001100 100%)' }}
      />

      {/* Custom Cursor */}
      <div 
        className="fixed w-4 h-4 bg-green-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: `${mousePos.x * 10 + 50}%`,
          top: `${mousePos.y * 10 + 50}%`,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 20px #00ff41, 0 0 40px #00ff41'
        }}
      />

      {/* Cursor Trail */}
      {cursorTrail.map((trail, index) => (
        <div
          key={trail.id}
          className="fixed w-2 h-2 bg-green-400 rounded-full pointer-events-none z-40"
          style={{
            left: trail.x,
            top: trail.y,
            transform: 'translate(-50%, -50%)',
            opacity: (index + 1) / cursorTrail.length * 0.5,
            animation: `fadeOut 1s ease-out forwards`
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 lg:p-8">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => {
                  (window as any).playClickSound?.();
                  navigateTo('home');
                }}
                onMouseEnter={() => (window as any).playHoverSound?.()}
                className="p-2 border border-green-400 bg-black/50 backdrop-blur-sm hover:bg-green-400/20 transition-all duration-300"
              >
                <Code className="w-6 h-6 text-green-400" />
              </button>
              <span 
                className="text-xl font-bold text-green-400 tracking-wider animate-pulse cursor-pointer"
                onClick={() => {
                  (window as any).playClickSound?.();
                  navigateTo('home');
                }}
                onMouseEnter={() => (window as any).playHoverSound?.()}
                style={{ 
                  fontFamily: 'serif',
                  textShadow: '0 0 10px #00ff41',
                  animation: 'shake 2s infinite alternate'
                }}
              >
                RED_TEAM_DEV
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              {[
                { key: 'exploits', label: 'EXPLOITS' },
                { key: 'frameworks', label: 'FRAMEWORKS' },
                { key: 'contact', label: 'CONTACT' }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    (window as any).playClickSound?.();
                    navigateTo(item.key as Page);
                  }}
                  onMouseEnter={() => (window as any).playHoverSound?.()}
                  className={`font-mono text-sm tracking-wider transition-all duration-300 ${
                    currentPage === item.key 
                      ? 'text-yellow-400 glow' 
                      : 'text-green-400 hover:text-yellow-400'
                  }`}
                  style={{ textShadow: '0 0 5px currentColor' }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </header>

        {/* Page Content */}
        {renderCurrentPage()}

        {/* Footer */}
        <footer className="p-6 text-center">
          <div className="flex justify-center space-x-8 text-green-400/70 font-mono text-sm">
            <span>SYSTEM_STATUS: ONLINE</span>
            <span>THREAT_LEVEL: ELEVATED</span>
            <span>LAST_HACK: {new Date().toLocaleTimeString()}</span>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px) rotate(-0.5deg); }
          50% { transform: translateX(2px) rotate(0.5deg); }
          75% { transform: translateX(-1px) rotate(-0.25deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes fadeOut {
          to { opacity: 0; transform: translate(-50%, -50%) scale(0); }
        }

        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scanLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .glow {
          text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
}

export default App;