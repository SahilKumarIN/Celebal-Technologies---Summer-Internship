import axios from 'axios';

const API_KEY = import.meta.env.VITE_SHAZAM_API_KEY || 'demo-key';
const BASE_URL = 'https://shazam-core.p.rapidapi.com/v1';

const shazamApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
  }
});

// Mock data for demo purposes
const mockTracks = [
  {
    key: '1',
    title: 'Blinding Lights',
    subtitle: 'The Weeknd',
    artist: 'The Weeknd',
    images: {
      background: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      coverart: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
      coverarthq: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    hub: {
      type: 'APPLEMUSIC',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
      actions: [
        {
          name: 'apple',
          type: 'applemusicplay',
          uri: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/6b/5a/49/6b5a49c4-8c5c-3bb8-8f8f-9a9bb9c7e7f1/mzaf_3699808664015622370.plus.aac.ep.m4a'
        }
      ]
    },
    url: 'https://www.shazam.com/track/1',
    duration: 200,
    genres: {
      primary: 'Pop'
    }
  },
  {
    key: '2',
    title: 'Stay',
    subtitle: 'The Kid LAROI & Justin Bieber',
    artist: 'The Kid LAROI & Justin Bieber',
    images: {
      background: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      coverart: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
      coverarthq: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    hub: {
      type: 'APPLEMUSIC',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    url: 'https://www.shazam.com/track/2',
    duration: 180,
    genres: {
      primary: 'Pop'
    }
  },
  {
    key: '3',
    title: 'Heat Waves',
    subtitle: 'Glass Animals',
    artist: 'Glass Animals',
    images: {
      background: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      coverart: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
      coverarthq: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    hub: {
      type: 'APPLEMUSIC',
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    url: 'https://www.shazam.com/track/3',
    duration: 220,
    genres: {
      primary: 'Indie'
    }
  },
  {
    key: '4',
    title: 'Good 4 U',
    subtitle: 'Olivia Rodrigo',
    artist: 'Olivia Rodrigo',
    images: {
      background: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      coverart: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=400',
      coverarthq: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    hub: {
      type: 'APPLEMUSIC',
      image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    url: 'https://www.shazam.com/track/4',
    duration: 178,
    genres: {
      primary: 'Pop'
    }
  },
  {
    key: '5',
    title: 'Levitating',
    subtitle: 'Dua Lipa',
    artist: 'Dua Lipa',
    images: {
      background: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      coverart: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400',
      coverarthq: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    hub: {
      type: 'APPLEMUSIC',
      image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    url: 'https://www.shazam.com/track/5',
    duration: 203,
    genres: {
      primary: 'Pop'
    }
  }
];

export const fetchTopCharts = async () => {
  try {
    // In a real app, this would be an actual API call
    // const response = await shazamApi.get('/charts/track');
    // return response.data;
    
    // For demo purposes, return mock data
    return { tracks: mockTracks };
  } catch (error) {
    console.error('Error fetching top charts:', error);
    return { tracks: mockTracks };
  }
};

export const searchTracks = async (query: string) => {
  try {
    // In a real app, this would be an actual API call
    // const response = await shazamApi.get(`/search/multi?query=${query}`);
    // return response.data;
    
    // For demo purposes, filter mock data
    const filteredTracks = mockTracks.filter(track => 
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.toLowerCase().includes(query.toLowerCase())
    );
    
    return { tracks: filteredTracks };
  } catch (error) {
    console.error('Error searching tracks:', error);
    return { tracks: [] };
  }
};

export const fetchTracksByGenre = async (genre: string) => {
  try {
    // In a real app, this would be an actual API call
    // const response = await shazamApi.get(`/charts/genre-world?genre_code=${genre}`);
    // return response.data;
    
    // For demo purposes, return mock data
    return { tracks: mockTracks };
  } catch (error) {
    console.error('Error fetching tracks by genre:', error);
    return { tracks: mockTracks };
  }
};

export const fetchArtistDetails = async (artistId: string) => {
  try {
    // In a real app, this would be an actual API call
    // const response = await shazamApi.get(`/artists/details?artist_id=${artistId}`);
    // return response.data;
    
    // For demo purposes, return mock data
    return {
      adamid: artistId,
      name: 'Sample Artist',
      verified: true,
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
      bornOrFormed: '1990',
      origin: 'Unknown',
      genres: ['Pop', 'Rock']
    };
  } catch (error) {
    console.error('Error fetching artist details:', error);
    return null;
  }
};

export default shazamApi;