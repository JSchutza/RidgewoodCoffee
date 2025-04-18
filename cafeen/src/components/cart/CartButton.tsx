import React, { useState } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '../../store/cartStore';
import CartModal from './CartModal';

const CartButton: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCartStore();

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative p-2 text-neutral-500 hover:text-amber-700"
        aria-label="Open cart"
      >
        <ShoppingBagIcon className="h-6 w-6" />
        {itemCount > 0 && (
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