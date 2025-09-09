import React from 'react';
import { Search, Filter, Download, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface LeadSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStage: string;
  setFilterStage: (stage: string) => void;
}

const LeadSearch: React.FC<LeadSearchProps> = ({
  searchTerm,
  setSearchTerm,
  filterStage,
  setFilterStage
}) => {
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      const { data: leads, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Convert to CSV
      const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Company', 'Status', 'Source', 'Value'];
      const csvContent = [
        headers.join(','),
        ...leads.map(lead => [
          lead.first_name,
          lead.last_name,
          lead.email,
          lead.phone || '',
          lead.company || '',
          lead.status,
          lead.source || '',
          lead.value || 0
        ].join(','))
      ].join('\n');

      // Download file
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success('Leads exported successfully');
    } catch (error: any) {
      toast.error('Failed to export leads');
    } finally {
      setExporting(false);
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setImporting(true);
      try {
        const text = await file.text();
        const lines = text.split('\n');
        const headers = lines[0].split(',');
        
        const leads = lines.slice(1).map(line => {
          const values = line.split(',');
          return {
            first_name: values[0],
            last_name: values[1],
            email: values[2],
            phone: values[3],
            company: values[4],
            status: values[5] || 'new',
            source: values[6] || 'Import',
            value: parseFloat(values[7]) || 0
          };
        }).filter(lead => lead.first_name && lead.email);

        const { error } = await supabase
          .from('leads')
          .insert(leads);

        if (error) throw error;

        toast.success(`${leads.length} leads imported successfully`);
      } catch (error: any) {
        toast.error('Failed to import leads');
      } finally {
        setImporting(false);
      }
    };
    input.click();
  };
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads, companies, sources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Stages</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="proposal">Proposal</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg px-4 py-2 transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">{exporting ? 'Exporting...' : 'Export'}</span>
          </button>
          <button 
            onClick={handleImport}
            disabled={importing}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 transition-colors disabled:opacity-50"
          >
            <UserPlus className="w-4 h-4" />
            <span className="text-sm font-medium">{importing ? 'Importing...' : 'Import Leads'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadSearch;