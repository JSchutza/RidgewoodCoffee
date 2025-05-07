import { useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import { XMarkIcon, PlusIcon, MinusIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from '../../utils/formatters';
import PaymentModal from './PaymentModal';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div 
        className="bg-white rounded-lg w-full max-w-md mx-auto z-10 overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b flex justify-between items-center bg-amber-50">
          <h2 className="text-xl font-semibold flex items-center">
            <ShoppingBagIcon className="h-6 w-6 mr-2 text-amber-700" />
            Your Cart {totalItems > 0 && `(${totalItems} ${totalItems === 1 ? 'item' : 'items'})`}
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close cart"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBagIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-2">Your cart is empty</p>
              <p className="text-sm text-gray-400">Add items from our menu to get started</p>
            </div>
          ) : (
            <ul className="divide-y">
              {items.map((item) => (
                <li key={item.product.id} className="py-4 flex">
                  <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md overflow-hidden">
                    {item.product.image ? (
                      <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-gray-400 bg-amber-50">
                        <span className="text-amber-700 font-medium text-xs">{item.product.category}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="font-medium text-amber-800">{formatCurrency(item.product.price * item.quantity)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{formatCurrency(item.product.price)} each</p>
                    
                    <div className="mt-2 flex items-center">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                        aria-label="Decrease quantity"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="mx-2 min-w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                        aria-label="Increase quantity"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                      
                      <button 
                        onClick={() => removeItem(item.product.id)}
                        className="ml-auto text-sm text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="border-t p-4 bg-amber-50">
            <div className="flex justify-between py-2 font-medium">
              <p>Subtotal</p>
              <p className="text-amber-800">{formatCurrency(subtotal)}</p>
            </div>
            <div className="text-sm text-gray-500 mb-4">
              Taxes and delivery fees calculated at checkout
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={clearCart}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Clear Cart
              </button>
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="px-4 py-3 bg-amber-800 text-white rounded-md text-sm font-medium hover:bg-amber-700 transition-colors"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => {
          setIsPaymentModalOpen(false);
          onClose();
        }} 
        total={subtotal}
      />
    </div>
  );
} 