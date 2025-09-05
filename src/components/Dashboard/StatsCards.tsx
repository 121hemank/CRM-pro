import React from 'react';
import { TrendingUp, TrendingDown, Users, DollarSign, Target, Phone, Star, Clock } from 'lucide-react';

const StatsCards: React.FC = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$2,847,329',
      change: '+18.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'New Customers',
      value: '1,456',
      change: '+12.3%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Conversion Rate',
      value: '23.4%',
      change: '+2.1%',
      trend: 'up',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Active Deals',
      value: '89',
      change: '+15.3%',
      trend: 'up',
      icon: Phone,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Avg Deal Size',
      value: '$32,450',
      change: '+8.7%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Customer Satisfaction',
      value: '4.2/5',
      change: '+0.3',
      trend: 'up',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Avg Response Time',
      value: '2.4h',
      change: '-0.8h',
      trend: 'up',
      icon: Clock,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Pipeline Value',
      value: '$892K',
      change: '+24.1%',
      trend: 'up',
      icon: Target,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">{stat.title}</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;