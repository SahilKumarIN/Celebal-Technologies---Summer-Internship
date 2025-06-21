import React from 'react';
import { ChartCard } from '../Dashboard/ChartCard';

export const ChartsPage: React.FC = () => {
  const salesData = [
    { month: 'Jan', value: 4000 },
    { month: 'Feb', value: 3000 },
    { month: 'Mar', value: 5000 },
    { month: 'Apr', value: 4500 },
    { month: 'May', value: 6000 },
    { month: 'Jun', value: 5500 },
    { month: 'Jul', value: 7000 },
    { month: 'Aug', value: 6500 },
    { month: 'Sep', value: 8000 },
    { month: 'Oct', value: 7500 },
    { month: 'Nov', value: 9000 },
    { month: 'Dec', value: 8500 },
  ];

  const userGrowthData = [
    { month: 'Jan', value: 1200 },
    { month: 'Feb', value: 1500 },
    { month: 'Mar', value: 1800 },
    { month: 'Apr', value: 2200 },
    { month: 'May', value: 2800 },
    { month: 'Jun', value: 3200 },
  ];

  const productSalesData = [
    { month: 'Q1', value: 2400 },
    { month: 'Q2', value: 1398 },
    { month: 'Q3', value: 9800 },
    { month: 'Q4', value: 3908 },
  ];

  const revenueData = [
    { month: 'Week 1', value: 12000 },
    { month: 'Week 2', value: 15000 },
    { month: 'Week 3', value: 18000 },
    { month: 'Week 4', value: 22000 },
    { month: 'Week 5', value: 25000 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Charts & Analytics</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard 
          title="Annual Sales Performance" 
          type="line"
          data={salesData}
        />
        <ChartCard 
          title="User Growth (6 Months)" 
          type="line"
          data={userGrowthData}
        />
        <ChartCard 
          title="Quarterly Product Sales" 
          type="bar"
          data={productSalesData}
        />
        <ChartCard 
          title="Weekly Revenue Trend" 
          type="bar"
          data={revenueData}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">84%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Sales Target Achievement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">+23%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Growth Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">156</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">New Customers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};