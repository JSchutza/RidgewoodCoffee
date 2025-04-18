import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types/product';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isCartOpen: false,
      
      addItem: (product: Product) => 
        set((state) => {
          const existingItem = state.items.find(item => item.product.id === product.id);
          
          if (existingItem) {
            return {
              items: state.items.map(item => 
                item.product.id === product.id 
                  ? { ...item, quantity: item.quantity + 1 } 
                  : item
              )
            };
          }
          
          return { items: [...state.items, { product, quantity: 1 }] };
        }),
      
      removeItem: (productId: string) => 
        set((state) => ({
          items: state.items.filter(item => item.product.id !== productId)
        })),
      
      updateQuantity: (productId: string, quantity: number) => 
        set((state) => ({
          items: state.items.map(item => 
            item.product.id === productId 
              ? { ...item, quantity: Math.max(0, quantity) } 
              : item
          ).filter(item => item.quantity > 0)
        })),
      
      clearCart: () => set({ items: [] }),
      
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
    }),
    {
      name: 'cart-storage',
    }
  )
); 