import React from 'react';
import { Star, Smile } from 'lucide-react';

const CustomerSatisfactionChart: React.FC = () => {
  const satisfactionData = [
    { rating: 5, count: 234, percentage: 47, color: 'bg-green-500' },
    { rating: 4, count: 156, percentage: 31, color: 'bg-blue-500' },
    { rating: 3, count: 67, percentage: 13, color: 'bg-yellow-500' },
    { rating: 2, count: 28, percentage: 6, color: 'bg-orange-500' },
    { rating: 1, count: 15, percentage: 3, color: 'bg-red-500' },
  ];

  const totalResponses = satisfactionData.reduce((sum, item) => sum + item.count, 0);
  const averageRating = satisfactionData.reduce((sum, item) => sum + (item.rating * item.count), 0) / totalResponses;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Customer Satisfaction</h3>
          <p className="text-sm text-gray-600">Feedback ratings distribution</p>
        </div>
        <Smile className="w-5 h-5 text-green-600" />
      </div>

      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${
                star <= Math.round(averageRating) 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <div className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
        <div className="text-sm text-gray-600">{totalResponses} responses</div>
      </div>

      <div className="space-y-3">
        {satisfactionData.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 w-12">
              <span className="text-sm font-medium text-gray-700">{item.rating}</span>
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
            </div>
            
            <div className="flex-1">
              <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full ${item.color} transition-all duration-1000 ease-out`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="text-right w-16">
              <div className="text-sm font-medium text-gray-900">{item.count}</div>
              <div className="text-xs text-gray-500">{item.percentage}%</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">78%</div>
            <div className="text-xs text-gray-600">Satisfied (4-5★)</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-600">9%</div>
            <div className="text-xs text-gray-600">Unsatisfied (1-2★)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSatisfactionChart;