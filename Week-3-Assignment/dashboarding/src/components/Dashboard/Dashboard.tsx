import React from 'react';
import { TrendingUp, Users, ShoppingCart, DollarSign, Activity } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { ChartCard } from './ChartCard';
import { RecentActivity } from './RecentActivity';

export const Dashboard: React.FC = () => {
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Total Users',
      value: '2,345',
      change: '+15.3%',
      trend: 'up' as const,
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      trend: 'up' as const,
      icon: ShoppingCart,
      color: 'text-purple-600'
    },
    {
      title: 'Active Sessions',
      value: '567',
      change: '-2.4%',
      trend: 'down' as const,
      icon: Activity,
      color: 'text-orange-600'
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard 
          title="Revenue Overview" 
          type="line"
          data={[
            { month: 'Jan', value: 4000 },
            { month: 'Feb', value: 3000 },
            { month: 'Mar', value: 5000 },
            { month: 'Apr', value: 4500 },
            { month: 'May', value: 6000 },
            { month: 'Jun', value: 5500 },
          ]}
        />
        <ChartCard 
          title="User Activity" 
          type="bar"
          data={[
            { month: 'Jan', value: 2400 },
            { month: 'Feb', value: 1398 },
            { month: 'Mar', value: 9800 },
            { month: 'Apr', value: 3908 },
            { month: 'May', value: 4800 },
            { month: 'Jun', value: 3800 },
          ]}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center space-x-3">
                <Users className="text-blue-500" size={20} />
                <span className="text-gray-900 dark:text-white">Add New User</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center space-x-3">
                <ShoppingCart className="text-green-500" size={20} />
                <span className="text-gray-900 dark:text-white">Create Order</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center space-x-3">
                <TrendingUp className="text-purple-500" size={20} />
                <span className="text-gray-900 dark:text-white">View Analytics</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};