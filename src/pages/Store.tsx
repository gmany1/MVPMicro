import React, { useState } from 'react';
import { 
  Store as StoreIcon, 
  Package, 
  Calendar,
  Users, 
  MapPin,
  Clock,
  Tag,
  Edit,
  MessageCircle
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/Button';
import StoreEditForm from '../components/StoreEditForm';

interface StoreInfo {
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
  socialMedia: {
    facebook?: string;
    instagram?: string;
    whatsapp: string;
  };
}

interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isActive: boolean;
  type: 'product' | 'service';
  duration?: string; // For services
  stock?: number; // For products
}

// Mock data
const initialStoreInfo: StoreInfo = {
  name: "Fashion Store",
  logo: "https://images.unsplash.com/photo-1490735891913-40897cdaafd1?w=800&auto=format&fit=crop&q=60",
  description: "Tu tienda de moda exclusiva con las últimas tendencias y diseños únicos.",
  address: "Calle Principal 123, Ciudad",
  whatsapp: "+1234567890",
  businessType: 'products',
  category: 'Moda y Accesorios',
  schedule: {
    days: "Lunes a Sábado",
    hours: "9:00 AM - 6:00 PM"
  },
  socialMedia: {
    facebook: "https://facebook.com/fashionstore",
    instagram: "https://instagram.com/fashionstore",
    whatsapp: "+1234567890"
  }
};

const initialItems: Item[] = [
  {
    id: '1',
    name: 'Camiseta Premium',
    description: 'Camiseta de algodón 100% de alta calidad con diseño exclusivo',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    category: 'Ropa',
    stock: 100,
    isActive: true,
    type: 'product'
  },
  {
    id: '2',
    name: 'Asesoría de Imagen',
    description: 'Servicio personalizado de asesoría de imagen y estilo',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
    category: 'Servicios',
    isActive: true,
    type: 'service',
    duration: '2 horas'
  }
];

export default function Store() {
  const [store, setStore] = useState<StoreInfo>(initialStoreInfo);
  const [items, setItems] = useState<Item[]>(initialItems);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'product' | 'service'>('all');
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['all', ...new Set(items.map(p => p.category))];
  
  const filteredItems = items.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (selectedType !== 'all' && item.type !== selectedType) return false;
    return true;
  });

  const stats = {
    products: items.filter(i => i.type === 'product').length,
    services: items.filter(i => i.type === 'service').length,
    categories: new Set(items.map(i => i.category)).size,
  };

  const isStoreOpen = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    
    // Assuming store hours are 9 AM to 6 PM, Monday (1) to Saturday (6)
    return day >= 1 && day <= 6 && hour >= 9 && hour < 18;
  };

  const handleStoreUpdate = async (updatedStore: StoreInfo) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStore(updatedStore);
      setIsEditFormOpen(false);
    } catch (error) {
      console.error('Error updating store:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('¡Hola! Me gustaría obtener más información sobre sus productos.');
    window.open(`https://wa.me/${store.whatsapp.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  return (
    <DashboardLayout title="Mi Tienda">
      {/* Store Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="relative w-32 h-32 rounded-lg overflow-hidden group">
            <img 
              src={store.logo} 
              alt={store.name}
              className="w-full h-full object-cover"
            />
            <button 
              onClick={() => setIsEditFormOpen(true)}
              className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit className="w-6 h-6 text-white" />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {store.name}
                </h1>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                  store.businessType === 'products' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {store.businessType === 'products' ? 'Productos' : 'Servicios'}
                </span>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  onClick={() => setIsEditFormOpen(true)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar información
                </Button>
                <Button
                  onClick={handleWhatsAppClick}
                  className="bg-green-600 hover:bg-green-700 focus:ring-green-500"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contactar por WhatsApp
                </Button>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              {store.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                {store.address}
              </div>
              <div className="flex items-center text-gray-600">
                <MessageCircle className="w-5 h-5 mr-2 text-gray-400" />
                {store.whatsapp}
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2 text-gray-400" />
                <div>
                  <div>{store.schedule.days}</div>
                  <div className="flex items-center gap-2">
                    <span>{store.schedule.hours}</span>
                    <span className={`text-sm font-medium ${
                      isStoreOpen() ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isStoreOpen() ? '• Abierto ahora' : '• Cerrado'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="inline-flex p-3 rounded-lg bg-blue-50">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mt-4">
            {stats.products}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Productos</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="inline-flex p-3 rounded-lg bg-purple-50">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mt-4">
            {stats.services}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Servicios</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="inline-flex p-3 rounded-lg bg-indigo-50">
            <Tag className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mt-4">
            {stats.categories}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Categorías</p>
        </div>
      </div>

      {/* Items Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Catálogo
            </h2>
            <div className="flex items-center gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as 'all' | 'product' | 'service')}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">Todos los tipos</option>
                <option value="product">Solo productos</option>
                <option value="service">Solo servicios</option>
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Todas las categorías' : category}
                  </option>
                ))}
              </select>
              <Button onClick={() => {}}>
                <Package className="w-5 h-5 mr-2" />
                Nuevo item
              </Button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div 
                key={item.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-video relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.type === 'product' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {item.type === 'product' ? 'Producto' : 'Servicio'}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      ${item.price.toFixed(2)}
                    </span>
                    {item.type === 'product' ? (
                      <span className="text-sm text-gray-500">
                        Stock: {item.stock}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">
                        Duración: {item.duration}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => {}}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isEditFormOpen && (
        <StoreEditForm
          initialData={store}
          onSubmit={handleStoreUpdate}
          onClose={() => setIsEditFormOpen(false)}
          isLoading={isLoading}
        />
      )}
    </DashboardLayout>
  );
}