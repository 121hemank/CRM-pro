import React from 'react';
import { TrendingUp, Target, DollarSign, Calendar } from 'lucide-react';

const PipelineStats: React.FC = () => {
  const stats = [
    {
      title: 'Pipeline Value',
      value: '$892,000',
      change: '+15.2%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Average Deal Size',
      value: '$98,556',
      change: '+8.7%',
      icon: Target,
      color: 'text-blue-600'
    },
    {
      title: 'Conversion Rate',
      value: '23.4%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'Avg. Sales Cycle',
      value: '45 days',
      change: '-3 days',
      icon: Calendar,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className={`text-sm font-medium mt-1 ${stat.color}`}>
                  {stat.change} vs last month
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PipelineStats;