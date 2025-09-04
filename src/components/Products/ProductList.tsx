import React from 'react';
import { Package, DollarSign, Calendar, Eye, Tag } from 'lucide-react';
import { Product } from '../../types/Product';

interface ProductListProps {
  searchTerm: string;
  filterCategory: string;
  onProductSelect: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ searchTerm, filterCategory, onProductSelect }) => {
  const products: Product[] = [
    {
      id: 1,
      productId: 'PROD-001',
      productCode: 'CRM-PRO',
      name: 'CRM Professional',
      description: 'Advanced CRM solution for enterprise customers',
      category: 'Software',
      price: 99.99,
      status: 'active',
      features: ['Lead Management', 'Analytics', 'API Access'],
      createdDate: '2024-01-01'
    },
    {
      id: 2,
      productId: 'PROD-002',
      productCode: 'CRM-STD',
      name: 'CRM Standard',
      description: 'Standard CRM solution for small businesses',
      category: 'Software',
      price: 49.99,
      status: 'active',
      features: ['Contact Management', 'Basic Reports'],
      createdDate: '2024-01-01'
    },
    {
      id: 3,
      productId: 'PROD-003',
      productCode: 'SUPP-001',
      name: 'Premium Support',
      description: '24/7 premium customer support service',
      category: 'Service',
      price: 199.99,
      status: 'active',
      features: ['24/7 Support', 'Dedicated Manager', 'Priority Response'],
      createdDate: '2024-01-01'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'all' || product.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      discontinued: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Product</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Code</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Category</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Price</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Features</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div>
                    <div className="font-semibold text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-600">{product.description}</div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Package className="w-3 h-3 mr-1" />
                      ID: {product.productId}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {product.productCode}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {product.category}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center font-semibold text-gray-900">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {product.price.toFixed(2)}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex flex-wrap gap-1">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                    {product.features.length > 2 && (
                      <span className="text-xs text-gray-500">+{product.features.length - 2} more</span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => onProductSelect(product)}
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

export default ProductList;