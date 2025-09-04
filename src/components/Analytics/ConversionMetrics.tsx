import React from 'react';
import { Target, Users, DollarSign, Clock } from 'lucide-react';

const ConversionMetrics: React.FC = () => {
  const metrics = [
    {
      title: 'Lead to Customer',
      percentage: 23.4,
      icon: Target,
      color: 'text-green-600',
      trend: '+2.1%'
    },
    {
      title: 'Qualified Leads',
      percentage: 34.2,
      icon: Users,
      color: 'text-blue-600',
      trend: '+5.3%'
    },
    {
      title: 'Win Rate',
      percentage: 67.8,
      icon: DollarSign,
      color: 'text-purple-600',
      trend: '+1.8%'
    },
    {
      title: 'Response Rate',
      percentage: 45.6,
      icon: Clock,
      color: 'text-orange-600',
      trend: '+3.2%'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Conversion Metrics</h3>
        <p className="text-sm text-gray-600">Key performance indicators</p>
      </div>

      <div className="space-y-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-gray-50`}>
                  <Icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{metric.title}</p>
                  <p className={`text-sm font-medium ${metric.color}`}>{metric.trend} vs last period</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{metric.percentage}%</div>
                <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className={`h-2 rounded-full transition-all duration-700 ${metric.color.replace('text-', 'bg-')}`}
                    style={{ width: `${metric.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConversionMetrics;