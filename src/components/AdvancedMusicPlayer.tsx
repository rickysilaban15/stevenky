import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, ListMusic, X } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";

interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
}

interface AdvancedMusicPlayerProps {
  tracks?: Track[];
}

const defaultTracks: Track[] = [
  {
    id: 1,
    title: "Lofi Study",
    artist: "Chill Vibes",
    src: "/music/lofi-study.mp3"
  },
  {
    id: 2,
    title: "Ambient Space", 
    artist: "Cosmic Sounds",
    src: "/music/ambient-space.mp3"
  },
  {
    id: 3,
    title: "Background Music",
    artist: "Your Brand",
    src: "/music/background-music.mp3"
  }
];

const AdvancedMusicPlayer: React.FC<AdvancedMusicPlayerProps> = ({ 
  tracks = defaultTracks 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const { theme } = useTheme();

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
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

  const playTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current?.play().catch(console.error);
    }, 100);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onEnded={nextTrack}
        onLoadedMetadata={() => setProgress(0)}
        volume={volume}
        muted={isMuted}
      />
      
      {/* Compact Player */}
      <div className={`fixed bottom-4 right-4 z-50 backdrop-blur-md rounded-2xl p-4 shadow-lg border transition-all duration-300 ${
        theme === "light" 
          ? "bg-white/90 border-gray-300 text-gray-800" 
          : "bg-black/90 border-gray-600 text-white"
      } ${showPlaylist ? 'w-80' : 'w-64'}`}>
        
        {/* Main Player */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Music size={16} className="flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium truncate">{currentTrack.title}</div>
              <div className="text-xs opacity-70 truncate">{currentTrack.artist}</div>
            </div>
          </div>
          
          <button
            onClick={() => setShowPlaylist(!showPlaylist)}
            className={`p-2 rounded-full transition-colors flex-shrink-0 ${
              showPlaylist 
                ? "bg-blue-500/20 text-blue-400" 
                : "hover:bg-white/20"
            }`}
          >
            <ListMusic size={16} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-500/30 rounded-full mb-3">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={prevTrack}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              title="Previous track"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
            </button>
            
            <button
              onClick={togglePlay}
              className={`p-2 rounded-full transition-all ${
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
            
            <button
              onClick={nextTrack}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              title="Next track"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
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
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 accent-blue-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Playlist */}
        {showPlaylist && (
          <div className="mt-3 border-t pt-3 max-h-40 overflow-y-auto">
            <div className="space-y-1">
              {tracks.map((track, index) => (
                <div
                  key={track.id}
                  onClick={() => playTrack(index)}
                  className={`p-2 rounded-lg cursor-pointer transition-colors text-sm ${
                    index === currentTrackIndex
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'hover:bg-white/20'
                  }`}
                >
                  <div className="font-medium truncate">{track.title}</div>
                  <div className="text-xs opacity-70 truncate">{track.artist}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdvancedMusicPlayer;