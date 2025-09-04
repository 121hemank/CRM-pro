import React from 'react';
import { Search, Bell, Menu, User } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onMenuToggle }) => {
  const getPageTitle = () => {
    const titles: Record<string, string> = {
      dashboard: 'Dashboard',
      customers: 'Customer Management',
      leads: 'Lead Management',
      pipeline: 'Sales Pipeline',
      activities: 'Activities',
      analytics: 'Analytics & Reports',
      products: 'Product Management',
      feedback: 'Customer Feedback',
      performance: 'Sales Performance',
      settings: 'Settings'
    };
    return titles[currentView] || 'Dashboard';
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers, deals, activities..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-700">John Doe</p>
              <p className="text-xs text-gray-500">Sales Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;