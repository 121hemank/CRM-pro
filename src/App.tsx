import React, { useState } from 'react';
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

type View = 'dashboard' | 'customers' | 'leads' | 'pipeline' | 'activities' | 'analytics' | 'products' | 'feedback' | 'performance' | 'settings';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
}

export default App;