import React, { useState } from 'react';
import { Store, Users, Package, Download, Edit, ExternalLink } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/Button';
import StoreForm from '../components/StoreForm';

interface StoreData {
  id: string;
  name: string;
  ownerName: string;
  products: number;
  customers: number;
  status: 'active' | 'inactive';
  createdAt: string;
  businessType: 'products' | 'services';
  category: string;
  description: string;
  address: string;
  phone: string;
  email: string;
}

// Mock data - Replace with actual API calls
const mockStores: StoreData[] = [
  {
    id: '1',
    name: 'Fashion Store',
    ownerName: 'María García',
    products: 45,
    customers: 128,
    status: 'active',
    createdAt: '2024-02-15',
    businessType: 'products',
    category: 'Ropa y Accesorios',
    description: 'Tienda de moda exclusiva',
    address: 'Calle Principal 123',
    phone: '+1234567890',
    email: 'maria@fashionstore.com'
  },
  {
    id: '2',
    name: 'Tech Store',
    ownerName: 'Carlos López',
    products: 32,
    customers: 89,
    status: 'active',
    createdAt: '2024-02-10',
    businessType: 'products',
    category: 'Electrónica',
    description: 'Tienda de tecnología',
    address: 'Av. Tecnología 456',
    phone: '+1987654321',
    email: 'carlos@techstore.com'
  }
];

const categories = [
  'Ropa y Accesorios',
  'Electrónica',
  'Alimentos y Bebidas',
  'Frutas y Verduras',
  'Carnicería',
  'Panadería',
  'Servicios Profesionales',
  'Belleza y Cuidado Personal',
  'Hogar y Decoración',
  'Deportes',
  'Juguetes',
  'Mascotas',
  'Libros y Papelería',
  'Artesanías',
  'Joyería',
  'Ferretería',
  'Farmacia',
  'Servicios de Salud',
  'Servicios Educativos',
  'Servicios de Limpieza',
  'Servicios de Transporte',
  'Servicios de Mantenimiento',
  'Otros'
];

export default function Stores() {
  const [stores, setStores] = useState<StoreData[]>(mockStores);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<StoreData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = (store: StoreData) => {
    setEditingStore(store);
    setIsFormOpen(true);
  };

  const handleSubmit = async (formData: Partial<StoreData>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingStore) {
        setStores(prev => prev.map(store => 
          store.id === editingStore.id ? { ...store, ...formData } : store
        ));
      }
      handleCloseForm();
    } catch (error) {
      console.error('Error saving store:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingStore(null);
  };

  const getStoreUrl = (storeName: string) => {
    const slug = storeName.toLowerCase().replace(/\s+/g, '-');
    return `/store/${slug}`;
  };

  return (
    <DashboardLayout title="Tiendas">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="inline-flex p-3 rounded-lg bg-indigo-50">
            <Store className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mt-4">
            {stores.length}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Tiendas totales</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="inline-flex p-3 rounded-lg bg-green-50">
            <Package className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mt-4">
            {stores.reduce((acc, store) => acc + store.products, 0)}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Productos totales</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="inline-flex p-3 rounded-lg bg-blue-50">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mt-4">
            {stores.reduce((acc, store) => acc + store.customers, 0)}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Clientes totales</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Lista de tiendas
            </h2>
            <Button
              variant="secondary"
              onClick={() => {}}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Exportar a Excel
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tienda
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Propietario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Productos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clientes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {stores.map((store) => (
                <tr key={store.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <Store className="h-5 w-5 text-gray-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center gap-2">
                          <a 
                            href={getStoreUrl(store.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-900 flex items-center gap-1"
                          >
                            {store.name}
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                        <div className="text-sm text-gray-500">{store.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{store.ownerName}</div>
                    <div className="text-sm text-gray-500">{store.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{store.category}</div>
                    <div className="text-sm text-gray-500">{store.businessType === 'products' ? 'Productos' : 'Servicios'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{store.products}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{store.customers}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      store.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {store.status === 'active' ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Button
                      variant="secondary"
                      onClick={() => handleEdit(store)}
                      className="flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
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
        <StoreForm
          initialData={editingStore || undefined}
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          isLoading={isLoading}
          categories={categories}
        />
      )}
    </DashboardLayout>
  );
}