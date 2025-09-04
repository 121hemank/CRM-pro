import React from 'react';
import { Mail, Phone, Calendar, Star, Eye, DollarSign } from 'lucide-react';
import { Lead } from '../../types/Lead';

interface LeadListProps {
  searchTerm: string;
  filterStage: string;
  onLeadSelect: (lead: Lead) => void;
}

const LeadList: React.FC<LeadListProps> = ({ searchTerm, filterStage, onLeadSelect }) => {
  const leads: Lead[] = [
    {
      id: 1,
      leadId: 'LEAD-001',
      name: 'Alex Thompson',
      email: 'alex@newcompany.com',
      phone: '+1 (555) 111-2222',
      company: 'New Company Inc',
      stage: 'qualified',
      score: 85,
      value: 75000,
      source: 'Website',
      assignedTo: 'John Doe',
      lastContact: '2024-01-16',
      notes: 'Interested in enterprise solution',
      timeToClose: 25,
      interactions: [
        {
          id: 1,
          type: 'email',
          date: '2024-01-16',
          notes: 'Sent product information and pricing',
          channel: 'email'
        }
      ]
    },
    {
      id: 2,
      leadId: 'LEAD-002',
      name: 'Jessica Lee',
      email: 'j.lee@futuretech.com',
      phone: '+1 (555) 333-4444',
      company: 'Future Tech',
      stage: 'contacted',
      score: 72,
      value: 120000,
      source: 'LinkedIn',
      assignedTo: 'Jane Smith',
      lastContact: '2024-01-15',
      notes: 'Demo scheduled for next week',
      timeToClose: 18,
      interactions: []
    },
    {
      id: 3,
      leadId: 'LEAD-003',
      name: 'Robert Wilson',
      email: 'rwilson@innovate.io',
      phone: '+1 (555) 555-6666',
      company: 'Innovate Solutions',
      stage: 'new',
      score: 45,
      value: 35000,
      source: 'Cold Email',
      assignedTo: 'Mike Johnson',
      lastContact: '2024-01-14',
      notes: 'Initial contact made',
      interactions: []
    }
  ];

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStage === 'all' || lead.stage === filterStage;
    return matchesSearch && matchesFilter;
  });

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      qualified: 'bg-green-100 text-green-800',
      proposal: 'bg-purple-100 text-purple-800'
    };
    return colors[stage] || 'bg-gray-100 text-gray-800';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Lead</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Contact</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Stage</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Score</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Value</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Assigned</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div>
                    <div className="font-semibold text-gray-900">{lead.name}</div>
                    <div className="text-sm text-gray-600">{lead.company}</div>
                    <div className="text-xs text-gray-500 mt-1">Source: {lead.source}</div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-3 h-3 mr-2" />
                      {lead.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-3 h-3 mr-2" />
                      {lead.phone}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStageColor(lead.stage)}`}>
                    {lead.stage.charAt(0).toUpperCase() + lead.stage.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <Star className={`w-4 h-4 ${getScoreColor(lead.score)}`} />
                    <span className={`font-semibold ${getScoreColor(lead.score)}`}>
                      {lead.score}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center font-semibold text-gray-900">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {lead.value.toLocaleString()}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm text-gray-600">{lead.assignedTo}</div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(lead.lastContact).toLocaleDateString()}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => onLeadSelect(lead)}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadList;