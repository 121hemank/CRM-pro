import React from 'react';
import RevenueChart from './RevenueChart';
import ConversionMetrics from './ConversionMetrics';
import PerformanceTable from './PerformanceTable';

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
        <p className="text-gray-600 mt-1">Comprehensive insights into your sales performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <ConversionMetrics />
      </div>

      <PerformanceTable />
    </div>
  );
};

export default Analytics;