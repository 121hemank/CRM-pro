import React, { useState } from 'react';
import ActivityList from './ActivityList';
import ActivitySearch from './ActivitySearch';

const Activities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Activities</h2>
          <p className="text-gray-600 mt-1">Track all customer interactions and communications</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Log Activity
        </button>
      </div>

      <ActivitySearch 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
      />

      <ActivityList 
        searchTerm={searchTerm}
        filterType={filterType}
        filterDate={filterDate}
      />
    </div>
  );
};

export default Activities;