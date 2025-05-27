// src/pages/OrderSuccess.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const OrderSuccess = () => {
  const { state } = useLocation();
  const reference = state?.reference || 'N/A';

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Order Confirmed!</h2>
      <p>Thank you for your purchase. Your order has been successfully placed.</p>
      <p>Transaction Reference: {reference}</p>
      <Link to="/jewelry" className="inline-block bg-[#f4b8da] text-white px-6 py-2.5 rounded-md mt-4">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;