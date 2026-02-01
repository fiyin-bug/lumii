import { useState } from 'react';
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

    // 1. Prepare data for Paystack (Backend expects this)
    const payload = {
      email: formData.email.trim(),
      amount: subtotal, // Correctly passing the subtotal for the backend to use
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      shippingAddress: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        // Robust price parsing to handle strings or numbers
        price: typeof item.price === 'string' 
          ? parseFloat(item.price.replace(/[^0-9.-]+/g, '')) 
          : item.price,
        quantity: item.quantity,
      })),
    };

    const loadingToastId = toast.loading('Redirecting to secure payment...');

    try {
      // This sends a POST to http://localhost:5174/api/payment/initialize
      // Vite Proxy rewrites it to http://localhost:5000/payment/initialize
      const response = await api.post('/payment/initialize', payload);

      toast.dismiss(loadingToastId);

      if (response.data?.success && response.data?.authorizationUrl) {
        // Redirect user to Paystack Checkout
        window.location.href = response.data.authorizationUrl;
      } else {
        toast.error(response.data?.message || 'Could not initiate payment.');
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      console.error('Checkout Error:', error);
      
      const errorMessage = error.response?.data?.message || error.customMessage || 'Payment failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

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
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C19A6B] to-[#704214] text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-12">
            <div className="lg:col-span-2 space-y-8">
              {/* Item Review Section */}
              <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-3">
                  Review Your Items ({cartCount})
                </h2>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4 last:border-b-0">
                      <div className="flex items-center gap-4 flex-grow w-full sm:w-auto">
                        <img
                          src={item.images ? item.images[0] : item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded cursor-pointer"
                          onClick={() => handleProductClick(item.id)}
                        />
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-500">NGN {subtotal.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded-lg overflow-hidden">
                          <button type="button" onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 hover:bg-gray-100">-</button>
                          <span className="px-3 py-1 border-x">{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 hover:bg-gray-100">+</button>
                        </div>
                        <button type="button" onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Details Section */}
              <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-5 border-b pb-3">Your Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} className="p-2 border rounded" required />
                  <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} className="p-2 border rounded" required />
                  <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} className="p-2 border rounded md:col-span-2" required />
                  <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} className="p-2 border rounded md:col-span-2" required />
                  <input type="text" name="street" placeholder="Street Address" value={formData.street} onChange={handleInputChange} className="p-2 border rounded md:col-span-2" required />
                  <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} className="p-2 border rounded" required />
                  <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} className="p-2 border rounded" required />
                  <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleInputChange} className="p-2 border rounded" required />
                  <input type="text" name="country" value={formData.country} readOnly className="p-2 border rounded bg-gray-50" />
                </div>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-4 md:p-6 sticky top-20">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-3">Order Summary</h2>
                <div className="flex justify-between mb-2"><span>Subtotal</span><span>NGN {subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between mb-4"><span className="text-green-600">Shipping</span><span className="text-green-600">FREE</span></div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg mb-6"><span>Total</span><span>NGN {subtotal.toFixed(2)}</span></div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#C19A6B] to-[#704214] text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all disabled:opacity-50"
                  disabled={cartCount === 0}
                >
                  Place Order & Pay
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CartPage;