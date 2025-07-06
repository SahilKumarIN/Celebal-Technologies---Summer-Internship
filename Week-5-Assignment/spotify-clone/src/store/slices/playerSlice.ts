import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track, PlayerState } from '../../types';

const initialState: PlayerState = {
  isPlaying: false,
  currentTrack: null,
  queue: [],
  currentIndex: 0,
  volume: 0.8,
  duration: 0,
  currentTime: 0,
  isShuffled: false,
  repeatMode: 'none',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playTrack: (state, action: PayloadAction<{ track: Track; queue: Track[] }>) => {
      state.currentTrack = action.payload.track;
      state.queue = action.payload.queue;
      state.currentIndex = action.payload.queue.findIndex(t => t.key === action.payload.track.key);
      state.isPlaying = true;
    },
    pauseTrack: (state) => {
      state.isPlaying = false;
    },
    resumeTrack: (state) => {
      state.isPlaying = true;
    },
    nextTrack: (state) => {
      if (state.queue.length > 0) {
        let nextIndex = state.currentIndex + 1;
        if (nextIndex >= state.queue.length) {
          nextIndex = state.repeatMode === 'all' ? 0 : state.currentIndex;
        }
        if (nextIndex !== state.currentIndex) {
          state.currentIndex = nextIndex;
          state.currentTrack = state.queue[nextIndex];
          state.isPlaying = true;
        }
      }
    },
    previousTrack: (state) => {
      if (state.queue.length > 0) {
        let prevIndex = state.currentIndex - 1;
        if (prevIndex < 0) {
          prevIndex = state.repeatMode === 'all' ? state.queue.length - 1 : 0;
        }
        state.currentIndex = prevIndex;
        state.currentTrack = state.queue[prevIndex];
        state.isPlaying = true;
      }
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = Math.max(0, Math.min(1, action.payload));
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffled = !state.isShuffled;
    },
    setRepeatMode: (state, action: PayloadAction<'none' | 'one' | 'all'>) => {
      state.repeatMode = action.payload;
    },
    clearQueue: (state) => {
      state.queue = [];
      state.currentTrack = null;
      state.currentIndex = 0;
      state.isPlaying = false;
    },
    addToQueue: (state, action: PayloadAction<Track>) => {
      state.queue.push(action.payload);
    },
    removeFromQueue: (state, action: PayloadAction<string>) => {
      const index = state.queue.findIndex(track => track.key === action.payload);
      if (index !== -1) {
        state.queue.splice(index, 1);
        if (index <= state.currentIndex) {
          state.currentIndex = Math.max(0, state.currentIndex - 1);
        }
      }
    },
  },
});

export const {
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
  clearQueue,
  addToQueue,
  removeFromQueue,
} = playerSlice.actions;

export default playerSlice.reducer;