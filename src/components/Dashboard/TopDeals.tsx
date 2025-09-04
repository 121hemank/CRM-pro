import React from 'react';
import { DollarSign, Calendar, User } from 'lucide-react';

const TopDeals: React.FC = () => {
  const deals = [
    {
      id: 1,
      company: 'TechCorp Solutions',
      contact: 'Emily Rodriguez',
      value: 125000,
      stage: 'Proposal',
      closeDate: '2024-02-15',
      probability: 75
    },
    {
      id: 2,
      company: 'Global Industries',
      contact: 'David Kim',
      value: 89000,
      stage: 'Negotiation',
      closeDate: '2024-02-28',
      probability: 85
    },
    {
      id: 3,
      company: 'StartupX',
      contact: 'Alex Thompson',
      value: 45000,
      stage: 'Demo',
      closeDate: '2024-03-10',
      probability: 60
    },
    {
      id: 4,
      company: 'Enterprise Ltd',
      contact: 'Maria Garcia',
      value: 234000,
      stage: 'Proposal',
      closeDate: '2024-03-20',
      probability: 70
    }
  ];

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      'Demo': 'bg-blue-100 text-blue-800',
      'Proposal': 'bg-yellow-100 text-yellow-800',
      'Negotiation': 'bg-green-100 text-green-800',
      'Closed Won': 'bg-purple-100 text-purple-800'
    };
    return colors[stage] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Top Deals</h3>
          <p className="text-sm text-gray-600">High-value opportunities</p>
        </div>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View Pipeline
        </button>
      </div>

      <div className="space-y-4">
        {deals.map((deal) => (
          <div key={deal.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{deal.company}</h4>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <User className="w-3 h-3 mr-1" />
                  {deal.contact}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-lg font-bold text-gray-900">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {deal.value.toLocaleString()}
                </div>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStageColor(deal.stage)}`}>
                  {deal.stage}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-3 h-3 mr-1" />
                Close: {new Date(deal.closeDate).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Probability:</span>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${deal.probability}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-xs font-medium text-gray-700">{deal.probability}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDeals;