import React from 'react';
import { 
  LayoutDashboard, 
  Table, 
  BarChart3, 
  Calendar, 
  Kanban,
  Settings,
  Users,
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'tables', label: 'Tables', icon: Table },
  { id: 'charts', label: 'Charts', icon: BarChart3 },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'kanban', label: 'Kanban', icon: Kanban },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed, 
  setIsCollapsed, 
  currentPage, 
  setCurrentPage 
}) => {
  return (
    <div className={`
      ${isCollapsed ? 'w-16' : 'w-64'} 
      transition-all duration-300 ease-in-out
      bg-white dark:bg-gray-900 
      border-r border-gray-200 dark:border-gray-700
      flex flex-col h-full
    `}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Admin Pro
            </h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight size={20} className="text-gray-600 dark:text-gray-400" />
            ) : (
              <ChevronLeft size={20} className="text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentPage(item.id)}
                  className={`
                    w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="ml-3 font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};