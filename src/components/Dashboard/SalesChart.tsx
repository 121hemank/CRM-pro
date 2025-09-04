import React from 'react';
import { TrendingUp } from 'lucide-react';

const SalesChart: React.FC = () => {
  const data = [
    { month: 'Jan', sales: 45000, target: 40000 },
    { month: 'Feb', sales: 52000, target: 45000 },
    { month: 'Mar', sales: 48000, target: 47000 },
    { month: 'Apr', sales: 61000, target: 50000 },
    { month: 'May', sales: 55000, target: 52000 },
    { month: 'Jun', sales: 67000, target: 55000 },
  ];

  const maxValue = Math.max(...data.map(d => Math.max(d.sales, d.target)));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Sales Performance</h3>
          <p className="text-sm text-gray-600">Monthly sales vs targets</p>
        </div>
        <div className="flex items-center text-green-600">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">+18.2%</span>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-12 text-sm font-medium text-gray-600">{item.month}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <div className="flex-1 bg-gray-200 rounded-full h-2 relative overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(item.sales / maxValue) * 100}%` }}
                  ></div>
                  <div 
                    className="absolute top-0 bg-green-400 h-full w-1 transition-all duration-500"
                    style={{ left: `${(item.target / maxValue) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Sales: ${item.sales.toLocaleString()}</span>
                <span>Target: ${item.target.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesChart;