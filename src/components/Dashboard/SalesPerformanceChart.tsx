import React from 'react';
import { Target, TrendingUp, Award } from 'lucide-react';

const SalesPerformanceChart: React.FC = () => {
  const performanceData = [
    { metric: 'Revenue Target', current: 2847329, target: 3000000, unit: '$', color: 'bg-blue-500' },
    { metric: 'Deals Closed', current: 89, target: 100, unit: '', color: 'bg-green-500' },
    { metric: 'New Customers', current: 156, target: 180, unit: '', color: 'bg-purple-500' },
    { metric: 'Conversion Rate', current: 23.4, target: 25, unit: '%', color: 'bg-orange-500' },
  ];

  const getPerformancePercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getPerformanceColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === '$') {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `${value}${unit}`;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
          <p className="text-sm text-gray-600">Current vs target performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-medium text-green-600">On Track</span>
        </div>
      </div>

      <div className="space-y-6">
        {performanceData.map((item, index) => {
          const percentage = getPerformancePercentage(item.current, item.target);
          const performanceColor = getPerformanceColor(item.current, item.target);
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{item.metric}</span>
                <div className="text-right">
                  <div className={`text-sm font-bold ${performanceColor}`}>
                    {formatValue(item.current, item.unit)}
                  </div>
                  <div className="text-xs text-gray-500">
                    of {formatValue(item.target, item.unit)}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full ${item.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                
                <div className="absolute right-0 top-full mt-1">
                  <div className={`text-xs font-medium ${performanceColor}`}>
                    {percentage.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Overall Performance</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-bold text-green-600">87.3%</span>
          </div>
        </div>
        
        <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 h-full transition-all duration-1000 ease-out" style={{ width: '87.3%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SalesPerformanceChart;