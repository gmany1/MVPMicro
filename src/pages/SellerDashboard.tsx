import React from 'react';
import { Users, DollarSign, ShoppingCart } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

export default function SellerDashboard() {
  const stats = [
    {
      label: 'Visitas hoy',
      value: '127',
      change: '+12.5%',
      icon: Users,
      trend: 'up',
    },
    {
      label: 'Ventas del mes',
      value: '$1,482',
      change: '+8.2%',
      icon: DollarSign,
      trend: 'up',
    },
    {
      label: 'Pedidos pendientes',
      value: '5',
      change: '-2',
      icon: ShoppingCart,
      trend: 'down',
    },
  ];

  return (
    <DashboardLayout title="Mi Tienda">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="inline-flex p-3 rounded-lg bg-gray-50">
                <stat.icon className="w-6 h-6 text-gray-700" />
              </div>
              <span className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mt-4">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Actividad reciente</h2>
        <div className="mt-4 space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-center py-3 border-b border-gray-100 last:border-0">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">
                  Nuevo visitante en tu tienda
                </p>
                <p className="text-sm text-gray-500">
                  Hace {5 + i} minutos
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}