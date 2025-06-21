import React from 'react';
import { User, Bell, Shield, Palette, Globe, Database } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const SettingsPage: React.FC = () => {
  const { theme, colorScheme, toggleTheme, setColorScheme } = useTheme();

  const settingsSections = [
    {
      id: 'profile',
      title: 'Profile Settings',
      icon: User,
      description: 'Manage your personal information and preferences'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Configure your notification preferences'
    },
    {
      id: 'security',
      title: 'Security',
      icon: Shield,
      description: 'Manage your account security settings'
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      description: 'Customize the look and feel of your dashboard'
    },
    {
      id: 'language',
      title: 'Language & Region',
      icon: Globe,
      description: 'Set your language and regional preferences'
    },
    {
      id: 'data',
      title: 'Data Management',
      icon: Database,
      description: 'Manage your data and privacy settings'
    }
  ];

  const colorSchemes = [
    { id: 'blue', name: 'Blue', color: 'bg-blue-500' },
    { id: 'green', name: 'Green', color: 'bg-green-500' },
    { id: 'purple', name: 'Purple', color: 'bg-purple-500' },
    { id: 'orange', name: 'Orange', color: 'bg-orange-500' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Settings</h2>
            <nav className="space-y-2">
              {settingsSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Icon size={20} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-900 dark:text-white">{section.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Appearance Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Theme
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => theme === 'dark' && toggleTheme()}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      theme === 'light' 
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' 
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <div className="w-full h-12 bg-white rounded mb-2 border"></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Light</span>
                  </button>
                  <button
                    onClick={() => theme === 'light' && toggleTheme()}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      theme === 'dark' 
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' 
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <div className="w-full h-12 bg-gray-800 rounded mb-2"></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Dark</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Color Scheme
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {colorSchemes.map((scheme) => (
                    <button
                      key={scheme.id}
                      onClick={() => setColorScheme(scheme.id as any)}
                      className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${
                        colorScheme === scheme.id 
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' 
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full ${scheme.color}`}></div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{scheme.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                  <option>Administrator</option>
                  <option>Manager</option>
                  <option>User</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};