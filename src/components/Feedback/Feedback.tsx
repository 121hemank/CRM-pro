import React, { useState } from 'react';
import FeedbackList from './FeedbackList';
import FeedbackSearch from './FeedbackSearch';
import FeedbackModal from './FeedbackModal';
import { CustomerFeedback } from '../../types/Product';

const Feedback: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<CustomerFeedback | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterRating, setFilterRating] = useState('all');

  const handleFeedbackSelect = (feedback: CustomerFeedback) => {
    setSelectedFeedback(feedback);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedFeedback(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Feedback</h2>
          <p className="text-gray-600 mt-1">Monitor customer satisfaction and feedback</p>
        </div>
      </div>

      <FeedbackSearch 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterRating={filterRating}
        setFilterRating={setFilterRating}
      />

      <FeedbackList 
        searchTerm={searchTerm}
        filterCategory={filterCategory}
        filterRating={filterRating}
        onFeedbackSelect={handleFeedbackSelect}
      />

      {showModal && (
        <FeedbackModal
          feedback={selectedFeedback}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Feedback;