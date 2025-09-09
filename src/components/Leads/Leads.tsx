import React, { useState } from 'react';
import LeadList from './LeadList';
import LeadSearch from './LeadSearch';
import LeadModal from './LeadModal';
import { Lead } from '../../types/Lead';
import { useLeads } from '../../hooks/useLeads';

const Leads: React.FC = () => {
  const { leads, loading, addLead } = useLeads();
  const [showModal, setShowModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('all');

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  const handleLeadCreate = () => {
    setSelectedLead(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedLead(null);
  };

  const handleSaveLead = async (leadData: any) => {
    return await addLead(leadData);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Lead Management</h2>
          <p className="text-gray-600 mt-1">Track and qualify potential customers</p>
        </div>
        <button
          onClick={handleLeadCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Add Lead
        </button>
      </div>

      <LeadSearch 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStage={filterStage}
        setFilterStage={setFilterStage}
      />

      <LeadList 
        searchTerm={searchTerm}
        filterStage={filterStage}
        leads={leads}
        loading={loading}
        onLeadSelect={handleLeadSelect}
      />

      {showModal && (
        <LeadModal
          lead={selectedLead}
          onSave={handleSaveLead}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Leads;