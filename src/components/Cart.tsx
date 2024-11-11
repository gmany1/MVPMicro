import React, { useState } from 'react';
import { ShoppingCart, X, MessageCircle } from 'lucide-react';
import Button from './Button';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'product' | 'service';
}

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  whatsappNumber: string;
}

const Cart: React.FC<CartProps> = ({
  items,
  onClose,
  onRemoveItem,
  onUpdateQuantity,
  whatsappNumber,
}) => {
  const [notes, setNotes] = useState('');

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    const message = `¡Hola! Quisiera confirmar el siguiente pedido:

${items.map(item => `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})`).join('\n')}

Total: $${total.toFixed(2)}

${notes ? `Notas: ${notes}` : ''}

Por favor, confírmeme la disponibilidad y el tiempo de entrega. ¡Gracias!`;

    window.open(
      `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl flex flex-col z-50">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Carrito</h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {items.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between py-2 border-b"
            >
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  ${item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notas adicionales
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Instrucciones especiales, preferencias de entrega, etc."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={3}
          />
        </div>
      </div>

      <div className="p-4 border-t bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium">Total</span>
          <span className="text-xl font-bold">${total.toFixed(2)}</span>
        </div>
        <Button
          onClick={handleWhatsAppCheckout}
          className="bg-green-600 hover:bg-green-700 focus:ring-green-500"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Enviar pedido por WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default Cart;