import React from 'react';
import { Clock, Mail, Phone, Calendar, MessageSquare } from 'lucide-react';

const RecentActivities: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'email',
      title: 'Email sent to Sarah Johnson',
      description: 'Follow-up on product demo',
      time: '2 hours ago',
      icon: Mail,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 2,
      type: 'call',
      title: 'Call completed with Mike Chen',
      description: 'Discussed pricing and implementation',
      time: '4 hours ago',
      icon: Phone,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Demo scheduled with Acme Corp',
      description: 'Product demonstration next Tuesday',
      time: '6 hours ago',
      icon: Calendar,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      id: 4,
      type: 'note',
      title: 'Note added to Lisa Anderson',
      description: 'Customer expressed interest in enterprise plan',
      time: '1 day ago',
      icon: MessageSquare,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
          <p className="text-sm text-gray-600">Latest customer interactions</p>
        </div>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`p-2 rounded-lg ${activity.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  {activity.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivities;