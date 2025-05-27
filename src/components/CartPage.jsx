// src/pages/CartPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import api from '../api';

const CartPage = () => {
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
  const navigate = useNavigate();

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

    const shippingAddress = {
      street: formData.street,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      country: formData.country,
    };

    const orderData = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      shippingAddress,
      items: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: parseFloat(item.price.replace(/[^0-9.-]+/g, '')), // Parse price for backend
      })),
    };

    const loadingToastId = toast.loading('Processing your order...');

    try {
      const response = await api.post('/payment/initialize', orderData);
      toast.dismiss(loadingToastId);

      if (response.data?.success && response.data?.authorizationUrl) {
        window.location.href = response.data.authorizationUrl;
      } else {
        toast.error(response.data?.message || 'Could not initiate payment.');
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      console.error('Checkout Form Submission Error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      toast.error(errorMessage);
    }
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
              className="inline-block bg-[#f4b8da] text-white px-6 py-2.5 rounded-md hover:bg-[#e9a0c7] transition-colors duration-300 font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
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
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-grow">
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            NGN {parseFloat(item.price.replace(/[^0-9.-]+/g, '')).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="flex items-center border rounded">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <i className="fas fa-minus text-xs"></i>
                          </button>
                          <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            <i className="fas fa-plus text-xs"></i>
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-right">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-sm text-gray-500 hover:text-red-600 underline"
                  >
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
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-[#f4b8da] focus:border-[#f4b8da] ${
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
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-[#f4b8da] focus:border-[#f4b8da] ${
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
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-[#f4b8da] focus:border-[#f4b8da] ${
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
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-[#f4b8da] focus:border-[#f4b8da] ${
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
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-[#f4b8da] focus:border-[#f4b8da] ${
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
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-[#f4b8da] focus:border-[#f4b8da] ${
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
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-[#f4b8da] focus:border-[#f4b8da] ${
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
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-[#f4b8da] focus:border-[#f4b8da] ${
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
                  className="w-full bg-[#f4b8da] text-white py-3 rounded-md hover:bg-[#e9a0c7] transition-colors duration-300 font-semibold mt-6 text-center"
                  disabled={cartCount === 0}
                >
                  Place Order & Proceed to Payment
                </button>
                <Link to="/jewelry" className="block text-center text-[#f4b8da] hover:underline mt-4 text-sm">
                  Continue Shopping
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