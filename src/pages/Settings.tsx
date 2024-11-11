import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Store, Bell, Shield } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import Input from '../components/Input';
import Button from '../components/Button';

interface SettingsFormData {
  fullName: string;
  email: string;
  whatsapp: string;
  storeName: string;
  notifications: {
    email: boolean;
    whatsapp: boolean;
  };
}

export default function Settings() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SettingsFormData>({
    fullName: 'María García',
    email: 'maria@fashionstore.com',
    whatsapp: '+1234567890',
    storeName: 'Fashion Store',
    notifications: {
      email: true,
      whatsapp: true,
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Handle success
    } catch (error) {
      console.error('Error updating settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const [category, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...prev[category as keyof typeof prev],
          [field]: checked,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <DashboardLayout title="Configuración">
      <div className="max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Perfil */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <User className="w-5 h-5 text-indigo-600" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Perfil
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nombre completo"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <Input
                label="WhatsApp"
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </section>

          {/* Tienda */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Store className="w-5 h-5 text-indigo-600" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Tienda
              </h2>
            </div>
            
            <Input
              label="Nombre de la tienda"
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              required
            />
          </section>

          {/* Notificaciones */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Bell className="w-5 h-5 text-indigo-600" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Notificaciones
              </h2>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="notifications.email"
                  checked={formData.notifications.email}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">
                  Recibir notificaciones por email
                </span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="notifications.whatsapp"
                  checked={formData.notifications.whatsapp}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">
                  Recibir notificaciones por WhatsApp
                </span>
              </label>
            </div>
          </section>

          {/* Seguridad */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Shield className="w-5 h-5 text-indigo-600" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Seguridad
              </h2>
            </div>
            
            <Button
              type="button"
              variant="secondary"
              onClick={() => {}}
              className="w-auto"
            >
              Cambiar contraseña
            </Button>
          </section>

          <div className="flex justify-end">
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-auto px-8"
            >
              Guardar cambios
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}