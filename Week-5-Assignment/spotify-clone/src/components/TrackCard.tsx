import React from 'react';
import { Play, Pause, Heart, MoreHorizontal } from 'lucide-react';
import { Track } from '../types';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { playTrack, pauseTrack, resumeTrack } from '../store/slices/playerSlice';

interface TrackCardProps {
  track: Track;
  tracks: Track[];
  index: number;
  showIndex?: boolean;
  onAddToPlaylist?: (track: Track) => void;
}

const TrackCard: React.FC<TrackCardProps> = ({
  track,
  tracks,
  index,
  showIndex = false,
  onAddToPlaylist,
}) => {
  const dispatch = useAppDispatch();
  const { isPlaying, currentTrack } = useAppSelector((state) => state.player);

  const isCurrentTrack = currentTrack?.key === track.key;
  const isTrackPlaying = isCurrentTrack && isPlaying;

  const handlePlayPause = () => {
    if (isCurrentTrack) {
      if (isPlaying) {
        dispatch(pauseTrack());
      } else {
        dispatch(resumeTrack());
      }
    } else {
      dispatch(playTrack({ track, queue: tracks }));
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="group flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors duration-200">
      {showIndex && (
        <div className="w-8 text-gray-400 text-sm font-medium">
          {!isTrackPlaying && <span className="group-hover:hidden">{index + 1}</span>}
          <button
            onClick={handlePlayPause}
            className={`w-8 h-8 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-400 transition-colors ${
              !isTrackPlaying ? 'hidden group-hover:flex' : 'flex'
            }`}
          >
            {isTrackPlaying ? (
              <Pause className="w-4 h-4 text-black" />
            ) : (
              <Play className="w-4 h-4 text-black ml-0.5" />
            )}
          </button>
        </div>
      )}

      <div className="flex-shrink-0">
        <div className="relative group/image">
          <img
            src={track.images?.coverart || track.images?.coverarthq || 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400'}
            alt={track.title}
            className="w-12 h-12 rounded object-cover"
          />
          {!showIndex && (
            <button
              onClick={handlePlayPause}
              className="absolute inset-0 bg-black/60 rounded opacity-0 group-hover/image:opacity-100 transition-opacity duration-200 flex items-center justify-center"
            >
              {isTrackPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" />
              )}
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h4 className={`font-medium truncate ${isCurrentTrack ? 'text-green-500' : 'text-white'}`}>
          {track.title}
        </h4>
        <p className="text-sm text-gray-400 truncate">{track.artist}</p>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
          <Heart className="w-5 h-5" />
        </button>
        
        {track.duration && (
          <span className="text-sm text-gray-400 min-w-0">
            {formatDuration(track.duration)}
          </span>
        )}

        <button
          onClick={() => onAddToPlaylist?.(track)}
          className="text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TrackCard;