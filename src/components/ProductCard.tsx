import React from 'react';
import { Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import type { Product } from '../types/product';
import Button from './Button';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, status: boolean) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="aspect-square relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            product.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {product.isActive ? 'Activo' : 'Inactivo'}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            Stock: {product.stock}
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            variant="secondary"
            className="flex-1 !py-1.5"
            onClick={() => onEdit(product)}
          >
            <Edit className="w-4 h-4 mr-1" />
            Editar
          </Button>
          <Button
            variant="secondary"
            className="!px-2 !py-1.5"
            onClick={() => onToggleStatus(product.id, !product.isActive)}
          >
            {product.isActive ? (
              <ToggleRight className="w-4 h-4" />
            ) : (
              <ToggleLeft className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="secondary"
            className="!px-2 !py-1.5"
            onClick={() => onDelete(product.id)}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;