import React, { useState } from 'react';
import { X } from 'lucide-react';
import Input from './Input';
import Button from './Button';

interface UserFormData {
  fullName: string;
  email: string;
  whatsapp: string;
  storeName: string;
  role: 'admin' | 'seller';
  status: 'active' | 'inactive';
}

interface UserFormProps {
  initialData?: UserFormData;
  onSubmit: (data: UserFormData) => Promise<void>;
  onClose: () => void;
  isLoading?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  initialData,
  onSubmit,
  onClose,
  isLoading
}) => {
  const [formData, setFormData] = useState<UserFormData>(
    initialData || {
      fullName: '',
      email: '',
      whatsapp: '',
      storeName: '',
      role: 'seller',
      status: 'active'
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            {initialData ? 'Editar usuario' : 'Nuevo usuario'}
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
          <Input
            label="Nombre completo"
            name="fullName"
            value={formData.fullName}
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
          <Input
            label="WhatsApp"
            type="tel"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            required
          />
          <Input
            label="Nombre de la tienda"
            name="storeName"
            value={formData.storeName}
            onChange={handleChange}
            required
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rol
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            >
              <option value="seller">Vendedor</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            >
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
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
              {initialData ? 'Guardar cambios' : 'Crear usuario'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;