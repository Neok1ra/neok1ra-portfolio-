import { useEffect, useRef } from 'react';

interface SoundManagerProps {
  currentPage: string;
}

export const SoundManager: React.FC<SoundManagerProps> = ({ currentPage }) => {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize Web Audio API
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, []);

  const playBeep = (frequency: number = 800, duration: number = 100, volume: number = 0.1) => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
    oscillator.type = 'square';

    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContextRef.current.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration / 1000);

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
  };

  const playHackerKeyboard = () => {
    const frequencies = [1200, 1400, 1100, 1300, 1000];
    const freq = frequencies[Math.floor(Math.random() * frequencies.length)];
    playBeep(freq, 40, 0.03);
  };

  const playTerminalBeep = () => {
    playBeep(800, 120, 0.06);
    setTimeout(() => playBeep(1000, 80, 0.04), 60);
  };

  const playAccessGranted = () => {
    playBeep(600, 100, 0.08);
    setTimeout(() => playBeep(800, 100, 0.06), 100);
    setTimeout(() => playBeep(1200, 150, 0.05), 200);
  };

  const playSystemAlert = () => {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => playBeep(1500, 50, 0.04), i * 100);
    }
  };

  const playDataTransfer = () => {
    const baseFreq = 400;
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        playBeep(baseFreq + (i * 50), 30, 0.02);
      }, i * 25);
    }
  };

  const playNetworkPing = () => {
    playBeep(1000, 60, 0.05);
    setTimeout(() => playBeep(1200, 40, 0.03), 80);
  };

  const playHoverSound = () => {
    playNetworkPing();
  };

  const playClickSound = () => {
    playAccessGranted();
  };

  const playPageTransition = () => {
    playDataTransfer();
  };

  const playTypingSound = () => {
    playHackerKeyboard();
  };

  const playSystemSound = () => {
    playSystemAlert();
  };

  const playTerminalSound = () => {
    playTerminalBeep();
  };

  // Expose sound functions globally
  useEffect(() => {
    (window as any).playHoverSound = playHoverSound;
    (window as any).playClickSound = playClickSound;
    (window as any).playPageTransition = playPageTransition;
    (window as any).playTypingSound = playTypingSound;
    (window as any).playSystemSound = playSystemSound;
    (window as any).playTerminalSound = playTerminalSound;

    return () => {
      delete (window as any).playHoverSound;
      delete (window as any).playClickSound;
      delete (window as any).playPageTransition;
      delete (window as any).playTypingSound;
      delete (window as any).playSystemSound;
      delete (window as any).playTerminalSound;
    };
  }, []);

  // Play ambient hacker sounds
  useEffect(() => {
    const hackerAmbient = setInterval(() => {
      const rand = Math.random();
      if (rand < 0.05) {
        playHackerKeyboard();
      } else if (rand < 0.08) {
        playNetworkPing();
      } else if (rand < 0.1) {
        playTerminalBeep();
      }
    }, 1500);

    return () => clearInterval(hackerAmbient);
  }, []);

  // Page-specific ambient sounds
  useEffect(() => {
    let pageInterval: NodeJS.Timeout;

    if (currentPage === 'home') {
      pageInterval = setInterval(() => {
        if (Math.random() < 0.15) {
          playDataTransfer();
        }
      }, 3000);
    }

    return () => {
      if (pageInterval) clearInterval(pageInterval);
    };
  }, [currentPage]);

  return null;
};