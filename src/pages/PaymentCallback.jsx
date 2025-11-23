import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api';
import { useCart } from '../context/CartContext';

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reference = searchParams.get('reference');
  const [isVerifying, setIsVerifying] = useState(true);
  const [hasVerified, setHasVerified] = useState(false);
  const { clearCart } = useCart();

  useEffect(() => {
    if (reference && !hasVerified) {
      const verifyPayment = async () => {
        try {
          console.log(`Verifying payment for reference: ${reference}`);
          const response = await api.get(`/payment/verify?reference=${reference}`);
          console.log('API response:', response.data);
          setIsVerifying(false);
          setHasVerified(true);

          if (response.data.success) {
            toast.success('✅ Payment successful!');
            setTimeout(() => {
              console.log(`Navigating to /payment/success?reference=${reference}`);
              navigate(`/payment/success?reference=${reference}`);
            }, 2000);
          } else {
            toast.error(`❌ Payment failed: ${response.data.message}`);
            setTimeout(() => {
              console.log(`Navigating to /order-status?status=failed&reference=${reference}&reason=${encodeURIComponent(response.data.message || 'payment_failed')}`);
              navigate(`/order-status?status=failed&reference=${reference}&reason=${encodeURIComponent(response.data.message || 'payment_failed')}`);
            }, 2000);
          }
        } catch (error) {
          setIsVerifying(false);
          setHasVerified(true);
          console.error('Verification error:', error.response?.data || error.message);

          let errorMessage = 'Something went wrong verifying the payment.';
          if (!error.response) {
            // Network error - server not reachable
            errorMessage = 'Unable to connect to payment server. Please check your internet connection and try again.';
          } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
          }

          toast.error(`⚠️ ${errorMessage}`);
          setTimeout(() => {
            console.log(`Navigating to /order-status?status=failed&reference=${reference}&reason=${encodeURIComponent(errorMessage)}`);
            navigate(`/order-status?status=failed&reference=${reference}&reason=${encodeURIComponent(errorMessage)}`);
          }, 2000);
        }
      };

      verifyPayment();
    } else if (!reference) {
      setIsVerifying(false);
      toast.error('No transaction reference provided.');
      console.log('No reference provided, navigating to /cart');
      navigate('/cart');
    }
  }, [reference, navigate, clearCart, hasVerified]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mb-6">
            {isVerifying ? (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--pinkish-brown)] mx-auto"></div>
            ) : (
              <div className="text-4xl mb-4">
                {hasVerified ? '✅' : '❌'}
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {isVerifying ? 'Verifying Payment' : 'Verification Complete'}
          </h2>
          <p className="text-gray-600 mb-6">
            {isVerifying
              ? 'Please wait while we confirm your transaction...'
              : 'Redirecting you to the order status page...'}
          </p>
          {reference && (
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">
                Reference: <code className="bg-gray-100 px-2 py-1 rounded">{reference}</code>
              </p>
              <p className="text-xs text-gray-400">
                If redirect doesn't work, copy this URL and paste in browser:
              </p>
              <p className="text-xs text-blue-600 break-all">
                http://localhost:5174/payment/callback?reference={reference}
              </p>
            </div>
          )}
          {!reference && (
            <div className="text-red-600">
              <p>No transaction reference found in URL.</p>
              <p className="text-sm mt-2">
                Make sure Paystack redirects to: <code>http://localhost:5174/payment/callback?reference=YOUR_REFERENCE</code>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentCallback;
