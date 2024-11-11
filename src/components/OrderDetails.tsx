import React from 'react';
import { X, Package, User, Mail, Phone, MapPin, Clock } from 'lucide-react';
import Button from './Button';

interface OrderDetailsProps {
  order: {
    id: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    products: {
      name: string;
      quantity: number;
      price: number;
    }[];
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    total: number;
    createdAt: string;
    shippingAddress?: string;
    notes?: string;
  };
  onClose: () => void;
  onStatusChange: (orderId: string, status: string) => void;
}

const statusStyles = {
  pending: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    label: 'Pendiente',
  },
  processing: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    label: 'En proceso',
  },
  completed: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    label: 'Completado',
  },
  cancelled: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    label: 'Cancelado',
  },
};

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onClose, onStatusChange }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            Detalles del Pedido #{order.id}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {/* Customer Information */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Información del Cliente
            </h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <User className="w-4 h-4 mr-2 text-gray-400" />
                {order.customerName}
              </div>
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                {order.customerEmail}
              </div>
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                {order.customerPhone}
              </div>
              {order.shippingAddress && (
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  {order.shippingAddress}
                </div>
              )}
            </div>
          </div>

          {/* Order Details */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Detalles del Pedido
            </h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                {new Date(order.createdAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Productos
            </h3>
            <div className="space-y-3">
              {order.products.map((product, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center">
                    <Package className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm">
                      {product.quantity}x {product.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    ${(product.price * product.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3">
                <span className="font-medium">Total</span>
                <span className="text-lg font-bold">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Notas
              </h3>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {order.notes}
              </p>
            </div>
          )}

          {/* Status */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Estado del Pedido
            </h3>
            <select
              value={order.status}
              onChange={(e) => onStatusChange(order.id, e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border-0 ${
                statusStyles[order.status].bg
              } ${statusStyles[order.status].text}`}
            >
              <option value="pending">Pendiente</option>
              <option value="processing">En proceso</option>
              <option value="completed">Completado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>

          <div className="flex justify-end">
            <Button onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;