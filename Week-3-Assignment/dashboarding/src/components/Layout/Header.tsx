import React from 'react';
import { Bell, Search, Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const Header: React.FC = () => {
  const { theme, colorScheme, toggleTheme, setColorScheme } = useTheme();
  const [showColorPicker, setShowColorPicker] = React.useState(false);

  const colorSchemes = [
    { id: 'blue', name: 'Blue', color: 'bg-blue-500' },
    { id: 'green', name: 'Green', color: 'bg-green-500' },
    { id: 'purple', name: 'Purple', color: 'bg-purple-500' },
    { id: 'orange', name: 'Orange', color: 'bg-orange-500' },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                       w-64 transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Palette size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
            
            {showColorPicker && (
              <div className="absolute right-0 mt-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="grid grid-cols-2 gap-2">
                  {colorSchemes.map((scheme) => (
                    <button
                      key={scheme.id}
                      onClick={() => {
                        setColorScheme(scheme.id as any);
                        setShowColorPicker(false);
                      }}
                      className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        colorScheme === scheme.id ? 'ring-2 ring-indigo-500' : ''
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full ${scheme.color}`}></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{scheme.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'light' ? (
              <Moon size={20} className="text-gray-600 dark:text-gray-400" />
            ) : (
              <Sun size={20} className="text-gray-600 dark:text-gray-400" />
            )}
          </button>

          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
            <Bell size={20} className="text-gray-600 dark:text-gray-400" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};