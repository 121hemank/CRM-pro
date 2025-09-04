import React, { useState } from 'react';
import UserSettings from './UserSettings';
import SystemSettings from './SystemSettings';
import IntegrationSettings from './IntegrationSettings';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('user');

  const tabs = [
    { id: 'user', label: 'User Settings' },
    { id: 'system', label: 'System' },
    { id: 'integrations', label: 'Integrations' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'user':
        return <UserSettings />;
      case 'system':
        return <SystemSettings />;
      case 'integrations':
        return <IntegrationSettings />;
      default:
        return <UserSettings />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-1">Manage your CRM configuration and preferences</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;