import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Store, 
  Package, 
  ShoppingBag, 
  Settings, 
  LogOut,
  Users,
  BarChart3,
  Building2,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
  roles: Array<'admin' | 'seller'>;
}

const menuItems: MenuItem[] = [
  // Admin-only items
  { 
    icon: BarChart3, 
    label: 'Panel General', 
    path: '/dashboard', 
    roles: ['admin'] 
  },
  { 
    icon: Building2, 
    label: 'Tiendas', 
    path: '/dashboard/stores', 
    roles: ['admin'] 
  },
  { 
    icon: Users, 
    label: 'Usuarios', 
    path: '/dashboard/users', 
    roles: ['admin'] 
  },
  // Seller-only items
  { 
    icon: Store, 
    label: 'Mi Tienda', 
    path: '/dashboard/store', 
    roles: ['seller'] 
  },
  { 
    icon: Package, 
    label: 'Productos', 
    path: '/dashboard/products', 
    roles: ['seller'] 
  },
  { 
    icon: ShoppingBag, 
    label: 'Pedidos', 
    path: '/dashboard/orders', 
    roles: ['seller'] 
  },
  // Common items
  { 
    icon: Settings, 
    label: 'Configuración', 
    path: '/dashboard/settings', 
    roles: ['admin', 'seller'] 
  },
];

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredMenuItems = useMemo(() => 
    menuItems.filter(item => user?.role && item.roles.includes(user.role)),
    [user?.role]
  );

  // Generate store URL based on store name
  const storeUrl = useMemo(() => {
    if (!user?.storeName) return '';
    const slug = user.storeName.toLowerCase().replace(/\s+/g, '-');
    return `/store/${slug}`;
  }, [user?.storeName]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-800">{user?.storeName}</h2>
              {user?.role === 'seller' && (
                <a
                  href={storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-sm"
                >
                  Ver tienda
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
            <p className="text-sm text-gray-500">{user?.fullName}</p>
            <span className="inline-block px-2 py-1 mt-2 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
              {user?.role === 'admin' ? 'Administrador' : 'Vendedor'}
            </span>
          </div>
          
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {filteredMenuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <button
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 mr-3 ${
                        isActive ? 'text-indigo-700' : 'text-gray-500'
                      }`} />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="py-6 px-8">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          <div className="mt-6">{children}</div>
        </div>
      </main>
    </div>
  );
}