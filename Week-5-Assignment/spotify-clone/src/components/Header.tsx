import React from 'react';
import { ChevronLeft, ChevronRight, User, Settings } from 'lucide-react';

interface HeaderProps {
  title: string;
  showNavigation?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showNavigation = true }) => {
  return (
    <header className="bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-4">
        {showNavigation && (
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/50 transition-colors">
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/50 transition-colors">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        )}
        
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/50 transition-colors">
            <Settings className="w-5 h-5 text-white" />
          </button>
          <button className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all">
            <User className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;