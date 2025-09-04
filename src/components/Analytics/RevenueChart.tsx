import React from 'react';
import { TrendingUp } from 'lucide-react';

const RevenueChart: React.FC = () => {
  const data = [
    { quarter: 'Q1 2023', revenue: 245000, target: 220000 },
    { quarter: 'Q2 2023', revenue: 287000, target: 260000 },
    { quarter: 'Q3 2023', revenue: 312000, target: 290000 },
    { quarter: 'Q4 2023', revenue: 389000, target: 340000 },
    { quarter: 'Q1 2024', revenue: 425000, target: 380000 },
  ];

  const maxValue = Math.max(...data.map(d => Math.max(d.revenue, d.target)));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
          <p className="text-sm text-gray-600">Quarterly revenue vs targets</p>
        </div>
        <div className="flex items-center text-green-600">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">+23.4%</span>
        </div>
      </div>

      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700">{item.quarter}</span>
              <span className="text-gray-600">${item.revenue.toLocaleString()}</span>
            </div>
            <div className="relative">
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-700"
                  style={{ width: `${(item.revenue / maxValue) * 100}%` }}
                ></div>
              </div>
              <div 
                className="absolute top-0 w-1 h-3 bg-green-400 rounded-full"
                style={{ left: `${(item.target / maxValue) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Target: ${item.target.toLocaleString()}</span>
              <span className={item.revenue >= item.target ? 'text-green-600' : 'text-red-600'}>
                {item.revenue >= item.target ? '✓ Target Met' : '⚠ Below Target'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;