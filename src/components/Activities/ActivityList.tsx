import React from 'react';
import { Mail, Phone, Calendar, MessageSquare, FileText, Clock, User } from 'lucide-react';

interface Activity {
  id: number;
  type: 'email' | 'call' | 'meeting' | 'note' | 'task';
  title: string;
  description: string;
  customer: string;
  company: string;
  assignedTo: string;
  timestamp: string;
  duration?: string;
}

interface ActivityListProps {
  searchTerm: string;
  filterType: string;
  filterDate: string;
}

const ActivityList: React.FC<ActivityListProps> = ({ searchTerm, filterType, filterDate }) => {
  const activities: Activity[] = [
    {
      id: 1,
      type: 'email',
      title: 'Follow-up Email Sent',
      description: 'Sent pricing information and next steps',
      customer: 'Sarah Johnson',
      company: 'TechCorp Solutions',
      assignedTo: 'John Doe',
      timestamp: '2024-01-16T10:30:00Z',
    },
    {
      id: 2,
      type: 'call',
      title: 'Discovery Call Completed',
      description: 'Discussed requirements and pain points',
      customer: 'Mike Chen',
      company: 'Global Industries',
      assignedTo: 'Jane Smith',
      timestamp: '2024-01-16T09:15:00Z',
      duration: '45 min'
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Product Demo Scheduled',
      description: 'Demo meeting set for next Tuesday at 2 PM',
      customer: 'Emily Rodriguez',
      company: 'StartupX',
      assignedTo: 'Mike Johnson',
      timestamp: '2024-01-15T14:20:00Z',
    },
    {
      id: 4,
      type: 'note',
      title: 'Customer Note Added',
      description: 'Customer expressed strong interest in enterprise features',
      customer: 'David Kim',
      company: 'Enterprise Ltd',
      assignedTo: 'John Doe',
      timestamp: '2024-01-15T11:45:00Z',
    },
    {
      id: 5,
      type: 'task',
      title: 'Follow-up Task Created',
      description: 'Send contract proposal by end of week',
      customer: 'Lisa Anderson',
      company: 'Growth Co',
      assignedTo: 'Jane Smith',
      timestamp: '2024-01-14T16:30:00Z',
    }
  ];

  const getActivityIcon = (type: string) => {
    const icons = {
      email: Mail,
      call: Phone,
      meeting: Calendar,
      note: MessageSquare,
      task: FileText
    };
    return icons[type as keyof typeof icons] || MessageSquare;
  };

  const getActivityColor = (type: string) => {
    const colors = {
      email: 'text-blue-600 bg-blue-100',
      call: 'text-green-600 bg-green-100',
      meeting: 'text-purple-600 bg-purple-100',
      note: 'text-orange-600 bg-orange-100',
      task: 'text-red-600 bg-red-100'
    };
    return colors[type as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || activity.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6">
        <div className="space-y-4">
          {filteredActivities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`p-3 rounded-lg ${getActivityColor(activity.type)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      
                      <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {activity.customer} • {activity.company}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatTimestamp(activity.timestamp)}
                        </div>
                        {activity.duration && (
                          <div>Duration: {activity.duration}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Assigned to</div>
                      <div className="font-medium text-gray-900">{activity.assignedTo}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActivityList;