import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, CreditCardIcon, CheckCircleIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '../../store/cartStore';
import { formatCurrency } from '../../utils/formatters';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, total }) => {
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const { items, clearCart } = useCartStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStatus('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('success');
      // In a real app, you would handle payment processing here
    }, 1500);
  };

  const handleCloseAfterSuccess = () => {
    clearCart();
    onClose();
    setPaymentStatus('idle');
    setFormData({
      name: '',
      email: '',
      address: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
    });
  };

  // Calculate taxes and delivery fee
  const tax = total * 0.08; // 8% tax
  const deliveryFee = total > 0 ? 2.99 : 0;
  const grandTotal = total + tax + deliveryFee;

  return (
    <Dialog 
      open={isOpen} 
      onClose={paymentStatus === 'processing' ? () => {} : onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-amber-50">
            <Dialog.Title className="text-xl font-serif font-bold text-gray-900 flex items-center">
              {paymentStatus === 'success' ? (
                <>
                  <CheckCircleIcon className="h-6 w-6 mr-2 text-green-600" />
                  Order Complete
                </>
              ) : (
                <>
                  <CreditCardIcon className="h-6 w-6 mr-2 text-amber-800" />
                  Checkout
                </>
              )}
            </Dialog.Title>
            {paymentStatus !== 'processing' && (
              <button 
                onClick={paymentStatus === 'success' ? handleCloseAfterSuccess : onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            )}
          </div>

          <div className="p-6">
            {paymentStatus === 'success' ? (
              <div className="text-center py-8">
                <CheckCircleIcon className="h-16 w-16 mx-auto text-green-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Payment Successful!</h3>
                <p className="text-gray-600 mb-6">Your order has been placed and will be ready soon.</p>
                <button 
                  onClick={handleCloseAfterSuccess}
                  className="px-6 py-2 bg-amber-800 text-white rounded-md font-medium hover:bg-amber-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Order Summary */}
                <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                    <ShoppingBagIcon className="h-5 w-5 mr-2 text-amber-700" />
                    Order Summary
                  </h3>
                  
                  <div className="space-y-2 mb-3">
                    {items.map(item => (
                      <div key={item.product.id} className="flex justify-between text-sm">
                        <span>{item.quantity} × {item.product.name}</span>
                        <span>{formatCurrency(item.product.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>{formatCurrency(tax)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery Fee</span>
                      <span>{formatCurrency(deliveryFee)}</span>
                    </div>
                    <div className="flex justify-between font-medium text-amber-800 pt-2">
                      <span>Total</span>
                      <span>{formatCurrency(grandTotal)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Details</h3>
                  
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiry"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={paymentStatus === 'processing'}
                  className={`w-full py-3 rounded-md font-semibold mt-6 ${
                    paymentStatus === 'processing'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-amber-800 text-white hover:bg-amber-700 transition-colors'
                  }`}
                >
                  {paymentStatus === 'processing' ? 'Processing...' : `Pay ${formatCurrency(grandTotal)}`}
                </button>
              </form>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default PaymentModal; 