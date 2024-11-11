import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  MessageCircle,
  Store as StoreIcon,
  ShoppingCart
} from 'lucide-react';
import Cart from '../components/Cart';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'product' | 'service';
}

interface StoreViewProps {}

const StoreView: React.FC<StoreViewProps> = () => {
  const { storeId } = useParams();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Mock data - Replace with actual API call using storeId
  const store = {
    id: storeId,
    name: "Fashion Store",
    logo: "https://images.unsplash.com/photo-1490735891913-40897cdaafd1?w=800",
    description: "Tu tienda de moda exclusiva con las últimas tendencias y diseños únicos.",
    address: "Calle Principal 123, Ciudad",
    whatsapp: "+1234567890",
    schedule: {
      days: "Lunes a Sábado",
      hours: "9:00 AM - 6:00 PM"
    },
    category: "Ropa y Accesorios",
    items: [
      {
        id: '1',
        name: 'Camiseta Premium',
        description: 'Camiseta de algodón 100% de alta calidad',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
        type: 'product'
      },
      {
        id: '2',
        name: 'Asesoría de Imagen',
        description: 'Servicio personalizado de asesoría',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
        type: 'service'
      }
    ]
  };

  const isStoreOpen = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    
    // Assuming store hours are 9 AM to 6 PM, Monday (1) to Saturday (6)
    return day >= 1 && day <= 6 && hour >= 9 && hour < 18;
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('¡Hola! Me gustaría obtener más información sobre su tienda.');
    window.open(`https://wa.me/${store.whatsapp.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  const handleAddToCart = (item: typeof store.items[0]) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { 
        id: item.id, 
        name: item.name, 
        price: item.price,
        quantity: 1,
        type: item.type as 'product' | 'service'
      }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-32 h-32 rounded-lg overflow-hidden">
              <img 
                src={store.logo} 
                alt={store.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {store.name}
              </h1>
              <p className="text-gray-600 mb-4 max-w-2xl">
                {store.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                  {store.address}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2 text-gray-400" />
                  <div>
                    <div>{store.schedule.days} • {store.schedule.hours}</div>
                    <span className={`text-sm font-medium ${
                      isStoreOpen() ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isStoreOpen() ? '• Abierto ahora' : '• Cerrado'}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleWhatsAppClick}
                className="mt-4 inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chatea con nosotros en WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {store.items.map(item => (
            <div 
              key={item.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="aspect-video relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.type === 'product' 
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {item.type === 'product' ? 'Producto' : 'Servicio'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    ${item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      {cartItems.length > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full shadow-lg transition-colors"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Ver carrito ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
        </button>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <Cart
          items={cartItems}
          onClose={() => setIsCartOpen(false)}
          onRemoveItem={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          whatsappNumber={store.whatsapp}
        />
      )}
    </div>
  );
};

export default StoreView;