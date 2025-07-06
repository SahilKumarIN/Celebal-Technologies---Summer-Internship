import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { searchTracksAsync, clearSearchResults } from '../store/slices/musicSlice';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.trim()) {
        dispatch(searchTracksAsync(query));
        onSearch(query);
      } else {
        dispatch(clearSearchResults());
        onSearch('');
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query, dispatch, onSearch]);

  const handleClear = () => {
    setQuery('');
    dispatch(clearSearchResults());
    onSearch('');
  };

  return (
    <div className="relative max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="What do you want to listen to?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;