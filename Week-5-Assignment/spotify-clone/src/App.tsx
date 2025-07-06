import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Player from './components/Player';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import { useAppDispatch } from './hooks/useAppDispatch';
import { fetchTracksByGenreAsync, setCurrentGenre } from './store/slices/musicSlice';
import { Genre } from './types';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const dispatch = useAppDispatch();

  const handleGenreClick = (genre: Genre) => {
    dispatch(setCurrentGenre(genre.id));
    dispatch(fetchTracksByGenreAsync(genre.id));
    setActiveTab('home');
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'home':
        return 'Home';
      case 'search':
        return 'Search';
      case 'library':
        return 'Your Library';
      case 'liked':
        return 'Liked Songs';
      case 'playlists':
        return 'Playlists';
      case 'artists':
        return 'Artists';
      case 'albums':
        return 'Albums';
      default:
        return 'Spotify 2.0';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onGenreClick={handleGenreClick} />;
      case 'search':
        return <Search onGenreClick={handleGenreClick} />;
      case 'library':
      case 'liked':
      case 'playlists':
      case 'artists':
      case 'albums':
        return <Library />;
      default:
        return <Home onGenreClick={handleGenreClick} />;
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title={getPageTitle()} />
          <main className="flex-1 overflow-y-auto p-6">
            {renderContent()}
          </main>
        </div>
      </div>
      <Player />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;