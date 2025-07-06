import React from 'react';
import { Genre } from '../types';

interface GenreCardProps {
  genre: Genre;
  onClick: (genre: Genre) => void;
}

const GenreCard: React.FC<GenreCardProps> = ({ genre, onClick }) => {
  return (
    <button
      onClick={() => onClick(genre)}
      className="relative overflow-hidden rounded-lg aspect-square group cursor-pointer transition-transform duration-300 hover:scale-105"
      style={{ backgroundColor: genre.color }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/60" />
      <img
        src={genre.image}
        alt={genre.name}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-white font-bold text-xl text-center px-4 drop-shadow-lg">
          {genre.name}
        </h3>
      </div>
    </button>
  );
};

export default GenreCard;