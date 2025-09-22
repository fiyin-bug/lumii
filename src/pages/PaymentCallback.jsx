import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
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
          const response = await axios.get(`http://localhost:5000/api/payment/verify?reference=${reference}`);
          console.log('API response:', response.data);
          setIsVerifying(false);
          setHasVerified(true);

          if (response.data.success) {
            toast.success('✅ Payment successful!');
            clearCart();
            setTimeout(() => {
              console.log(`Navigating to /order-status?status=success&reference=${reference}`);
              navigate(`/order-status?status=success&reference=${reference}`);
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
