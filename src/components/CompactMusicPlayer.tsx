import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";

interface CompactMusicPlayerProps {
  audioSrc: string;
}

const CompactMusicPlayer: React.FC<CompactMusicPlayerProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { theme } = useTheme();

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

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Auto close controls ketika klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.music-player-container')) {
        setShowControls(false);
      }
    };

    if (showControls) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showControls]);

  return (
    <div className="music-player-container fixed bottom-6 right-6 z-50">
      {/* Main Compact Button */}
      <button
        onClick={() => setShowControls(!showControls)}
        className={`p-4 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300 hover:scale-110 ${
          theme === "light" 
            ? "bg-white/90 text-gray-800 border-gray-300 hover:bg-white hover:shadow-xl" 
            : "bg-gray-900/90 text-white border-gray-600 hover:bg-gray-800 hover:shadow-xl"
        } ${isPlaying ? 'animate-pulse' : ''}`}
      >
        <Music size={24} />
      </button>

      {/* Expanded Controls */}
      {showControls && (
        <div className={`absolute bottom-16 right-0 backdrop-blur-md rounded-2xl p-4 shadow-2xl border min-w-48 space-y-3 animate-in fade-in-0 zoom-in-95 ${
          theme === "light" 
            ? "bg-white/95 border-gray-300 text-gray-800" 
            : "bg-gray-900/95 border-gray-600 text-white"
        }`}>
          {/* Track Info */}
          <div className="text-center">
            <div className="text-sm font-semibold">Background Music</div>
            <div className="text-xs opacity-70 mt-1">
              {isPlaying ? 'Now Playing' : 'Paused'}
            </div>
          </div>

          <audio
            ref={audioRef}
            src={audioSrc}
            loop
            volume={volume}
          />

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              isPlaying 
                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" 
                : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
            }`}
          >
            {isPlaying ? (
              <>
                <Pause size={18} />
                Pause
              </>
            ) : (
              <>
                <Play size={18} />
                Play
              </>
            )}
          </button>

          {/* Volume Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Volume</span>
              <button
                onClick={toggleMute}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-2 bg-gray-500/30 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between text-xs opacity-70 pt-2 border-t border-gray-500/30">
            <span>Vol: {Math.round(volume * 100)}%</span>
            <span>{isMuted ? 'Muted' : 'Unmuted'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompactMusicPlayer;