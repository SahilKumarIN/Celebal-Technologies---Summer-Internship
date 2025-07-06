import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchTopChartsAsync } from '../store/slices/musicSlice';
import TrackCard from '../components/TrackCard';
import GenreCard from '../components/GenreCard';
import { Genre } from '../types';

interface HomeProps {
  onGenreClick: (genre: Genre) => void;
}

const Home: React.FC<HomeProps> = ({ onGenreClick }) => {
  const dispatch = useAppDispatch();
  const { topCharts, genres, loading } = useAppSelector((state) => state.music);

  useEffect(() => {
    dispatch(fetchTopChartsAsync());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <h2 className="text-4xl font-bold mb-4">Welcome to Spotify 2.0</h2>
        <p className="text-xl opacity-90">
          Discover new music, create playlists, and enjoy your favorite tracks
        </p>
      </div>

      {/* Browse Genres */}
      <section>
        <h3 className="text-2xl font-bold text-white mb-6">Browse by Genre</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {genres.map((genre) => (
            <GenreCard
              key={genre.id}
              genre={genre}
              onClick={onGenreClick}
            />
          ))}
        </div>
      </section>

      {/* Top Charts */}
      <section>
        <h3 className="text-2xl font-bold text-white mb-6">Top Charts</h3>
        <div className="space-y-2">
          {topCharts.slice(0, 10).map((track, index) => (
            <TrackCard
              key={track.key}
              track={track}
              tracks={topCharts}
              index={index}
              showIndex={true}
            />
          ))}
        </div>
      </section>

      {/* Recently Played */}
      <section>
        <h3 className="text-2xl font-bold text-white mb-6">Recently Played</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {topCharts.slice(0, 6).map((track) => (
            <div
              key={track.key}
              className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer group"
            >
              <img
                src={track.images?.coverart || track.images?.coverarthq || 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400'}
                alt={track.title}
                className="w-full aspect-square object-cover rounded-lg mb-4"
              />
              <h4 className="font-medium text-white truncate">{track.title}</h4>
              <p className="text-sm text-gray-400 truncate">{track.artist}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;