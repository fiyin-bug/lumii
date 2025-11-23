import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference');
  const { clearCart } = useCart();

  useEffect(() => {
    console.log('🎉 PaymentSuccess page loaded with reference:', reference);
    console.log('📍 Current URL:', window.location.href);
    console.log('🛒 Clearing cart...');

    // Clear the cart when payment is successful
    clearCart();

    // Add a timeout to check if page is still visible
    const checkVisibility = setTimeout(() => {
      console.log('⏰ 5 seconds passed - PaymentSuccess page should still be visible');
      console.log('📍 Current URL after 5s:', window.location.href);
    }, 5000);

    return () => clearTimeout(checkVisibility);
  }, [clearCart, reference]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 sm:p-10 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-5 pointer-events-none"></div>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="text-6xl text-green-500 animate-pulse" />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-800 text-center mb-4">
          Payment Successful! 🎉
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-center mb-6 text-base sm:text-lg leading-relaxed">
          Thank you for your purchase! Your payment has been confirmed and your order is being processed.
          You'll receive an email confirmation with your order details shortly.
        </p>

        {/* Reference Code */}
        {reference ? (
          <div className="bg-green-50 rounded-lg p-4 mb-6 text-center border border-green-200">
            <p className="text-sm text-gray-600 mb-1">
              Order Reference:
            </p>
            <p className="font-semibold text-green-700 text-lg">
              {reference}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Keep this reference for your records
            </p>
          </div>
        ) : (
          <div className="bg-yellow-50 rounded-lg p-4 mb-6 text-center border border-yellow-200">
            <p className="text-sm text-yellow-600 mb-1">
              ⚠️ No Reference Provided
            </p>
            <p className="text-xs text-yellow-500">
              This page should be accessed after payment verification.
              <br />
              If you're testing, add ?reference=YOUR_REFERENCE to the URL.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/jewelry"
            className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-full font-medium text-sm sm:text-base hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 text-center"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium text-sm sm:text-base hover:bg-gray-300 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 text-center"
          >
            Back to Home
          </Link>
        </div>

        {/* Footer Branding */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Lumii Pretty Collection 💎 | Thank you for choosing us!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
