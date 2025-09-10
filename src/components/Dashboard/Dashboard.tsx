import React from 'react';
import StatsCards from './StatsCards';
import RecentActivities from './RecentActivities';
import SalesChart from './SalesChart';
import LeadFunnel from './LeadFunnel';
import TopDeals from './TopDeals';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome to your CRM overview</p>
        </div>
      </div>

      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <LeadFunnel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivities />
        <TopDeals />
      </div>
    </div>
  );
};

export default Dashboard;