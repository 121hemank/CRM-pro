import React from 'react';
import { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  UserPlus, 
  GitBranch, 
  Activity, 
  PieChart, 
  Package,
  MessageSquare,
  TrendingUp,
  Settings,
  ChevronLeft,
  ChevronRight,
  Crown
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ProUpgradeModal from './ProUpgradeModal';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen, onToggle }) => {
  const { isPro } = useAuth();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'leads', label: 'Leads', icon: UserPlus },
    { id: 'pipeline', label: 'Pipeline', icon: GitBranch },
    { id: 'activities', label: 'Activities', icon: Activity },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-lg transition-all duration-300 z-30 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {isOpen && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-800">CRM Pro</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isOpen ? (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left transition-all duration-200 hover:bg-blue-50 ${
                isActive 
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              {isOpen && (
                <span className={`ml-3 font-medium ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {isOpen && !isPro && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <Crown className="w-4 h-4 text-yellow-300" />
              <h4 className="font-semibold text-sm">Upgrade to Pro</h4>
            </div>
            <p className="text-xs text-purple-100 mt-1">Get advanced analytics and automation</p>
            <button 
              onClick={() => setShowUpgradeModal(true)}
              className="mt-2 bg-white text-purple-600 px-3 py-1 rounded text-xs font-medium hover:bg-purple-50 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      )}

      {isOpen && isPro && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-4 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <Crown className="w-4 h-4" />
              <h4 className="font-semibold text-sm">CRM Pro Active</h4>
            </div>
            <p className="text-xs text-yellow-100">You have access to all premium features</p>
          </div>
        </div>
      )}

      <ProUpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)} 
      />
    </div>
  );
};

export default Sidebar;