import React from 'react';
import { Mail, Phone, MapPin, Calendar, Eye } from 'lucide-react';
import { Customer } from '../../types/Customer';

interface CustomerListProps {
  searchTerm: string;
  filterStatus: string;
  onCustomerSelect: (customer: Customer) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ searchTerm, filterStatus, onCustomerSelect }) => {
  const customers: Customer[] = [
    {
      id: 1,
      customerId: 'CUST-001',
      name: 'Sarah Johnson',
      email: 'sarah.j@techcorp.com',
      phone: '+1 (555) 123-4567',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      status: 'active',
      value: 125000,
      lastContact: '2024-01-15',
      tags: ['Enterprise', 'High Priority'],
      satisfactionScore: 4.8,
      websiteActivity: {
        pageViews: 245,
        timeSpent: 120,
        featuresUsed: ['Dashboard', 'Reports', 'API'],
        lastVisit: '2024-01-16'
      },
      products: [
        {
          productId: 'PROD-001',
          productName: 'CRM Professional',
          productCode: 'CRM-PRO',
          purchaseDate: '2023-12-01',
          value: 125000,
          quantity: 1
        }
      ]
    },
    {
      id: 2,
      customerId: 'CUST-002',
      name: 'Mike Chen',
      email: 'mchen@globalind.com',
      phone: '+1 (555) 987-6543',
      company: 'Global Industries',
      location: 'New York, NY',
      status: 'active',
      value: 89000,
      lastContact: '2024-01-14',
      tags: ['SMB', 'Monthly Plan'],
      satisfactionScore: 4.2
    },
    {
      id: 3,
      customerId: 'CUST-003',
      name: 'Emily Rodriguez',
      email: 'emily@startupx.io',
      phone: '+1 (555) 456-7890',
      company: 'StartupX',
      location: 'Austin, TX',
      status: 'prospect',
      value: 45000,
      lastContact: '2024-01-12',
      tags: ['Startup', 'Growth'],
      satisfactionScore: 3.9
    },
    {
      id: 4,
      customerId: 'CUST-004',
      name: 'David Kim',
      email: 'david.kim@enterprise.com',
      phone: '+1 (555) 321-0987',
      company: 'Enterprise Ltd',
      location: 'Seattle, WA',
      status: 'inactive',
      value: 234000,
      lastContact: '2024-01-08',
      tags: ['Enterprise', 'Renewal'],
      satisfactionScore: 4.5
    }
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      prospect: 'bg-blue-100 text-blue-800',
      inactive: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Customer</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Contact</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Value</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Last Contact</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div>
                    <div className="font-semibold text-gray-900">{customer.name}</div>
                    <div className="text-sm text-gray-600">{customer.company}</div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {customer.location}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-3 h-3 mr-2" />
                      {customer.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-3 h-3 mr-2" />
                      {customer.phone}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                  </span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {customer.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="font-semibold text-gray-900">
                    ${customer.value.toLocaleString()}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(customer.lastContact).toLocaleDateString()}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => onCustomerSelect(customer)}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;