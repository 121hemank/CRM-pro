import React, { useState } from 'react';
import { Users, UserPlus, BarChart3, Activity, Calendar, MessageSquare } from 'lucide-react';

const EmployeePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'customers', label: 'My Customers', icon: Users },
    { id: 'leads', label: 'My Leads', icon: UserPlus },
    { id: 'activities', label: 'My Activities', icon: Activity },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'reports', label: 'Reports', icon: MessageSquare }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">My Customers</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Leads</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <UserPlus className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month's Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$45,230</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Activities Today</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <Activity className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {[
            { type: 'call', customer: 'John Smith', time: '2 hours ago', status: 'completed' },
            { type: 'email', customer: 'Sarah Johnson', time: '4 hours ago', status: 'sent' },
            { type: 'meeting', customer: 'Mike Chen', time: '1 day ago', status: 'scheduled' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900 capitalize">{activity.type} with {activity.customer}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-600 capitalize">{activity.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'customers':
        return <div className="text-center py-12 text-gray-500">Customer management for employees coming soon...</div>;
      case 'leads':
        return <div className="text-center py-12 text-gray-500">Lead management for employees coming soon...</div>;
      case 'activities':
        return <div className="text-center py-12 text-gray-500">Activity tracking for employees coming soon...</div>;
      case 'schedule':
        return <div className="text-center py-12 text-gray-500">Schedule management coming soon...</div>;
      case 'reports':
        return <div className="text-center py-12 text-gray-500">Employee reports coming soon...</div>;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Employee Dashboard</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePanel;