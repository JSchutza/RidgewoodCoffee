import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, CreditCardIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '../../store/cartStore';

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
  const clearCart = useCartStore(state => state.clearCart);

  const formatPrice = (price: number): string => {
    return price.toFixed(2);
  };

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

  return (
    <Dialog 
      open={isOpen} 
      onClose={paymentStatus === 'processing' ? () => {} : onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <Dialog.Title className="text-xl font-serif font-bold text-gray-900 flex items-center">
              {paymentStatus === 'success' ? (
                <>
                  <CheckCircleIcon className="h-6 w-6 mr-2 text-green-600" />
                  Order Complete
                </>
              ) : (
                <>
                  <CreditCardIcon className="h-6 w-6 mr-2 text-primary-600" />
                  Payment
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
                  className="btn-primary"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700">Total Amount:</span>
                    <span className="text-xl font-bold">${formatPrice(total)}</span>
                  </div>
                  <div className="h-[1px] bg-gray-200"></div>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={paymentStatus === 'processing'}
                  className={`w-full py-3 rounded-md font-semibold ${
                    paymentStatus === 'processing'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {paymentStatus === 'processing' ? 'Processing...' : 'Pay $' + formatPrice(total)}
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