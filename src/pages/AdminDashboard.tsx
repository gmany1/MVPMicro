import React from 'react';
import { Users, Building2, ShoppingBag } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

export default function AdminDashboard() {
  const stats = [
    {
      label: 'Total Tiendas',
      value: '24',
      change: '+3',
      icon: Building2,
      trend: 'up',
    },
    {
      label: 'Usuarios Activos',
      value: '1,234',
      change: '+12.5%',
      icon: Users,
      trend: 'up',
    },
    {
      label: 'Ventas Totales',
      value: '$45,678',
      change: '+8.2%',
      icon: ShoppingBag,
      trend: 'up',
    },
  ];

  return (
    <DashboardLayout title="Panel de Administración">
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
              <span className="text-sm font-medium text-green-600">
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

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tiendas Recientes</h2>
          <div className="space-y-4">
            {['Fashion Store', 'Tech Store', 'Sport Shop'].map((store, i) => (
              <div key={store} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">{store}</p>
                    <p className="text-xs text-gray-500">Registrada hace {i + 1} días</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  Activa
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Usuarios Recientes</h2>
          <div className="space-y-4">
            {['Juan Pérez', 'María García', 'Carlos López'].map((user, i) => (
              <div key={user} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">{user}</p>
                    <p className="text-xs text-gray-500">Registrado hace {i + 1} horas</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  Vendedor
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}