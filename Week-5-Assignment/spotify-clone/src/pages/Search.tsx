import React, { useState } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import SearchBar from '../components/SearchBar';
import TrackCard from '../components/TrackCard';
import GenreCard from '../components/GenreCard';
import { Genre } from '../types';

interface SearchProps {
  onGenreClick: (genre: Genre) => void;
}

const Search: React.FC<SearchProps> = ({ onGenreClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchResults, genres, loading } = useAppSelector((state) => state.music);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="text-center">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Search Results */}
      {searchQuery && (
        <section>
          <h3 className="text-2xl font-bold text-white mb-6">
            Search Results for "{searchQuery}"
          </h3>
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-2">
              {searchResults.map((track, index) => (
                <TrackCard
                  key={track.key}
                  track={track}
                  tracks={searchResults}
                  index={index}
                  showIndex={false}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center">No results found</p>
          )}
        </section>
      )}

      {/* Browse All */}
      {!searchQuery && (
        <section>
          <h3 className="text-2xl font-bold text-white mb-6">Browse All</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {genres.map((genre) => (
              <GenreCard
                key={genre.id}
                genre={genre}
                onClick={onGenreClick}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Search;