import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, ListMusic, SkipBack, SkipForward } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";

interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
}

interface PlaylistMusicPlayerProps {
  tracks?: Track[];
}

const defaultTracks: Track[] = [
  {
    id: 1,
    title: "Birds",
    artist: "Turnstile",
    src: "/music/birds.mp3"
  },
  {
    id: 2,
    title: "Faint",
    artist: "Linkin Park",
    src: "/music/faint.mp3"
  },
  {
    id: 3,
    title: "Casualty",
    artist: "Linkin Park",
    src: "/music/casualty.mp3"
  },
  {
    id: 4,
    title: "Paranoid",
    artist: "Black Sabbath",
    src: "/music/paranoid.mp3"
  },
  {
    id: 5,
    title: "Psychosocial",
    artist: "Slipknot",
    src: "/music/psychosocial.mp3"
  }
];

const PlaylistMusicPlayer: React.FC<PlaylistMusicPlayerProps> = ({ 
  tracks = defaultTracks 
}) => {
  // State dengan localStorage persistence
  const [isPlaying, setIsPlaying] = useState(() => {
    const saved = localStorage.getItem('musicPlayer-state');
    return saved ? JSON.parse(saved).isPlaying : false;
  });

  const [currentTrackIndex, setCurrentTrackIndex] = useState(() => {
    const saved = localStorage.getItem('musicPlayer-state');
    return saved ? JSON.parse(saved).currentTrackIndex : 0;
  });

  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('musicPlayer-state');
    return saved ? JSON.parse(saved).volume : 0.5;
  });

  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('musicPlayer-state');
    return saved ? JSON.parse(saved).isMuted : false;
  });

  const [showPlaylist, setShowPlaylist] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const { theme } = useTheme();

  const currentTrack = tracks[currentTrackIndex];

  // Save state ke localStorage
  useEffect(() => {
    const state = {
      isPlaying,
      currentTrackIndex,
      volume,
      isMuted
    };
    localStorage.setItem('musicPlayer-state', JSON.stringify(state));
  }, [isPlaying, currentTrackIndex, volume, isMuted]);

  // Auto-play ketika pindah halaman
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log('Auto-play prevented:', error);
        setIsPlaying(false);
      });
    }
  }, [currentTrackIndex, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

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

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  const formatTime = (time: number) => {
    if (!time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Auto close playlist ketika klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.music-player-container')) {
        setShowPlaylist(false);
      }
    };

    if (showPlaylist) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showPlaylist]);

  return (
    <div className="music-player-container fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onEnded={nextTrack}
        volume={volume}
        muted={isMuted}
      />
      
      {/* Main Player Button */}
      <button
        onClick={() => setShowPlaylist(!showPlaylist)}
        className={`p-4 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300 hover:scale-110 group ${
          theme === "light" 
            ? "bg-white/90 text-gray-800 border-gray-300 hover:bg-white hover:shadow-xl" 
            : "bg-gray-900/90 text-white border-gray-600 hover:bg-gray-800 hover:shadow-xl"
        } ${isPlaying ? 'animate-pulse ring-2 ring-blue-500/50' : ''}`}
        title="Music Player"
      >
        <Music size={24} />
        
        {/* Now Playing Badge */}
        {isPlaying && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
        )}
      </button>

      {/* Expanded Player */}
      {showPlaylist && (
        <div className={`absolute bottom-20 right-0 backdrop-blur-md rounded-2xl p-4 shadow-2xl border w-80 space-y-4 animate-in fade-in-0 zoom-in-95 ${
          theme === "light" 
            ? "bg-white/95 border-gray-300 text-gray-800" 
            : "bg-gray-900/95 border-gray-600 text-white"
        }`}>
          
          {/* Current Track Info */}
          <div className="text-center">
            <div className="text-sm font-semibold truncate">{currentTrack.title}</div>
            <div className="text-xs opacity-70 truncate">{currentTrack.artist}</div>
            <div className="text-xs opacity-50 mt-1">
              {currentTrackIndex + 1} of {tracks.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div 
              className="w-full h-2 bg-gray-500/30 rounded-full cursor-pointer"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs opacity-70">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevTrack}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              title="Previous track"
            >
              <SkipBack size={18} />
            </button>
            
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
            
            <button
              onClick={nextTrack}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              title="Next track"
            >
              <SkipForward size={18} />
            </button>
          </div>

          {/* Volume Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Volume</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <span className="w-8 text-right">{Math.round(volume * 100)}%</span>
              </div>
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

          {/* Playlist */}
          <div className="border-t border-gray-500/30 pt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Playlist</span>
              <span className="text-xs opacity-70">{tracks.length} songs</span>
            </div>
            
            <div className="max-h-40 overflow-y-auto space-y-1">
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

          {/* Status */}
          <div className="text-center text-xs opacity-50 border-t border-gray-500/30 pt-2">
            {isPlaying ? 'Now Playing' : 'Paused'} • Vol: {Math.round(volume * 100)}%
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistMusicPlayer;