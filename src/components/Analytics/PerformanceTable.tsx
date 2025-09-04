import React from 'react';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';

const PerformanceTable: React.FC = () => {
  const salesReps = [
    {
      id: 1,
      name: 'John Doe',
      dealsWon: 23,
      revenue: 487000,
      target: 450000,
      conversionRate: 24.5,
      avgDealSize: 21174
    },
    {
      id: 2,
      name: 'Jane Smith',
      dealsWon: 19,
      revenue: 423000,
      target: 400000,
      conversionRate: 22.8,
      avgDealSize: 22263
    },
    {
      id: 3,
      name: 'Mike Johnson',
      dealsWon: 15,
      revenue: 334000,
      target: 350000,
      conversionRate: 19.2,
      avgDealSize: 22267
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      dealsWon: 27,
      revenue: 567000,
      target: 500000,
      conversionRate: 26.1,
      avgDealSize: 21000
    }
  ];

  const getPerformanceColor = (revenue: number, target: number) => {
    const percentage = (revenue / target) * 100;
    if (percentage >= 110) return 'text-green-600';
    if (percentage >= 90) return 'text-blue-600';
    return 'text-red-600';
  };

  const getPerformanceIcon = (revenue: number, target: number) => {
    const percentage = (revenue / target) * 100;
    if (percentage >= 100) return <TrendingUp className="w-4 h-4 text-green-600" />;
    return <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Sales Performance</h3>
            <p className="text-sm text-gray-600">Individual sales representative metrics</p>
          </div>
          <Trophy className="w-5 h-5 text-yellow-500" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Sales Rep</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Deals Won</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Revenue</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Target</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Conversion Rate</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Avg Deal Size</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Performance</th>
            </tr>
          </thead>
          <tbody>
            {salesReps.map((rep) => {
              const performance = (rep.revenue / rep.target) * 100;
              return (
                <tr key={rep.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-gray-900">{rep.name}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{rep.dealsWon}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-gray-900">
                      ${rep.revenue.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-600">
                      ${rep.target.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{rep.conversionRate}%</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">
                      ${rep.avgDealSize.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {getPerformanceIcon(rep.revenue, rep.target)}
                      <span className={`font-semibold ${getPerformanceColor(rep.revenue, rep.target)}`}>
                        {performance.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerformanceTable;