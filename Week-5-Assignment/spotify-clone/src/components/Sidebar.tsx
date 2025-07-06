import React from 'react';
import { Home, Search, Library, Heart, Plus, Music, Users, Disc3 } from 'lucide-react';
import { useAppSelector } from '../hooks/useAppSelector';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { playlists } = useAppSelector((state) => state.music);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'library', label: 'Your Library', icon: Library },
  ];

  const libraryItems = [
    { id: 'liked', label: 'Liked Songs', icon: Heart },
    { id: 'playlists', label: 'Playlists', icon: Music },
    { id: 'artists', label: 'Artists', icon: Users },
    { id: 'albums', label: 'Albums', icon: Disc3 },
  ];

  return (
    <div className="w-64 bg-black text-white flex flex-col h-full">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Music className="w-8 h-8 text-green-500" />
          <span className="text-2xl font-bold">Spotify 2.0</span>
        </div>
      </div>

      {/* Main Menu */}
      <nav className="px-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 ${
              activeTab === item.id
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Library Section */}
      <div className="px-6 mt-8">
        <h3 className="text-gray-400 text-sm font-semibold mb-4 uppercase tracking-wider">
          Library
        </h3>
        <div className="space-y-2">
          {libraryItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 ${
                activeTab === item.id
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Playlists */}
      <div className="px-6 mt-8 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">
            Playlists
          </h3>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          {playlists.map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => setActiveTab(`playlist-${playlist.id}`)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 text-left ${
                activeTab === `playlist-${playlist.id}`
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <img
                src={playlist.image}
                alt={playlist.name}
                className="w-8 h-8 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{playlist.name}</p>
                <p className="text-xs text-gray-500 truncate">
                  {playlist.tracks.length} songs
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;