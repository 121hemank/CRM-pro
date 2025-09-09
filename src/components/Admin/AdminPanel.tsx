import React, { useState, useEffect } from 'react';
import { Users, Building2, BarChart3, Settings, Shield, UserCheck } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'businesses', label: 'Business Profiles', icon: Building2 },
    { id: 'analytics', label: 'System Analytics', icon: BarChart3 },
    { id: 'settings', label: 'System Settings', icon: Settings }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch users with their roles and business profiles
      const { data: usersData, error: usersError } = await supabase
        .from('user_roles')
        .select(`
          *,
          business_profiles(*)
        `)
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;

      // Fetch all business profiles
      const { data: businessData, error: businessError } = await supabase
        .from('business_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (businessError) throw businessError;

      setUsers(usersData || []);
      setBusinesses(businessData || []);
    } catch (error: any) {
      toast.error('Failed to fetch admin data');
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;

      toast.success('User role updated successfully');
      fetchData();
    } catch (error: any) {
      toast.error('Failed to update user role');
    }
  };

  const renderUserManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
          <p className="text-sm text-gray-600">Manage user roles and permissions</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">User</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Business</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Role</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Joined</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <UserCheck className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.user_id}</div>
                        <div className="text-sm text-gray-500">ID: {user.user_id.slice(0, 8)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">
                      {user.business_profiles?.business_name || 'No Business'}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.user_id, e.target.value)}
                      className="border border-gray-300 rounded px-3 py-1 text-sm"
                    >
                      <option value="user">User</option>
                      <option value="employee">Employee</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-600">
                      {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBusinessProfiles = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business: any) => (
          <div key={business.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Building2 className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">{business.business_name}</h3>
                <p className="text-sm text-gray-600">{business.team_size}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Country:</span>
                <span className="font-medium">{business.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Currency:</span>
                <span className="font-medium">{business.currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Created:</span>
                <span className="font-medium">
                  {new Date(business.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            {business.website && (
              <div className="mt-4">
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Visit Website
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderSystemAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Businesses</p>
              <p className="text-2xl font-bold text-gray-900">{businesses.length}</p>
            </div>
            <Building2 className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Admin Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter((u: any) => u.role === 'admin').length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Employee Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter((u: any) => u.role === 'employee').length}
              </p>
            </div>
            <UserCheck className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return renderUserManagement();
      case 'businesses':
        return renderBusinessProfiles();
      case 'analytics':
        return renderSystemAnalytics();
      case 'settings':
        return <div className="text-center py-12 text-gray-500">System settings coming soon...</div>;
      default:
        return renderUserManagement();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
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
              <Shield className="w-8 h-8 text-red-600" />
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
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

export default AdminPanel;