import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, SkipBack, SkipForward } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";

interface MusicPlayerProps {
  audioSrc: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { theme } = useTheme();

  // Auto-play ketika komponen dimount (opsional)
  useEffect(() => {
    // Hanya auto-play jika user sudah berinteraksi dengan website
    const handleUserInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Auto-play mungkin diblokir browser
          console.log('Auto-play prevented by browser');
        });
      }
      document.removeEventListener('click', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    return () => document.removeEventListener('click', handleUserInteraction);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
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

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10; // Skip 10 detik ke depan
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10; // Kembali 10 detik
    }
  };

  if (!showPlayer) {
    return (
      <button
        onClick={() => setShowPlayer(true)}
        className={`fixed bottom-4 right-4 z-50 p-3 rounded-full backdrop-blur-md border shadow-lg transition-all hover:scale-110 ${
          theme === "light" 
            ? "bg-white/80 text-gray-800 border-gray-300 hover:bg-white" 
            : "bg-black/80 text-white border-gray-600 hover:bg-black"
        }`}
      >
        <Music size={20} />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 backdrop-blur-md rounded-2xl p-4 shadow-lg border transition-all duration-300 ${
      theme === "light" 
        ? "bg-white/80 border-gray-300 text-gray-800" 
        : "bg-black/80 border-gray-600 text-white"
    }`}>
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        volume={volume}
        onEnded={() => setIsPlaying(false)}
      />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Music size={16} />
          <span className="text-sm font-medium">Background Music</span>
        </div>
        <button
          onClick={() => setShowPlayer(false)}
          className="text-xs opacity-70 hover:opacity-100 transition-opacity"
        >
          Minimize
        </button>
      </div>
      
      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Skip Backward */}
        <button
          onClick={skipBackward}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
          title="Skip backward 10s"
        >
          <SkipBack size={16} />
        </button>

        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          className={`p-3 rounded-full transition-all ${
            isPlaying 
              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" 
              : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
          }`}
        >
          {isPlaying ? (
            <Pause size={20} />
          ) : (
            <Play size={20} />
          )}
        </button>

        {/* Skip Forward */}
        <button
          onClick={skipForward}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
          title="Skip forward 10s"
        >
          <SkipForward size={16} />
        </button>

        {/* Volume Controls */}
        <div className="flex items-center gap-2 ml-2">
          <button
            onClick={toggleMute}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX size={16} />
            ) : (
              <Volume2 size={16} />
            )}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 accent-blue-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Status */}
      <div className="mt-2 text-xs opacity-70 text-center">
        {isPlaying ? "Now Playing" : "Paused"}
      </div>
    </div>
  );
};

export default MusicPlayer;