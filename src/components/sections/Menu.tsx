'use client';

import { motion } from 'framer-motion';

const menuItems = {
  Coffee: [
    { name: 'House Blend', description: 'Our signature medium roast coffee', price: 3.50, badge: 'Bestseller' },
    { name: 'Espresso', description: 'Double shot of our premium espresso', price: 3.00 },
    { name: 'Cappuccino', description: 'Espresso with steamed milk and foam', price: 4.50 },
    { name: 'Cold Brew', description: '12-hour steeped cold brew coffee', price: 4.00 },
  ],
  Tea: [
    { name: 'Earl Grey', description: 'Classic black tea with bergamot', price: 3.00 },
    { name: 'Green Tea', description: 'Japanese sencha green tea', price: 3.00 },
    { name: 'Herbal Blend', description: 'Caffeine-free herbal infusion', price: 3.00 },
  ],
  Pastries: [
    { name: 'Croissant', description: 'Butter croissant baked fresh daily', price: 3.50 },
    { name: 'Blueberry Muffin', description: 'Made with fresh blueberries', price: 3.00, badge: 'New' },
    { name: 'Chocolate Chip Cookie', description: 'Fresh baked daily', price: 2.50 },
  ],
};

export default function Menu() {
  return (
    <section id="menu" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Our Menu</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(menuItems).map(([category, items], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-amber-800">{category}</h3>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-sm relative"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <span className="font-medium">${item.price.toFixed(2)}</span>
                    </div>
                    {item.badge && (
                      <span className="absolute top-2 right-2 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 