import React, { useState } from 'react';
import { X } from 'lucide-react';
import Input from './Input';
import Button from './Button';
import ImageUpload from './ImageUpload';

interface StoreFormData {
  name: string;
  logo: string;
  description: string;
  address: string;
  whatsapp: string;
  businessType: 'products' | 'services';
  category: string;
  schedule: {
    days: string;
    hours: string;
  };
}

interface StoreEditFormProps {
  initialData: StoreFormData;
  onSubmit: (data: StoreFormData) => Promise<void>;
  onClose: () => void;
  isLoading?: boolean;
}

const StoreEditForm: React.FC<StoreEditFormProps> = ({
  initialData,
  onSubmit,
  onClose,
  isLoading
}) => {
  const [formData, setFormData] = useState<StoreFormData>(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleScheduleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [name]: value
      }
    }));
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            Editar información de la tienda
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo de la tienda
            </label>
            <ImageUpload
              value={formData.logo}
              onChange={(value) => setFormData(prev => ({ ...prev, logo: value }))}
              className="max-w-[200px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre de la tienda"
              name="name"
              value={formData.name}
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
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mt-4">
            <Input
              label="Dirección"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de negocio
            </label>
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            >
              <option value="products">Productos</option>
              <option value="services">Servicios</option>
            </select>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Horario de atención
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Días"
                name="days"
                value={formData.schedule.days}
                onChange={handleScheduleChange}
                placeholder="ej: Lunes a Sábado"
                required
              />
              <Input
                label="Horario"
                name="hours"
                value={formData.schedule.hours}
                onChange={handleScheduleChange}
                placeholder="ej: 9:00 AM - 6:00 PM"
                required
              />
            </div>
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
              Guardar cambios
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreEditForm;