import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import LoginPage from './components/Auth/LoginPage';
import AdminLogin from './components/Admin/AdminLogin';
import EmployeeLogin from './components/Employee/EmployeeLogin';
import AdminPanel from './components/Admin/AdminPanel';
import EmployeePanel from './components/Employee/EmployeePanel';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Customers from './components/Customers/Customers';
import Leads from './components/Leads/Leads';
import Pipeline from './components/Pipeline/Pipeline';
import Activities from './components/Activities/Activities';
import Analytics from './components/Analytics/Analytics';
import Products from './components/Products/Products';
import Feedback from './components/Feedback/Feedback';
import SalesPerformance from './components/Analytics/SalesPerformance';
import Settings from './components/Settings/Settings';

const AppContent: React.FC = () => {
  const [loginType, setLoginType] = useState<'user' | 'admin' | 'employee'>('user');
  
  const { user, loading, userRole } = useAuth();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (loginType === 'admin') {
      return (
        <div>
          <AdminLogin />
          <button onClick={() => setLoginType('user')} className="fixed top-4 left-4 text-blue-600">← Back to User Login</button>
        </div>
      );
    }
    if (loginType === 'employee') {
      return (
        <div>
          <EmployeeLogin />
          <button onClick={() => setLoginType('user')} className="fixed top-4 left-4 text-blue-600">← Back to User Login</button>
        </div>
      );
    }
    return (
      <div>
        <LoginPage />
        <div className="fixed top-4 right-4 space-x-2">
          <button onClick={() => setLoginType('admin')} className="bg-red-600 text-white px-3 py-1 rounded text-sm">Admin Login</button>
          <button onClick={() => setLoginType('employee')} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Employee Login</button>
        </div>
      </div>
    );
  }

  // Role-based routing
  if (userRole === 'admin') {
    return <AdminPanel />;
  }

  if (userRole === 'employee') {
    return <EmployeePanel />;
  }
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'customers':
        return <Customers />;
      case 'leads':
        return <Leads />;
      case 'pipeline':
        return <Pipeline />;
      case 'activities':
        return <Activities />;
      case 'analytics':
        return <Analytics />;
      case 'products':
        return <Products />;
      case 'feedback':
        return <Feedback />;
      case 'performance':
        return <SalesPerformance />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <Header 
          currentView={currentView}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

type View = 'dashboard' | 'customers' | 'leads' | 'pipeline' | 'activities' | 'analytics' | 'products' | 'feedback' | 'performance' | 'settings';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <AppContent />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;