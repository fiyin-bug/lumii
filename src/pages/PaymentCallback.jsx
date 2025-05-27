// src/pages/PaymentCallback.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api'; // Use custom Axios instance
import { useCart } from '../context/CartContext'; // Import useCart for clearing cart

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reference = searchParams.get('reference');
  const [isVerifying, setIsVerifying] = useState(true);
  const { clearCart } = useCart(); // Get clearCart from CartContext

  useEffect(() => {
    if (reference) {
      const verifyPayment = async () => {
        try {
          const response = await api.get(`/payment/verify?reference=${reference}`); // Use api instance
          setIsVerifying(false);

          if (response.data.success) {
            toast.success('✅ Payment successful!');
            clearCart(); // Clear cart on successful payment
            setTimeout(() => {
              navigate('/order-success', { state: { reference } });
            }, 2000);
          } else {
            toast.error(`❌ Payment failed: ${response.data.message}`);
            setTimeout(() => {
              navigate('/cart');
            }, 2000);
          }
        } catch (error) {
          setIsVerifying(false);
          console.error('Verification error:', error);
          const errorMessage = error.response?.data?.message || 'Something went wrong verifying the payment.';
          toast.error(`⚠️ ${errorMessage}`);
          setTimeout(() => {
            navigate('/cart');
          }, 2000);
        }
      };

      verifyPayment();
    } else {
      setIsVerifying(false);
      toast.error('No transaction reference provided.');
      navigate('/cart');
    }
  }, [reference, navigate, clearCart]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>{isVerifying ? 'Verifying your payment...' : 'Payment Verification'}</h2>
      <p>
        {isVerifying
          ? 'Please wait while we confirm your transaction.'
          : 'Verification complete. Redirecting...'}
      </p>
    </div>
  );
};

export default PaymentCallback;