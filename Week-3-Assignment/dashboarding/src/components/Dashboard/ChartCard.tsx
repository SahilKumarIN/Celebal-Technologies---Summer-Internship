import React from 'react';

interface ChartData {
  month: string;
  value: number;
}

interface ChartCardProps {
  title: string;
  type: 'line' | 'bar';
  data: ChartData[];
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, type, data }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const chartHeight = 200;
  const chartWidth = 400;

  const getBarHeight = (value: number) => (value / maxValue) * chartHeight * 0.8;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      
      <div className="relative">
        <svg width="100%" height={chartHeight + 40} className="overflow-visible">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
            <line
              key={ratio}
              x1="0"
              y1={chartHeight * (1 - ratio)}
              x2="100%"
              y2={chartHeight * (1 - ratio)}
              stroke="currentColor"
              strokeOpacity="0.1"
              className="text-gray-400"
            />
          ))}
          
          {type === 'bar' ? (
            // Bar Chart
            data.map((item, index) => {
              const barWidth = 100 / data.length;
              const x = (index * barWidth) + (barWidth * 0.1);
              const height = getBarHeight(item.value);
              
              return (
                <g key={index}>
                  <rect
                    x={`${x}%`}
                    y={chartHeight - height}
                    width={`${barWidth * 0.8}%`}
                    height={height}
                    fill="currentColor"
                    className="text-indigo-500 hover:text-indigo-600 transition-colors"
                    rx="4"
                  />
                  <text
                    x={`${x + (barWidth * 0.4)}%`}
                    y={chartHeight + 20}
                    textAnchor="middle"
                    className="text-xs fill-gray-600 dark:fill-gray-400"
                  >
                    {item.month}
                  </text>
                </g>
              );
            })
          ) : (
            // Line Chart
            <>
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-indigo-500"
                points={data.map((item, index) => {
                  const x = (index / (data.length - 1)) * 100;
                  const y = chartHeight - getBarHeight(item.value);
                  return `${x}%,${y}`;
                }).join(' ')}
              />
              {data.map((item, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y = chartHeight - getBarHeight(item.value);
                
                return (
                  <g key={index}>
                    <circle
                      cx={`${x}%`}
                      cy={y}
                      r="4"
                      fill="currentColor"
                      className="text-indigo-500"
                    />
                    <text
                      x={`${x}%`}
                      y={chartHeight + 20}
                      textAnchor="middle"
                      className="text-xs fill-gray-600 dark:fill-gray-400"
                    >
                      {item.month}
                    </text>
                  </g>
                );
              })}
            </>
          )}
        </svg>
      </div>
    </div>
  );
};