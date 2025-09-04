import React from 'react';
import { DollarSign, Calendar, User } from 'lucide-react';

interface Deal {
  id: number;
  title: string;
  company: string;
  contact: string;
  value: number;
  closeDate: string;
  probability: number;
}

const PipelineBoard: React.FC = () => {
  const stages = [
    {
      id: 'prospecting',
      title: 'Prospecting',
      deals: [
        { id: 1, title: 'Enterprise Software Deal', company: 'TechCorp', contact: 'Sarah Johnson', value: 125000, closeDate: '2024-03-15', probability: 25 },
        { id: 2, title: 'Cloud Migration', company: 'StartupX', contact: 'Alex Thompson', value: 45000, closeDate: '2024-03-20', probability: 30 }
      ]
    },
    {
      id: 'qualification',
      title: 'Qualification',
      deals: [
        { id: 3, title: 'CRM Implementation', company: 'Global Industries', contact: 'Mike Chen', value: 89000, closeDate: '2024-02-28', probability: 50 },
        { id: 4, title: 'API Integration', company: 'Future Tech', contact: 'Jessica Lee', value: 67000, closeDate: '2024-03-10', probability: 45 }
      ]
    },
    {
      id: 'proposal',
      title: 'Proposal',
      deals: [
        { id: 5, title: 'Digital Transformation', company: 'Enterprise Ltd', contact: 'David Kim', value: 234000, closeDate: '2024-02-20', probability: 75 }
      ]
    },
    {
      id: 'negotiation',
      title: 'Negotiation',
      deals: [
        { id: 6, title: 'Marketing Automation', company: 'Growth Co', contact: 'Lisa Anderson', value: 156000, closeDate: '2024-02-15', probability: 85 }
      ]
    }
  ];

  const getTotalValue = (deals: Deal[]) => {
    return deals.reduce((sum, deal) => sum + deal.value, 0);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {stages.map((stage) => (
          <div key={stage.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{stage.title}</h3>
              <div className="text-sm text-gray-600">
                ${getTotalValue(stage.deals).toLocaleString()}
              </div>
            </div>

            <div className="space-y-3">
              {stage.deals.map((deal) => (
                <div key={deal.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                  <h4 className="font-medium text-gray-900 mb-2">{deal.title}</h4>
                  
                  <div className="space-y-2 text-sm">
                    <div className="font-medium text-gray-700">{deal.company}</div>
                    
                    <div className="flex items-center text-gray-600">
                      <User className="w-3 h-3 mr-1" />
                      {deal.contact}
                    </div>
                    
                    <div className="flex items-center text-gray-900 font-semibold">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {deal.value.toLocaleString()}
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(deal.closeDate).toLocaleDateString()}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Probability</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-12 bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${deal.probability}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-700">{deal.probability}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineBoard;