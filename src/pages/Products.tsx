import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import Button from '../components/Button';
import type { Product, ProductFormData } from '../types/product';

// Mock data - Replace with actual API calls
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Camiseta Premium',
    description: 'Camiseta de algodón 100% de alta calidad con diseño exclusivo',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    stock: 100,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Taza Personalizada',
    description: 'Taza de cerámica con diseño personalizado, perfecta para regalo',
    price: 14.99,
    imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800',
    stock: 50,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

export default function Products() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: ProductFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingProduct) {
        setProducts(prev => prev.map(p => 
          p.id === editingProduct.id ? { ...p, ...data } : p
        ));
      } else {
        const newProduct: Product = {
          ...data,
          id: Date.now().toString(),
          isActive: true,
          createdAt: new Date().toISOString(),
        };
        setProducts(prev => [...prev, newProduct]);
      }
      handleCloseForm();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleToggleStatus = async (id: string, status: boolean) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setProducts(prev => prev.map(p => 
        p.id === id ? { ...p, isActive: status } : p
      ));
    } catch (error) {
      console.error('Error updating product status:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <DashboardLayout title="Productos">
      <div className="flex justify-end mb-6">
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Nuevo producto
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        ))}
      </div>

      {isFormOpen && (
        <ProductForm
          initialData={editingProduct || undefined}
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          isLoading={isLoading}
        />
      )}
    </DashboardLayout>
  );
}