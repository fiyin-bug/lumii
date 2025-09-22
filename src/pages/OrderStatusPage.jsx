import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // React Icons instead of Font Awesome

const OrderStatusPage = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status'); // 'success' or 'failed'
  const reference = searchParams.get('reference');
  const reason = searchParams.get('reason'); // Failure reason
  const isSuccess = status === 'success';

  // Failure message logic
  let failureMessage = 'Your payment could not be processed. Please try again or contact support.';
  if (!isSuccess) {
    if (reason === 'invalid_order_state') failureMessage = 'There was an issue processing your order status. Please contact support.';
    else if (reason === 'order_not_found') failureMessage = "We couldn't find the order details after payment. Please contact support with your reference code.";
    else if (reason === 'server_error') failureMessage = 'An unexpected error occurred on our end. Please try again later or contact support.';
    else if (reason === 'insufficient_stock') failureMessage = 'Unfortunately, one or more items went out of stock during checkout. Please review your cart.';
    else if (reason && reason !== 'payment_failed') failureMessage = `Payment failed: ${reason.replace(/_/g, ' ')}. Please try again or contact support.`;
    else if (!status) failureMessage = 'The order status is unclear. Please check your email or contact support.';
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4b8da] to-[#fff5f9] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 sm:p-10 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-10 pointer-events-none"></div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          {isSuccess ? (
            <FaCheckCircle className="text-6xl text-green-500 animate-pulse" />
          ) : (
            <FaTimesCircle className="text-6xl text-red-500" />
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-800 text-center mb-4">
          {isSuccess ? 'Order Confirmed!' : 'Payment Unsuccessful'}
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-center mb-6 text-base sm:text-lg leading-relaxed">
          {isSuccess
            ? 'Thank you for shopping with Lumis Pretty Collection! Your payment has been confirmed, and we’re preparing your order. You’ll receive an email confirmation soon.'
            : failureMessage}
        </p>

        {/* Reference Code */}
        {reference && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center">
            <p className="text-sm text-gray-500">
              Order Reference: <span className="font-semibold text-gray-700">{reference}</span>
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {isSuccess ? (
            <Link
              to="/jewelry"
              className="inline-block bg-[#f4b8da] text-white px-8 py-3 rounded-full font-medium text-sm sm:text-base hover:bg-[#e9a0c7] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Explore More Jewelry
            </Link>
          ) : (
            <>
              <Link
                to="/cart"
                className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium text-sm sm:text-base hover:bg-gray-300 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                Return to Cart
              </Link>
              <Link
                to="/contact"
                className="inline-block bg-[#f4b8da] text-white px-6 py-3 rounded-full font-medium text-sm sm:text-base hover:bg-[#e9a0c7] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                Contact Support
              </Link>
            </>
          )}
        </div>

        {/* Footer Branding */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Lumis Pretty Collection 💎 | Crafted with Love
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusPage;
