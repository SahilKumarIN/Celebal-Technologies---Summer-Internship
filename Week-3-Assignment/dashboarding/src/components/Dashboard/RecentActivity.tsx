import React from 'react';
import { User, ShoppingCart, Settings, FileText } from 'lucide-react';

export const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'user',
      message: 'New user registered: Alice Johnson',
      time: '2 minutes ago',
      icon: User,
      color: 'text-blue-500'
    },
    {
      id: 2,
      type: 'order',
      message: 'Order #1234 has been completed',
      time: '5 minutes ago',
      icon: ShoppingCart,
      color: 'text-green-500'
    },
    {
      id: 3,
      type: 'settings',
      message: 'System settings updated',
      time: '10 minutes ago',
      icon: Settings,
      color: 'text-orange-500'
    },
    {
      id: 4,
      type: 'document',
      message: 'New report generated: Q4 Analytics',
      time: '15 minutes ago',
      icon: FileText,
      color: 'text-purple-500'
    },
    {
      id: 5,
      type: 'user',
      message: 'User profile updated: John Smith',
      time: '20 minutes ago',
      icon: User,
      color: 'text-blue-500'
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          
          return (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700`}>
                <Icon size={16} className={activity.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="w-full mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">
        View all activity
      </button>
    </div>
  );
};