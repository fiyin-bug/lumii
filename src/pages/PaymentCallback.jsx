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
    // Safety check: only run verification once
    if (reference && !hasVerified) {
      const verifyPayment = async () => {
        try {
          console.log(`📡 Verifying payment: ${reference}`);
          
          // Request to your backend
          const response = await api.get(`/payment/verify/${reference}`);
          
          setIsVerifying(false);
          setHasVerified(true);

          if (response.data.success) {
            console.log('✅ Payment Confirmed');
            clearCart(); // Clean up the cart on success
            toast.success('Payment successful!');
            
            // Navigate to success page
            setTimeout(() => {
              navigate(`/payment/success?reference=${reference}`);
            }, 1500);
          } else {
            const errorMsg = response.data.message || 'Payment failed';
            toast.error(`❌ ${errorMsg}`);
            setTimeout(() => {
              navigate(`/order-status?status=failed&reference=${reference}&reason=${encodeURIComponent(errorMsg)}`);
            }, 2000);
          }
        } catch (error) {
          setIsVerifying(false);
          setHasVerified(true);
          console.error('❌ Verification Error:', error.response?.data || error.message);

          const errorMessage = error.response?.data?.message || 'Unable to connect to payment server.';
          toast.error(`⚠️ ${errorMessage}`);
          
          setTimeout(() => {
            navigate(`/order-status?status=failed&reference=${reference}&reason=${encodeURIComponent(errorMessage)}`);
          }, 2000);
        }
      };

      verifyPayment();
    } else if (!reference && !hasVerified) {
      setIsVerifying(false);
      console.warn('⚠️ No reference found in URL');
      // If we land here without a reference, something went wrong with the redirect
      toast.error('Transaction reference missing.');
      navigate('/cart');
    }
  }, [reference, navigate, clearCart, hasVerified]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mb-6">
            {isVerifying ? (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            ) : (
              <div className="text-4xl mb-4">
                {hasVerified ? '✅' : '❌'}
              </div>
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isVerifying ? 'Verifying Payment' : 'Verification Complete'}
          </h2>
          
          <p className="text-gray-600 mb-6">
            {isVerifying
              ? 'Please wait while we confirm your transaction...'
              : 'Redirecting you to the status page...'}
          </p>

          {reference && (
            <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
              <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Transaction Reference</p>
              <code className="text-sm text-gray-700 break-all">{reference}</code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentCallback;
