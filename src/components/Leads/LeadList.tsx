import React from 'react';
import { Mail, Phone, Calendar, Star, Eye, DollarSign } from 'lucide-react';
import { Lead } from '../../types/Lead';

interface LeadListProps {
  searchTerm: string;
  filterStage: string;
  leads: any[];
  loading: boolean;
  onLeadSelect: (lead: Lead) => void;
}

const LeadList: React.FC<LeadListProps> = ({ searchTerm, filterStage, leads, loading, onLeadSelect }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leads...</p>
        </div>
      </div>
    );
  }

  const filteredLeads = leads.filter(lead => {
    const fullName = `${lead.first_name} ${lead.last_name}`;
    const matchesSearch = fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (lead.company || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStage === 'all' || lead.status === filterStage;
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
      {filteredLeads.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-gray-500">No leads found</p>
        </div>
      ) : (
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
                    <div className="font-semibold text-gray-900">{lead.first_name} {lead.last_name}</div>
                    <div className="text-sm text-gray-600">{lead.company || 'N/A'}</div>
                    <div className="text-xs text-gray-500 mt-1">Source: {lead.source || 'N/A'}</div>
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
                      {lead.phone || 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStageColor(lead.status)}`}>
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <Star className={`w-4 h-4 ${getScoreColor(lead.probability || 50)}`} />
                    <span className={`font-semibold ${getScoreColor(lead.probability || 50)}`}>
                      {lead.probability || 50}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center font-semibold text-gray-900">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {(lead.value || 0).toLocaleString()}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm text-gray-600">{lead.assigned_to || 'Unassigned'}</div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(lead.created_at).toLocaleDateString()}
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
      )}
    </div>
  );
};

export default LeadList;