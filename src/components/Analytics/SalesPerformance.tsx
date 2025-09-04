import React from 'react';
import { Clock, TrendingUp, DollarSign, Target, Calendar, Award } from 'lucide-react';
import { SalesPerformance } from '../../types/Product';

const SalesPerformanceComponent: React.FC = () => {
  const performanceData: SalesPerformance = {
    timeToClose: 32, // days
    conversionRates: {
      leadToQualified: 34.2,
      qualifiedToProposal: 67.8,
      proposalToWon: 45.6,
      overallConversion: 10.5
    },
    revenueGenerated: 2847329,
    forecastedRevenue: 3200000,
    salesCycleLength: 45, // days
    totalDeals: 156,
    wonDeals: 89,
    lostDeals: 67
  };

  const metrics = [
    {
      title: 'Average Time to Close',
      value: `${performanceData.timeToClose} days`,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '-3 days vs last month'
    },
    {
      title: 'Sales Cycle Length',
      value: `${performanceData.salesCycleLength} days`,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '-2 days vs last month'
    },
    {
      title: 'Revenue Generated',
      value: `$${performanceData.revenueGenerated.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+18.5% vs last month'
    },
    {
      title: 'Forecasted Revenue',
      value: `$${performanceData.forecastedRevenue.toLocaleString()}`,
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: '+12.3% vs last month'
    }
  ];

  const conversionStages = [
    {
      stage: 'Lead to Qualified',
      rate: performanceData.conversionRates.leadToQualified,
      color: 'bg-blue-500'
    },
    {
      stage: 'Qualified to Proposal',
      rate: performanceData.conversionRates.qualifiedToProposal,
      color: 'bg-green-500'
    },
    {
      stage: 'Proposal to Won',
      rate: performanceData.conversionRates.proposalToWon,
      color: 'bg-purple-500'
    },
    {
      stage: 'Overall Conversion',
      rate: performanceData.conversionRates.overallConversion,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sales Performance Analytics</h2>
          <p className="text-gray-600 mt-1">Comprehensive sales metrics and KPIs</p>
        </div>
        <Award className="w-8 h-8 text-yellow-500" />
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</p>
              <p className="text-sm text-green-600 font-medium">{metric.change}</p>
            </div>
          );
        })}
      </div>

      {/* Conversion Rates */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Conversion Rates</h3>
            <p className="text-sm text-gray-600">Stage-by-stage conversion performance</p>
          </div>
          <TrendingUp className="w-5 h-5 text-green-600" />
        </div>

        <div className="space-y-4">
          {conversionStages.map((stage, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">{stage.stage}</span>
                <span className="font-bold text-gray-900">{stage.rate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-700 ${stage.color}`}
                  style={{ width: `${stage.rate}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deal Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Deal Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">{performanceData.totalDeals}</div>
            <div className="text-sm text-gray-600">Total Deals</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{performanceData.wonDeals}</div>
            <div className="text-sm text-gray-600">Won Deals</div>
            <div className="text-xs text-green-600 mt-1">
              {((performanceData.wonDeals / performanceData.totalDeals) * 100).toFixed(1)}% win rate
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">{performanceData.lostDeals}</div>
            <div className="text-sm text-gray-600">Lost Deals</div>
            <div className="text-xs text-red-600 mt-1">
              {((performanceData.lostDeals / performanceData.totalDeals) * 100).toFixed(1)}% loss rate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPerformanceComponent;