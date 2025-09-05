import React from 'react';
import StatsCards from './StatsCards';
import RecentActivities from './RecentActivities';
import SalesChart from './SalesChart';
import LeadFunnel from './LeadFunnel';
import TopDeals from './TopDeals';
import RevenueChart from './RevenueChart';
import DealDistributionChart from './DealDistributionChart';
import ConversionFunnelChart from './ConversionFunnelChart';
import CustomerSatisfactionChart from './CustomerSatisfactionChart';
import SalesPerformanceChart from './SalesPerformanceChart';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <StatsCards />
      
      {/* Revenue and Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <SalesPerformanceChart />
      </div>

      {/* Distribution and Conversion Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DealDistributionChart />
        <ConversionFunnelChart />
        <CustomerSatisfactionChart />
      </div>

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