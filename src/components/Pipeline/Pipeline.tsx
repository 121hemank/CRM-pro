import React from 'react';
import { useState } from 'react';
import PipelineBoard from './PipelineBoard';
import PipelineStats from './PipelineStats';
import DealModal from './DealModal';

const Pipeline: React.FC = () => {
  const [showDealModal, setShowDealModal] = useState(false);

  const handleAddDeal = () => {
    setShowDealModal(true);
  };

  const handleSaveDeal = async (dealData: any) => {
    // TODO: Implement deal saving logic
    console.log('Saving deal:', dealData);
    return true;
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sales Pipeline</h2>
          <p className="text-gray-600 mt-1">Visualize and manage your sales process</p>
        </div>
        <button 
          onClick={handleAddDeal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Add Deal
        </button>
      </div>

      <PipelineStats />
      <PipelineBoard />

      {showDealModal && (
        <DealModal
          deal={null}
          onSave={handleSaveDeal}
          onClose={() => setShowDealModal(false)}
        />
      )}
    </div>
  );
};

export default Pipeline;