import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music2 } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";

interface MiniMusicPlayerProps {
  audioSrc: string;
  initialVolume?: number; // optional prop for volume
}

const MiniMusicPlayer: React.FC<MiniMusicPlayerProps> = ({ audioSrc, initialVolume = 0.5 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { theme } = useTheme();

  // Set initial volume when component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = initialVolume;
    }
  }, [initialVolume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.log('Play failed:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
      />
      
      <button
        onClick={togglePlay}
        className={`group p-4 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300 hover:scale-110 ${
          theme === "light" 
            ? "bg-white/90 text-gray-800 border-gray-300 hover:bg-white hover:shadow-xl" 
            : "bg-gray-900/90 text-white border-gray-600 hover:bg-gray-800 hover:shadow-xl"
        } ${isPlaying ? 'animate-pulse ring-2 ring-blue-500/50' : ''}`}
        title={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        {isPlaying ? (
          <Pause size={24} className="text-blue-500" />
        ) : (
          <Music2 size={24} />
        )}
        
        {/* Tooltip */}
        <div className={`absolute bottom-full mb-2 right-0 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
          theme === "light" 
            ? "bg-gray-800 text-white" 
            : "bg-white text-gray-800"
        }`}>
          {isPlaying ? 'Pause Music' : 'Play Music'}
        </div>
      </button>
    </div>
  );
};

export default MiniMusicPlayer;
