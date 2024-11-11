import React, { useState, useMemo } from 'react';
import { Users as UsersIcon, Mail, Phone, Calendar, Plus } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/Button';
import UserForm from '../components/UserForm';

interface UserData {
  id: string;
  fullName: string;
  email: string;
  whatsapp: string;
  storeName: string;
  role: 'admin' | 'seller';
  status: 'active' | 'inactive';
  registeredAt: string;
}

// Mock data - Replace with actual API calls
const mockUsers: UserData[] = [
  {
    id: '1',
    fullName: 'María García',
    email: 'maria@fashionstore.com',
    whatsapp: '+1234567890',
    storeName: 'Fashion Store',
    role: 'seller',
    status: 'active',
    registeredAt: '2024-02-15',
  },
  {
    id: '2',
    fullName: 'Carlos López',
    email: 'carlos@techstore.com',
    whatsapp: '+1987654321',
    storeName: 'Tech Store',
    role: 'seller',
    status: 'active',
    registeredAt: '2024-02-10',
  },
  {
    id: '3',
    fullName: 'Admin User',
    email: 'admin@platform.com',
    whatsapp: '+1122334455',
    storeName: 'Platform Admin',
    role: 'admin',
    status: 'active',
    registeredAt: '2024-01-01',
  },
];

export default function Users() {
  const [users, setUsers] = useState<UserData[]>(mockUsers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const stats = useMemo(() => ({
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    sellers: users.filter(u => u.role === 'seller').length,
  }), [users]);

  const handleEdit = (user: UserData) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleSubmit = async (formData: Omit<UserData, 'id' | 'registeredAt'>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingUser) {
        setUsers(prev => prev.map(u => 
          u.id === editingUser.id ? { ...u, ...formData } : u
        ));
      } else {
        const newUser: UserData = {
          ...formData,
          id: Date.now().toString(),
          registeredAt: new Date().toISOString(),
        };
        setUsers(prev => [...prev, newUser]);
      }
      handleCloseForm();
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingUser(null);
  };

  return (
    <DashboardLayout title="Usuarios">
      <div className="flex justify-end mb-6">
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Nuevo usuario
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="inline-flex p-3 rounded-lg bg-indigo-50">
            <UsersIcon className="w-6 h-6 text-indigo-600" aria-hidden="true" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mt-4">
            {stats.total}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Usuarios totales</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="inline-flex p-3 rounded-lg bg-green-50">
            <UsersIcon className="w-6 h-6 text-green-600" aria-hidden="true" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mt-4">
            {stats.active}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Usuarios activos</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="inline-flex p-3 rounded-lg bg-blue-50">
            <UsersIcon className="w-6 h-6 text-blue-600" aria-hidden="true" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mt-4">
            {stats.sellers}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Vendedores</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Lista de usuarios
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full" role="table">
            <thead>
              <tr className="bg-gray-50">
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tienda
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registro
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-lg font-medium text-gray-600">
                            {user.fullName.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.fullName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" aria-hidden="true" />
                        {user.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-900">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" aria-hidden="true" />
                        {user.whatsapp}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.storeName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role === 'admin' ? 'Administrador' : 'Vendedor'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" aria-hidden="true" />
                      {new Date(user.registeredAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      variant="secondary"
                      onClick={() => handleEdit(user)}
                      className="text-sm"
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen && (
        <UserForm
          initialData={editingUser || undefined}
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          isLoading={isLoading}
        />
      )}
    </DashboardLayout>
  );
}