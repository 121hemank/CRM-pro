import React, { useState } from 'react';
import ProductList from './ProductList';
import ProductSearch from './ProductSearch';
import ProductModal from './ProductModal';
import { Product } from '../../types/Product';

const Products: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleProductCreate = () => {
    setSelectedProduct(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
          <p className="text-gray-600 mt-1">Manage your products and services catalog</p>
        </div>
        <button
          onClick={handleProductCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Add Product
        </button>
      </div>

      <ProductSearch 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />

      <ProductList 
        searchTerm={searchTerm}
        filterCategory={filterCategory}
        onProductSelect={handleProductSelect}
      />

      {showModal && (
        <ProductModal
          product={selectedProduct}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Products;