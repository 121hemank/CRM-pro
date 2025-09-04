import React from 'react';
import { Users, UserCheck, DollarSign, Trophy } from 'lucide-react';

const LeadFunnel: React.FC = () => {
  const funnelData = [
    { stage: 'Leads', count: 1250, icon: Users, color: 'bg-blue-500', percentage: 100 },
    { stage: 'Qualified', count: 425, icon: UserCheck, color: 'bg-green-500', percentage: 34 },
    { stage: 'Proposals', count: 180, icon: DollarSign, color: 'bg-orange-500', percentage: 14.4 },
    { stage: 'Closed Won', count: 67, icon: Trophy, color: 'bg-purple-500', percentage: 5.4 },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Lead Conversion Funnel</h3>
        <p className="text-sm text-gray-600">Track leads through your sales process</p>
      </div>

      <div className="space-y-4">
        {funnelData.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <div key={index} className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${stage.color} bg-opacity-10`}>
                    <Icon className={`w-4 h-4 ${stage.color.replace('bg-', 'text-')}`} />
                  </div>
                  <span className="font-medium text-gray-900">{stage.stage}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{stage.count.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{stage.percentage}%</div>
                </div>
              </div>
              
              <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full ${stage.color} transition-all duration-700 ease-out`}
                  style={{ width: `${stage.percentage}%` }}
                ></div>
              </div>

              {index < funnelData.length - 1 && (
                <div className="absolute left-6 top-full w-0.5 h-4 bg-gray-200"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeadFunnel;