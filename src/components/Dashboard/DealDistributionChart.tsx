import React from 'react';
import { PieChart, DollarSign } from 'lucide-react';

const DealDistributionChart: React.FC = () => {
  const dealData = [
    { stage: 'Prospecting', count: 45, value: 892000, color: 'bg-blue-500', textColor: 'text-blue-600' },
    { stage: 'Qualification', count: 32, value: 654000, color: 'bg-green-500', textColor: 'text-green-600' },
    { stage: 'Proposal', count: 18, value: 423000, color: 'bg-yellow-500', textColor: 'text-yellow-600' },
    { stage: 'Negotiation', count: 12, value: 287000, color: 'bg-purple-500', textColor: 'text-purple-600' },
    { stage: 'Closed Won', count: 8, value: 156000, color: 'bg-emerald-500', textColor: 'text-emerald-600' },
  ];

  const totalValue = dealData.reduce((sum, deal) => sum + deal.value, 0);
  const totalDeals = dealData.reduce((sum, deal) => sum + deal.count, 0);

  // Calculate angles for pie chart
  const angles = dealData.map(deal => (deal.value / totalValue) * 360);
  let currentAngle = 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Deal Distribution</h3>
          <p className="text-sm text-gray-600">Pipeline value by stage</p>
        </div>
        <PieChart className="w-5 h-5 text-blue-600" />
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {dealData.map((deal, index) => {
              const angle = angles[index];
              const startAngle = currentAngle;
              currentAngle += angle;
              
              const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
              const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
              const x2 = 50 + 40 * Math.cos(((startAngle + angle) * Math.PI) / 180);
              const y2 = 50 + 40 * Math.sin(((startAngle + angle) * Math.PI) / 180);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              const pathData = [
                `M 50 50`,
                `L ${x1} ${y1}`,
                `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');

              return (
                <path
                  key={index}
                  d={pathData}
                  className={`${deal.color.replace('bg-', 'fill-')} opacity-80 hover:opacity-100 transition-opacity cursor-pointer`}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{totalDeals}</div>
              <div className="text-xs text-gray-600">Total Deals</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {dealData.map((deal, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${deal.color}`}></div>
              <span className="text-sm font-medium text-gray-700">{deal.stage}</span>
            </div>
            <div className="text-right">
              <div className="flex items-center text-sm font-semibold text-gray-900">
                <DollarSign className="w-3 h-3 mr-1" />
                {(deal.value / 1000).toFixed(0)}K
              </div>
              <div className="text-xs text-gray-500">{deal.count} deals</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Total Pipeline Value</span>
          <div className="flex items-center font-bold text-gray-900">
            <DollarSign className="w-4 h-4 mr-1" />
            {(totalValue / 1000000).toFixed(1)}M
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealDistributionChart;