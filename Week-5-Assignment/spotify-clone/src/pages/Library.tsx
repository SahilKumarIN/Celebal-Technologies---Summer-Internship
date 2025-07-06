import React, { useState } from 'react';
import { Plus, Music, Heart, Users, Disc3 } from 'lucide-react';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { createPlaylist } from '../store/slices/musicSlice';
import TrackCard from '../components/TrackCard';

const Library: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  
  const { playlists, topCharts } = useAppSelector((state) => state.music);
  const dispatch = useAppDispatch();

  const filters = [
    { id: 'all', label: 'All', icon: Music },
    { id: 'playlists', label: 'Playlists', icon: Music },
    { id: 'artists', label: 'Artists', icon: Users },
    { id: 'albums', label: 'Albums', icon: Disc3 },
  ];

  const handleCreatePlaylist = () => {
    if (playlistName.trim()) {
      dispatch(createPlaylist({
        name: playlistName,
        description: playlistDescription,
        image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
        tracks: [],
      }));
      setPlaylistName('');
      setPlaylistDescription('');
      setShowCreatePlaylist(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Your Library</h2>
        <button
          onClick={() => setShowCreatePlaylist(true)}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-full font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Playlist
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              activeFilter === filter.id
                ? 'bg-white text-black'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            <filter.icon className="w-4 h-4" />
            {filter.label}
          </button>
        ))}
      </div>

      {/* Playlists Grid */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {/* Liked Songs */}
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform">
            <div className="flex items-center justify-center h-32 mb-4">
              <Heart className="w-16 h-16 text-white" />
            </div>
            <h4 className="font-medium text-white mb-1">Liked Songs</h4>
            <p className="text-sm text-gray-300">0 songs</p>
          </div>

          {/* User Playlists */}
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors group"
            >
              <img
                src={playlist.image}
                alt={playlist.name}
                className="w-full aspect-square object-cover rounded-lg mb-4"
              />
              <h4 className="font-medium text-white mb-1 truncate">{playlist.name}</h4>
              <p className="text-sm text-gray-400 truncate">
                {playlist.tracks.length} songs
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h3 className="text-2xl font-bold text-white mb-6">Recently Played</h3>
        <div className="space-y-2">
          {topCharts.slice(0, 5).map((track, index) => (
            <TrackCard
              key={track.key}
              track={track}
              tracks={topCharts}
              index={index}
              showIndex={false}
            />
          ))}
        </div>
      </section>

      {/* Create Playlist Modal */}
      {showCreatePlaylist && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Create Playlist</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                  placeholder="My Playlist"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={playlistDescription}
                  onChange={(e) => setPlaylistDescription(e.target.value)}
                  placeholder="Add a description..."
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreatePlaylist(false)}
                  className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePlaylist}
                  disabled={!playlistName.trim()}
                  className="flex-1 px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;