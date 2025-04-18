import React, { useState } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '../../store/cartStore';
import CartModal from './CartModal';

interface CartButtonProps {
  isMenuPage?: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({ isMenuPage = false }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCartStore();

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        className={`relative p-2 ${
          isMenuPage 
            ? 'bg-amber-700 text-white rounded-full shadow-md hover:bg-amber-800 transition-all duration-300 flex items-center gap-2' 
            : 'text-neutral-500 hover:text-amber-700'
        }`}
        aria-label="Open cart"
      >
        <ShoppingBagIcon className="h-6 w-6" />
        {isMenuPage && itemCount > 0 && (
          <span className="text-sm font-medium">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
        )}
        {!isMenuPage && itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-700 text-xs text-white">
            {itemCount}
          </span>
        )}
      </button>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default CartButton; 