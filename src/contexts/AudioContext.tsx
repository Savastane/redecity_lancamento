import React, { createContext, useContext, useState, useEffect } from 'react';

interface AudioContextType {
  globalMuted: boolean;
  setGlobalMuted: (muted: boolean) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  // Iniciar com mute desligado
  const [globalMuted, setGlobalMuted] = useState(false);

  // Simular interação inicial para garantir autoplay
  useEffect(() => {
    const simulateInitialInteraction = async () => {
      // Pequeno delay para garantir que os componentes foram montados
      await new Promise(resolve => setTimeout(resolve, 100));
      setGlobalMuted(false);
    };

    simulateInitialInteraction();
  }, []);

  return (
    <AudioContext.Provider value={{ globalMuted, setGlobalMuted }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
