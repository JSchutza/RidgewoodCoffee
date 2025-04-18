import React from 'react';
import { useInView } from 'react-intersection-observer';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '../store/cartStore';
import CartButton from '../components/cart/CartButton';
import { Product } from '../types/product';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

const menuItems: MenuItem[] = [
  // Coffee
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'A rich, concentrated coffee shot with a layer of crema',
    price: '$3.50',
    category: 'Coffee',
    isBestseller: true,
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and a thick layer of foam',
    price: '$4.50',
    category: 'Coffee',
  },
  {
    id: 'latte',
    name: 'Latte',
    description: 'Espresso with steamed milk and a light layer of foam',
    price: '$4.75',
    category: 'Coffee',
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    description: 'Smooth, cold-brewed coffee served over ice',
    price: '$4.25',
    category: 'Coffee',
    isNew: true,
  },
  // Tea
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    description: 'Japanese green tea powder with steamed milk',
    price: '$5.00',
    category: 'Tea',
  },
  {
    id: 'chai-latte',
    name: 'Chai Latte',
    description: 'Spiced black tea with steamed milk',
    price: '$4.75',
    category: 'Tea',
    isBestseller: true,
  },
  {
    id: 'herbal-tea',
    name: 'Herbal Tea',
    description: 'Selection of caffeine-free herbal infusions',
    price: '$3.75',
    category: 'Tea',
  },
  // Pastries
  {
    id: 'croissant',
    name: 'Butter Croissant',
    description: 'Flaky, buttery pastry',
    price: '$3.50',
    category: 'Pastries',
  },
  {
    id: 'almond-croissant',
    name: 'Almond Croissant',
    description: 'Butter croissant filled with almond cream',
    price: '$4.00',
    category: 'Pastries',
    isBestseller: true,
  },
  {
    id: 'blueberry-muffin',
    name: 'Blueberry Muffin',
    description: 'Moist muffin packed with fresh blueberries',
    price: '$3.50',
    category: 'Pastries',
  },
  // Seasonal Specials
  {
    id: 'pumpkin-spice-latte',
    name: 'Pumpkin Spice Latte',
    description: 'Espresso with steamed milk, pumpkin spice, and whipped cream',
    price: '$5.50',
    category: 'Seasonal Specials',
    isNew: true,
  },
  {
    id: 'maple-pecan-cold-brew',
    name: 'Maple Pecan Cold Brew',
    description: 'Cold brew coffee with maple syrup and pecan flavoring',
    price: '$5.25',
    category: 'Seasonal Specials',
    isNew: true,
  },
];

const MenuPage: React.FC = () => {
  const { items, addItem, removeItem, updateQuantity } = useCartStore();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories = Array.from(new Set(menuItems.map(item => item.category)));

  // Helper function to convert price string to number
  const priceToNumber = (priceString: string): number => {
    return parseFloat(priceString.replace('$', ''));
  };

  // Helper function to get item quantity from cart
  const getItemQuantity = (id: string): number => {
    const cartItem = items.find(item => item.product.id === id);
    return cartItem ? cartItem.quantity : 0;
  };

  // Function to handle adding item to cart
  const handleAddItem = (menuItem: MenuItem) => {
    const product: Product = {
      id: menuItem.id,
      name: menuItem.name,
      description: menuItem.description,
      price: priceToNumber(menuItem.price),
      category: menuItem.category
    };
    addItem(product);
  };

  // Function to handle decreasing item quantity
  const handleDecrementItem = (id: string) => {
    const quantity = getItemQuantity(id);
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      removeItem(id);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="fixed top-4 right-4 z-40">
        <CartButton />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif font-bold text-center mb-12">Our Menu</h1>
        
        <div 
          ref={ref}
          className={`space-y-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {categories.map((category, index) => (
            <div key={category} className={`transition-all duration-1000 delay-${index * 100}`}>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 pb-2 border-b-2 border-primary-200">
                {category}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems
                  .filter(item => item.category === category)
                  .map(item => {
                    const quantity = getItemQuantity(item.id);
                    
                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                          <span className="text-primary-600 font-medium">{item.price}</span>
                        </div>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            {item.isNew && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                New
                              </span>
                            )}
                            {item.isBestseller && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Bestseller
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center">
                            {quantity > 0 && (
                              <>
                                <button 
                                  onClick={() => handleDecrementItem(item.id)}
                                  className="p-1 rounded-full text-gray-600 hover:bg-gray-100"
                                  aria-label="Remove one"
                                >
                                  <MinusIcon className="h-5 w-5" />
                                </button>
                                <span className="mx-2 font-medium text-gray-900">{quantity}</span>
                              </>
                            )}
                            <button 
                              onClick={() => handleAddItem(item)}
                              className="p-1 rounded-full text-primary-600 hover:bg-primary-50"
                              aria-label="Add to cart"
                            >
                              <PlusIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage; 