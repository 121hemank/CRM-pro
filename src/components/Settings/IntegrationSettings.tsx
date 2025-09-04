import React from 'react';
import { Mail, Calendar, MessageSquare, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const IntegrationSettings: React.FC = () => {
  const integrations = [
    {
      id: 'gmail',
      name: 'Gmail',
      description: 'Sync emails and track communications',
      icon: Mail,
      connected: true,
      color: 'text-red-600'
    },
    {
      id: 'calendar',
      name: 'Google Calendar',
      description: 'Sync meetings and appointments',
      icon: Calendar,
      connected: true,
      color: 'text-blue-600'
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get notifications in Slack channels',
      icon: MessageSquare,
      connected: false,
      color: 'text-purple-600'
    },
    {
      id: 'docusign',
      name: 'DocuSign',
      description: 'Send and track contract signatures',
      icon: FileText,
      connected: false,
      color: 'text-yellow-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Third-party Integrations</h3>
        <p className="text-sm text-gray-600">Connect your CRM with external tools and services</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          return (
            <div key={integration.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg bg-gray-50`}>
                    <Icon className={`w-5 h-5 ${integration.color}`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{integration.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{integration.description}</p>
                    <div className="flex items-center mt-2">
                      {integration.connected ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">Connected</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-500">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">Not Connected</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    integration.connected
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {integration.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">API Configuration</h4>
        <p className="text-sm text-blue-700 mb-3">Configure API settings for custom integrations</p>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">
              API Endpoint
            </label>
            <input
              type="text"
              value="https://api.crmpro.com/v1"
              readOnly
              className="w-full border border-blue-200 rounded px-3 py-2 bg-white text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">
              API Key
            </label>
            <div className="flex space-x-2">
              <input
                type="password"
                value="sk_live_abcd1234efgh5678"
                readOnly
                className="flex-1 border border-blue-200 rounded px-3 py-2 bg-white text-sm"
              />
              <button className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                Regenerate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationSettings;