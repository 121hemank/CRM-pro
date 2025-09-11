import React from 'react';
import { useState } from 'react';
import PipelineBoard from './PipelineBoard';
import PipelineStats from './PipelineStats';
import DealModal from './DealModal';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const Pipeline: React.FC = () => {
  const [showDealModal, setShowDealModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);

  const handleAddDeal = () => {
    setShowDealModal(true);
  };

  const handleSaveDeal = async (dealData: any) => {
    try {
      const { error } = await supabase
        .from('deals')
        .insert([dealData]);

      if (error) throw error;

      toast.success('Deal created successfully');
      return true;
    } catch (error: any) {
      toast.error('Failed to create deal');
      return false;
    }
  };

  const handleLogActivity = () => {
    setShowActivityModal(true);
  };

  const handleSaveActivity = async (activityData: any) => {
    try {
      const { error } = await supabase
        .from('activities')
        .insert([activityData]);

      if (error) throw error;

      toast.success('Activity logged successfully');
      setShowActivityModal(false);
      return true;
    } catch (error: any) {
      toast.error('Failed to log activity');
      return false;
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sales Pipeline</h2>
          <p className="text-gray-600 mt-1">Visualize and manage your sales process</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleLogActivity}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Log Activity
          </button>
          <button 
            onClick={handleAddDeal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Add Deal
          </button>
        </div>
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

      {showActivityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Log Activity</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              handleSaveActivity({
                type: formData.get('type'),
                subject: formData.get('subject'),
                description: formData.get('description')
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select name="type" className="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option value="call">Call</option>
                    <option value="email">Email</option>
                    <option value="meeting">Meeting</option>
                    <option value="note">Note</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input name="subject" type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea name="description" rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2"></textarea>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowActivityModal(false)} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg">Log Activity</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pipeline;