import React, { useState, useEffect } from 'react';
import { Users, UserPlus, BarChart3, Activity, Calendar, MessageSquare, Target, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const EmployeePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [myCustomers, setMyCustomers] = useState([]);
  const [myLeads, setMyLeads] = useState([]);
  const [myActivities, setMyActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'customers', label: 'My Customers', icon: Users },
    { id: 'leads', label: 'My Leads', icon: UserPlus },
    { id: 'activities', label: 'My Activities', icon: Activity },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'reports', label: 'Reports', icon: MessageSquare }
  ];

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      // Fetch assigned customers
      const { data: customers, error: customersError } = await supabase
        .from('contacts')
        .select('*')
        .limit(10);

      if (customersError) throw customersError;

      // Fetch assigned leads
      const { data: leads, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .limit(10);

      if (leadsError) throw leadsError;

      // Fetch activities
      const { data: activities, error: activitiesError } = await supabase
        .from('activities')
        .select('*')
        .limit(10);

      if (activitiesError) throw activitiesError;

      setMyCustomers(customers || []);
      setMyLeads(leads || []);
      setMyActivities(activities || []);
    } catch (error: any) {
      toast.error('Failed to fetch employee data');
    } finally {
      setLoading(false);
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">My Customers</p>
              <p className="text-2xl font-bold text-gray-900">{myCustomers.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Leads</p>
              <p className="text-2xl font-bold text-gray-900">{myLeads.length}</p>
            </div>
            <UserPlus className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month's Target</p>
              <p className="text-2xl font-bold text-gray-900">$45,000</p>
            </div>
            <Target className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Activities Today</p>
              <p className="text-2xl font-bold text-gray-900">{myActivities.length}</p>
            </div>
            <Activity className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">My Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">87%</div>
            <div className="text-sm text-gray-600">Target Achievement</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }}></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">23</div>
            <div className="text-sm text-gray-600">Deals Closed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.8</div>
            <div className="text-sm text-gray-600">Customer Rating</div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {myActivities.slice(0, 5).map((activity: any, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">{activity.subject}</p>
                  <p className="text-sm text-gray-500">{activity.type} - {new Date(activity.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-600">Completed</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMyCustomers = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">My Assigned Customers</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Customer</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Contact</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Last Contact</th>
              </tr>
            </thead>
            <tbody>
              {myCustomers.map((customer: any) => (
                <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-gray-900">
                      {customer.first_name} {customer.last_name}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-600">{customer.email}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-600">
                      {new Date(customer.created_at).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMyLeads = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">My Assigned Leads</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Lead</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Company</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Value</th>
              </tr>
            </thead>
            <tbody>
              {myLeads.map((lead: any) => (
                <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-gray-900">
                      {lead.first_name} {lead.last_name}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-600">{lead.company}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-gray-900">
                      ${(lead.value || 0).toLocaleString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'customers':
        return renderMyCustomers();
      case 'leads':
        return renderMyLeads();
      case 'activities':
        return <div className="text-center py-12 text-gray-500">Activity management for employees coming soon...</div>;
      case 'schedule':
        return <div className="text-center py-12 text-gray-500">Schedule management coming soon...</div>;
      case 'reports':
        return <div className="text-center py-12 text-gray-500">Employee reports coming soon...</div>;
      default:
        return renderOverview();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading employee panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-green-600" />
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
                        ? 'border-green-500 text-green-600'
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