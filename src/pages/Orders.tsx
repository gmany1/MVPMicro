import React, { useState, useMemo } from 'react';
import { ShoppingBag, Package, DollarSign, Clock, Edit } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/Button';
import OrderDetails from '../components/OrderDetails';

interface OrderData {
  id: string;
  customerName: string;
  products: {
    name: string;
    quantity: number;
    price: number;
  }[];
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  createdAt: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress?: string;
  notes?: string;
}

// Mock data - Replace with actual API calls
const mockOrders: OrderData[] = [
  {
    id: 'ORD001',
    customerName: 'Juan Pérez',
    customerEmail: 'juan@example.com',
    customerPhone: '+1234567890',
    products: [
      { name: 'Camiseta Premium', quantity: 2, price: 29.99 },
      { name: 'Taza Personalizada', quantity: 1, price: 14.99 },
    ],
    status: 'pending',
    total: 74.97,
    createdAt: '2024-02-20T10:30:00Z',
    shippingAddress: 'Calle Principal 123, Ciudad',
    notes: 'Entregar en horario de tarde'
  },
  {
    id: 'ORD002',
    customerName: 'María Rodríguez',
    customerEmail: 'maria@example.com',
    customerPhone: '+1987654321',
    products: [
      { name: 'Taza Personalizada', quantity: 3, price: 14.99 },
    ],
    status: 'processing',
    total: 44.97,
    createdAt: '2024-02-19T15:45:00Z'
  }
];

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

export default function Orders() {
  const [orders, setOrders] = useState<OrderData[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);

  const stats = useMemo(() => ({
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    revenue: orders
      .filter(o => o.status === 'completed')
      .reduce((acc, order) => acc + order.total, 0),
  }), [orders]);

  const handleStatusChange = (orderId: string, newStatus: OrderData['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleViewDetails = (order: OrderData) => {
    setSelectedOrder(order);
  };

  return (
    <DashboardLayout title="Pedidos">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="inline-flex p-3 rounded-lg bg-indigo-50">
            <ShoppingBag className="w-6 h-6 text-indigo-600" aria-hidden="true" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mt-4">
            {stats.total}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Pedidos totales</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="inline-flex p-3 rounded-lg bg-yellow-50">
            <Clock className="w-6 h-6 text-yellow-600" aria-hidden="true" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mt-4">
            {stats.pending}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Pedidos pendientes</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="inline-flex p-3 rounded-lg bg-green-50">
            <DollarSign className="w-6 h-6 text-green-600" aria-hidden="true" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mt-4">
            ${stats.revenue.toFixed(2)}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Ingresos totales</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Lista de pedidos
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full" role="table">
            <thead>
              <tr className="bg-gray-50">
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pedido
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Productos
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.customerName}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {order.products.map((product, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-gray-400" aria-hidden="true" />
                          <span>
                            {product.quantity}x {product.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${order.total.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderData['status'])}
                      className={`px-2 py-1 text-xs font-semibold rounded-full border-0 ${
                        statusStyles[order.status].bg
                      } ${statusStyles[order.status].text}`}
                    >
                      <option value="pending">Pendiente</option>
                      <option value="processing">En proceso</option>
                      <option value="completed">Completado</option>
                      <option value="cancelled">Cancelado</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      variant="secondary"
                      onClick={() => handleViewDetails(order)}
                      className="flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Detalles
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </DashboardLayout>
  );
}