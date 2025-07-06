export interface Track {
  key: string;
  title: string;
  subtitle: string;
  artist: string;
  images?: {
    background?: string;
    coverart?: string;
    coverarthq?: string;
  };
  hub?: {
    type: string;
    image?: string;
    actions?: Array<{
      name?: string;
      type?: string;
      uri?: string;
    }>;
  };
  url?: string;
  duration?: number;
  genres?: {
    primary?: string;
  };
}

export interface Artist {
  adamid: string;
  name: string;
  verified?: boolean;
  image?: string;
  bornOrFormed?: string;
  origin?: string;
  genres?: string[];
}

export interface Album {
  id: string;
  name: string;
  artist: string;
  image: string;
  releaseDate?: string;
  tracks?: Track[];
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  image: string;
  tracks: Track[];
  createdAt: string;
  updatedAt: string;
}

export interface Genre {
  id: string;
  name: string;
  image: string;
  color: string;
}

export interface PlayerState {
  isPlaying: boolean;
  currentTrack: Track | null;
  queue: Track[];
  currentIndex: number;
  volume: number;
  duration: number;
  currentTime: number;
  isShuffled: boolean;
  repeatMode: 'none' | 'one' | 'all';
}

export interface MusicState {
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
  playlists: Playlist[];
  genres: Genre[];
  searchResults: Track[];
  topCharts: Track[];
  loading: boolean;
  error: string | null;
  currentGenre: string | null;
}