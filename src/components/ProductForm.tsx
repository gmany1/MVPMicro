import React, { memo, useCallback, useState } from 'react';
import { X } from 'lucide-react';
import type { ProductFormData } from '../types/product';
import Input from './Input';
import Button from './Button';
import ImageUpload from './ImageUpload';

interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData) => void;
  onClose: () => void;
  isLoading?: boolean;
}

const ProductForm = memo(function ProductForm({ 
  initialData, 
  onSubmit, 
  onClose, 
  isLoading 
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>(
    initialData || {
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      stock: 0,
    }
  );

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  }, [formData, onSubmit]);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-labelledby="product-form-title"
      aria-modal="true"
    >
      <div 
        className="bg-white rounded-lg w-full max-w-md"
        role="document"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 
            id="product-form-title"
            className="text-lg font-semibold"
          >
            {initialData ? 'Editar producto' : 'Nuevo producto'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Cerrar formulario"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen del producto
            </label>
            <ImageUpload
              value={formData.imageUrl}
              onChange={(value) => setFormData(prev => ({ ...prev, imageUrl: value }))}
              aspectRatio="video"
            />
          </div>

          <Input
            label="Nombre del producto"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <div className="mb-4">
            <label 
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={3}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Precio"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
            <Input
              label="Stock"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
            >
              {initialData ? 'Guardar cambios' : 'Crear producto'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default ProductForm;