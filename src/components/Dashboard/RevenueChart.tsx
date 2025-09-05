import React from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';

const RevenueChart: React.FC = () => {
  const monthlyData = [
    { month: 'Jan', revenue: 245000, target: 220000, growth: 12.5 },
    { month: 'Feb', revenue: 287000, target: 260000, growth: 17.1 },
    { month: 'Mar', revenue: 312000, target: 290000, growth: 8.7 },
    { month: 'Apr', revenue: 389000, target: 340000, growth: 24.7 },
    { month: 'May', revenue: 425000, target: 380000, growth: 9.3 },
    { month: 'Jun', revenue: 467000, target: 420000, growth: 9.9 },
  ];

  const maxValue = Math.max(...monthlyData.map(d => Math.max(d.revenue, d.target)));
  const totalRevenue = monthlyData.reduce((sum, month) => sum + month.revenue, 0);
  const avgGrowth = monthlyData.reduce((sum, month) => sum + month.growth, 0) / monthlyData.length;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
          <p className="text-sm text-gray-600">Monthly revenue performance</p>
        </div>
        <div className="text-right">
          <div className="flex items-center text-green-600 mb-1">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">+{avgGrowth.toFixed(1)}% avg</span>
          </div>
          <div className="flex items-center text-gray-900 font-bold">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>{(totalRevenue / 1000000).toFixed(1)}M total</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {monthlyData.map((month, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">{month.month}</span>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  ${(month.revenue / 1000).toFixed(0)}K
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  month.growth > 15 ? 'bg-green-100 text-green-800' :
                  month.growth > 10 ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  +{month.growth}%
                </span>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(month.revenue / maxValue) * 100}%` }}
                ></div>
              </div>
              <div 
                className="absolute top-0 w-1 h-3 bg-green-400 rounded-full transition-all duration-1000"
                style={{ left: `${(month.target / maxValue) * 100}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>Target: ${(month.target / 1000).toFixed(0)}K</span>
              <span className={month.revenue >= month.target ? 'text-green-600' : 'text-red-600'}>
                {month.revenue >= month.target ? '✓ Target Met' : '⚠ Below Target'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;