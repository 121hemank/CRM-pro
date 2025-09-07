import React, { useState } from 'react';
import { useCustomers } from '../../hooks/useCustomers';
import { useAuth } from '../../contexts/AuthContext';
import CustomerList from './CustomerList';
import CustomerSearch from './CustomerSearch';
import CustomerModal from './CustomerModal';
import { Customer } from '../../types/Customer';

const Customers: React.FC = () => {
  const { isPro } = useAuth();
  const { customers, loading, addCustomer } = useCustomers();
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleCustomerSelect = (customer: Customer) => {
    if (!isPro && customers.length > 10) {
      // Limit free users to 10 customers
      return;
    }
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleCustomerCreate = () => {
    if (!isPro && customers.length >= 10) {
      alert('Upgrade to Pro to add more than 10 customers');
      return;
    }
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
          <p className="text-gray-600 mt-1">
            Manage your customer relationships and data
            {!isPro && (
              <span className="text-orange-600 ml-2">
                ({customers.length}/10 customers - Upgrade to Pro for unlimited)
              </span>
            )}
          </p>
        </div>
        <button
          onClick={handleCustomerCreate}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            !isPro && customers.length >= 10
              ? 'bg-gray-400 cursor-not-allowed text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          disabled={!isPro && customers.length >= 10}
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
        customers={customers}
        loading={loading}
        searchTerm={searchTerm}
        filterStatus={filterStatus}
        onCustomerSelect={handleCustomerSelect}
      />

      {showModal && (
        <CustomerModal
          customer={selectedCustomer}
          onSave={addCustomer}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Customers;