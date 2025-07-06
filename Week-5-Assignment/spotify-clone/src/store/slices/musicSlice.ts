import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Track, MusicState, Genre, Playlist } from '../../types';
import { fetchTopCharts, searchTracks, fetchTracksByGenre } from '../../api/shazamCore';

const initialState: MusicState = {
  tracks: [],
  artists: [],
  albums: [],
  playlists: [],
  genres: [
    { id: 'pop', name: 'Pop', image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400', color: '#FF6B6B' },
    { id: 'rock', name: 'Rock', image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400', color: '#4ECDC4' },
    { id: 'hip-hop', name: 'Hip Hop', image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400', color: '#45B7D1' },
    { id: 'indie', name: 'Indie', image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=400', color: '#96CEB4' },
    { id: 'electronic', name: 'Electronic', image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400', color: '#FFEAA7' },
    { id: 'jazz', name: 'Jazz', image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400', color: '#DDA0DD' },
  ],
  searchResults: [],
  topCharts: [],
  loading: false,
  error: null,
  currentGenre: null,
};

// Async thunks
export const fetchTopChartsAsync = createAsyncThunk(
  'music/fetchTopCharts',
  async () => {
    const response = await fetchTopCharts();
    return response.tracks;
  }
);

export const searchTracksAsync = createAsyncThunk(
  'music/searchTracks',
  async (query: string) => {
    const response = await searchTracks(query);
    return response.tracks;
  }
);

export const fetchTracksByGenreAsync = createAsyncThunk(
  'music/fetchTracksByGenre',
  async (genre: string) => {
    const response = await fetchTracksByGenre(genre);
    return response.tracks;
  }
);

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setCurrentGenre: (state, action: PayloadAction<string | null>) => {
      state.currentGenre = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    createPlaylist: (state, action: PayloadAction<Omit<Playlist, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const newPlaylist: Playlist = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.playlists.push(newPlaylist);
    },
    addToPlaylist: (state, action: PayloadAction<{ playlistId: string; track: Track }>) => {
      const playlist = state.playlists.find(p => p.id === action.payload.playlistId);
      if (playlist) {
        playlist.tracks.push(action.payload.track);
        playlist.updatedAt = new Date().toISOString();
      }
    },
    removeFromPlaylist: (state, action: PayloadAction<{ playlistId: string; trackKey: string }>) => {
      const playlist = state.playlists.find(p => p.id === action.payload.playlistId);
      if (playlist) {
        playlist.tracks = playlist.tracks.filter(track => track.key !== action.payload.trackKey);
        playlist.updatedAt = new Date().toISOString();
      }
    },
    deletePlaylist: (state, action: PayloadAction<string>) => {
      state.playlists = state.playlists.filter(p => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopChartsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopChartsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.topCharts = action.payload;
        state.tracks = action.payload;
      })
      .addCase(fetchTopChartsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch top charts';
      })
      .addCase(searchTracksAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchTracksAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchTracksAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search tracks';
      })
      .addCase(fetchTracksByGenreAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTracksByGenreAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tracks = action.payload;
      })
      .addCase(fetchTracksByGenreAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tracks by genre';
      });
  },
});

export const {
  setCurrentGenre,
  clearSearchResults,
  createPlaylist,
  addToPlaylist,
  removeFromPlaylist,
  deletePlaylist,
} = musicSlice.actions;

export default musicSlice.reducer;