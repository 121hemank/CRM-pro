import React from 'react';
import { Fuel as Funnel, TrendingDown } from 'lucide-react';

const ConversionFunnelChart: React.FC = () => {
  const funnelData = [
    { stage: 'Leads', count: 2450, percentage: 100, color: 'bg-blue-500', dropOff: 0 },
    { stage: 'Qualified', count: 1225, percentage: 50, color: 'bg-green-500', dropOff: 50 },
    { stage: 'Proposal', count: 490, percentage: 20, color: 'bg-yellow-500', dropOff: 60 },
    { stage: 'Negotiation', count: 245, percentage: 10, color: 'bg-purple-500', dropOff: 50 },
    { stage: 'Closed Won', count: 147, percentage: 6, color: 'bg-emerald-500', dropOff: 40 },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Conversion Funnel</h3>
          <p className="text-sm text-gray-600">Lead to customer journey</p>
        </div>
        <Funnel className="w-5 h-5 text-purple-600" />
      </div>

      <div className="space-y-4">
        {funnelData.map((stage, index) => (
          <div key={index} className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">{stage.count.toLocaleString()}</div>
                <div className="text-xs text-gray-500">{stage.percentage}%</div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-full ${stage.color} transition-all duration-1000 ease-out rounded-full`}
                  style={{ width: `${stage.percentage}%` }}
                ></div>
              </div>
              
              {index > 0 && stage.dropOff > 0 && (
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                  <div className="flex items-center text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -{stage.dropOff}%
                  </div>
                </div>
              )}
            </div>

            {index < funnelData.length - 1 && (
              <div className="flex justify-center mt-2">
                <div className="w-0.5 h-4 bg-gray-300"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">6%</div>
            <div className="text-xs text-gray-600">Overall Conversion</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">32 days</div>
            <div className="text-xs text-gray-600">Avg. Cycle Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionFunnelChart;