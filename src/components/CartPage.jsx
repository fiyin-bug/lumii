// src/pages/CartPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import api from '../api';

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartSubtotal,
    clearCart,
    getCartCount,
  } = useCart();

  const subtotal = getCartSubtotal();
  const cartCount = getCartCount();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Nigeria',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }
    if (!formData.street.trim()) errors.street = 'Street address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.state.trim()) errors.state = 'State is required';
    if (!formData.postalCode.trim()) errors.postalCode = 'Postal code is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form.');
      return;
    }

    if (cartCount <= 0) {
      toast.error('Your cart is empty.');
      return;
    }

    // 1. Ensure data is valid before sending
    const amount = parseFloat(subtotal);
    if (isNaN(amount) || !formData.email) {
      console.error("Invalid form data");
      return;
    }

    const payload = {
      email: formData.email.trim(),
      amount: Math.round(amount * 100), // Convert to kobo/cents
      customerInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email.trim(),
      },
      shippingAddress: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      cartItems: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: parseFloat(item.price.replace(/[^0-9.-]+/g, '')),
        quantity: item.quantity,
        image: item.images ? item.images[0] : item.image,
      })),
    };

    console.log('Payload being sent:', payload);

    const loadingToastId = toast.loading('Processing your order...');

    try {
      const response = await api.post('/api/payment/initialize', payload);

      toast.dismiss(loadingToastId);

      if (response.data?.data?.authorization_url) {
        window.location.href = response.data.data.authorization_url;
      } else {
        toast.error(response.data?.message || 'Could not initiate payment.');
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      console.error('Checkout Form Submission Error:', error);

      // If you see a response here, the server is NOT crashing
      console.error("Server Response:", error.response?.data);

      // Use custom error message from API interceptor if available
      const errorMessage = error.response?.data?.message || error.customMessage || 'An error occurred during payment processing. Please try again.';

      toast.error(errorMessage);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  console.log('Cart Items:', cartItems, 'Cart Count:', cartCount);

  return (
    <div className="py-12 md:py-20 bg-gray-50 min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-center text-gray-800 mb-8 md:mb-12">
          Your Shopping Cart & Checkout
        </h1>

        {cartCount === 0 ? (
          <div className="text-center py-10 px-6 bg-white rounded-lg shadow">
            <i className="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 mb-6">Your cart is currently empty.</p>
            <Link
              to="/jewelry"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-[var(--desert-sand)] to-[var(--pinkish-brown)] text-white px-8 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-3">
                  Review Your Items ({cartCount})
                </h2>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4 last:border-b-0"
                    >
                      <div className="flex items-center gap-4 flex-grow w-full sm:w-auto">
                        <img
                          src={item.images ? item.images[0] : item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => handleProductClick(item.id)}
                        />
                        <div className="flex-grow">
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            NGN {parseFloat(item.price.replace(/[^0-9.-]+/g, '')).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="flex items-center border border-[var(--pinkish-brown)]/30 rounded-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-3 py-2 text-[var(--pinkish-brown)] hover:bg-[var(--pinkish-brown)]/10 disabled:opacity-50 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <i className="fas fa-minus text-xs"></i>
                          </button>
                          <span className="px-4 py-2 text-sm font-semibold bg-[var(--desert-sand)]/5 border-x border-[var(--pinkish-brown)]/20">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-3 py-2 text-[var(--pinkish-brown)] hover:bg-[var(--pinkish-brown)]/10 transition-colors"
                          >
                            <i className="fas fa-plus text-xs"></i>
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="group p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
                        >
                          <i className="fas fa-trash-alt group-hover:scale-110 transition-transform duration-300"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-right">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 underline hover:no-underline transition-all duration-300"
                  >
                    <i className="fas fa-trash-alt group-hover:scale-110 transition-transform duration-300"></i>
                    Clear Cart
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-5 border-b pb-3">Your Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-[var(--pinkish-brown)] focus:border-[var(--pinkish-brown)] transition-colors duration-300 ${
                        formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-[var(--pinkish-brown)] focus:border-[var(--pinkish-brown)] transition-colors duration-300 ${
                        formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-[var(--pinkish-brown)] focus:border-[var(--pinkish-brown)] transition-colors duration-300 ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-[var(--pinkish-brown)] focus:border-[var(--pinkish-brown)] transition-colors duration-300 ${
                        formErrors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>
                  <h3 className="md:col-span-2 text-lg font-medium text-gray-800 mt-4 pt-4 border-t">
                    Shipping Address
                  </h3>
                  <div className="md:col-span-2">
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-[var(--pinkish-brown)] focus:border-[var(--pinkish-brown)] transition-colors duration-300 ${
                        formErrors.street ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.street && <p className="text-red-500 text-xs mt-1">{formErrors.street}</p>}
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-[var(--pinkish-brown)] focus:border-[var(--pinkish-brown)] transition-colors duration-300 ${
                        formErrors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-[var(--pinkish-brown)] focus:border-[var(--pinkish-brown)] transition-colors duration-300 ${
                        formErrors.state ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.state && <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>}
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-[var(--pinkish-brown)] focus:border-[var(--pinkish-brown)] transition-colors duration-300 ${
                        formErrors.postalCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.postalCode && <p className="text-red-500 text-xs mt-1">{formErrors.postalCode}</p>}
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border bg-gray-100 rounded-md shadow-sm"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-4 md:p-6 sticky top-20">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-3">Order Summary</h2>
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>NGN {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-gray-800 text-lg">
                    <span>Total</span>
                    <span>NGN {subtotal.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="group relative w-full bg-gradient-to-r from-[var(--desert-sand)] to-[var(--pinkish-brown)] text-white py-4 px-6 rounded-xl hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 overflow-hidden font-semibold mt-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={cartCount === 0}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>Place Order & Proceed to Payment</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <Link to="/jewelry" className="group block text-center text-[var(--pinkish-brown)] hover:text-[var(--pinkish-brown-dark)] hover:underline mt-4 text-sm transition-colors duration-300">
                  <span className="flex items-center justify-center gap-1">
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Continue Shopping
                  </span>
                </Link>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CartPage;
