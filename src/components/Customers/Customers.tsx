import React, { useState } from 'react';
import CustomerList from './CustomerList';
import CustomerSearch from './CustomerSearch';
import CustomerModal from './CustomerModal';
import { Customer } from '../../types/Customer';

const Customers: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleCustomerCreate = () => {
    setSelectedCustomer(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedCustomer(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
          <p className="text-gray-600 mt-1">Manage your customer relationships and data</p>
        </div>
        <button
          onClick={handleCustomerCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Add Customer
        </button>
      </div>

      <CustomerSearch 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <CustomerList 
        searchTerm={searchTerm}
        filterStatus={filterStatus}
        onCustomerSelect={handleCustomerSelect}
      />

      {showModal && (
        <CustomerModal
          customer={selectedCustomer}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Customers;