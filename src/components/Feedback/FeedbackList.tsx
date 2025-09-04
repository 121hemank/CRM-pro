import React from 'react';
import { Star, Calendar, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { CustomerFeedback } from '../../types/Product';

interface FeedbackListProps {
  searchTerm: string;
  filterCategory: string;
  filterRating: string;
  onFeedbackSelect: (feedback: CustomerFeedback) => void;
}

const FeedbackList: React.FC<FeedbackListProps> = ({ 
  searchTerm, 
  filterCategory, 
  filterRating, 
  onFeedbackSelect 
}) => {
  const feedbacks: CustomerFeedback[] = [
    {
      id: 1,
      customerId: 'CUST-001',
      rating: 5,
      comment: 'Excellent service and support. The CRM system has improved our sales process significantly.',
      category: 'product',
      date: '2024-01-15',
      resolved: true
    },
    {
      id: 2,
      customerId: 'CUST-002',
      rating: 4,
      comment: 'Good overall experience, but the mobile app could use some improvements.',
      category: 'product',
      date: '2024-01-14',
      resolved: false
    },
    {
      id: 3,
      customerId: 'CUST-003',
      rating: 2,
      comment: 'Support response time was too slow. Took 3 days to get a response.',
      category: 'support',
      date: '2024-01-13',
      resolved: false
    },
    {
      id: 4,
      customerId: 'CUST-004',
      rating: 5,
      comment: 'Amazing customer service! The team went above and beyond to help us.',
      category: 'service',
      date: '2024-01-12',
      resolved: true
    }
  ];

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = feedback.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || feedback.category === filterCategory;
    const matchesRating = filterRating === 'all' || feedback.rating.toString() === filterRating;
    return matchesSearch && matchesCategory && matchesRating;
  });

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      product: 'bg-blue-100 text-blue-800',
      service: 'bg-green-100 text-green-800',
      support: 'bg-purple-100 text-purple-800',
      overall: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="space-y-4">
          {filteredFeedbacks.map((feedback) => (
            <div 
              key={feedback.id} 
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer"
              onClick={() => onFeedbackSelect(feedback)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(feedback.rating)}
                  </div>
                  <span className={`font-semibold ${getRatingColor(feedback.rating)}`}>
                    {feedback.rating}/5
                  </span>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(feedback.category)}`}>
                    {feedback.category.charAt(0).toUpperCase() + feedback.category.slice(1)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {feedback.resolved ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Resolved</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Pending</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-gray-700">{feedback.comment}</p>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    Customer: {feedback.customerId}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(feedback.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackList;