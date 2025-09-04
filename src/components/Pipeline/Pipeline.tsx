import React from 'react';
import PipelineBoard from './PipelineBoard';
import PipelineStats from './PipelineStats';

const Pipeline: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sales Pipeline</h2>
          <p className="text-gray-600 mt-1">Visualize and manage your sales process</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Add Deal
        </button>
      </div>

      <PipelineStats />
      <PipelineBoard />
    </div>
  );
};

export default Pipeline;