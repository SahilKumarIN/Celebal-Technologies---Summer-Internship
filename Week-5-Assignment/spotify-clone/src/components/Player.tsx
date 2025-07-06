import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Repeat1,
  Heart,
  List,
  Maximize2,
} from 'lucide-react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import {
  playTrack,
  pauseTrack,
  resumeTrack,
  nextTrack,
  previousTrack,
  setVolume,
  setCurrentTime,
  setDuration,
  toggleShuffle,
  setRepeatMode,
} from '../store/slices/playerSlice';

const Player: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isPlaying, currentTrack, volume, currentTime, duration, isShuffled, repeatMode } =
    useAppSelector((state) => state.player);
  
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (isPlaying) {
      dispatch(pauseTrack());
    } else {
      dispatch(resumeTrack());
    }
  };

  const handleNext = () => {
    dispatch(nextTrack());
  };

  const handlePrevious = () => {
    dispatch(previousTrack());
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    dispatch(setVolume(newVolume));
    setIsMuted(newVolume === 0);
  };

  const handleMute = () => {
    if (isMuted) {
      dispatch(setVolume(previousVolume));
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      dispatch(setVolume(0));
      setIsMuted(true);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    dispatch(setCurrentTime(newTime));
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleShuffle = () => {
    dispatch(toggleShuffle());
  };

  const handleRepeat = () => {
    const modes: ('none' | 'one' | 'all')[] = ['none', 'one', 'all'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    dispatch(setRepeatMode(modes[nextIndex]));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getRepeatIcon = () => {
    switch (repeatMode) {
      case 'one':
        return <Repeat1 className="w-5 h-5" />;
      case 'all':
        return <Repeat className="w-5 h-5" />;
      default:
        return <Repeat className="w-5 h-5" />;
    }
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="bg-gray-900 border-t border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Track Info */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <img
            src={currentTrack.images?.coverart || currentTrack.images?.coverarthq || 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400'}
            alt={currentTrack.title}
            className="w-14 h-14 rounded object-cover"
          />
          <div className="min-w-0">
            <h4 className="font-medium text-white truncate">{currentTrack.title}</h4>
            <p className="text-sm text-gray-400 truncate">{currentTrack.artist}</p>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
          <div className="flex items-center gap-4">
            <button
              onClick={handleShuffle}
              className={`transition-colors ${
                isShuffled ? 'text-green-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Shuffle className="w-5 h-5" />
            </button>
            
            <button
              onClick={handlePrevious}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            
            <button
              onClick={handlePlayPause}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-black" />
              ) : (
                <Play className="w-5 h-5 text-black ml-0.5" />
              )}
            </button>
            
            <button
              onClick={handleNext}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleRepeat}
              className={`transition-colors ${
                repeatMode !== 'none' ? 'text-green-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              {getRepeatIcon()}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-gray-400 min-w-0">
              {formatTime(currentTime)}
            </span>
            <input
              ref={progressRef}
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleProgressChange}
              className="flex-1 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #1db954 0%, #1db954 ${
                  (currentTime / (duration || 100)) * 100
                }%, #4b5563 ${(currentTime / (duration || 100)) * 100}%, #4b5563 100%)`
              }}
            />
            <span className="text-xs text-gray-400 min-w-0">
              {formatTime(duration || 0)}
            </span>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center gap-4 min-w-0 flex-1 justify-end">
          <button className="text-gray-400 hover:text-white transition-colors">
            <List className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleMute}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #1db954 0%, #1db954 ${
                  volume * 100
                }%, #4b5563 ${volume * 100}%, #4b5563 100%)`
              }}
            />
          </div>
          
          <button className="text-gray-400 hover:text-white transition-colors">
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.hub?.actions?.[0]?.uri || ''}
        onTimeUpdate={(e) => {
          const audio = e.target as HTMLAudioElement;
          dispatch(setCurrentTime(audio.currentTime));
        }}
        onLoadedMetadata={(e) => {
          const audio = e.target as HTMLAudioElement;
          dispatch(setDuration(audio.duration));
        }}
        onEnded={handleNext}
      />
    </div>
  );
};

export default Player;