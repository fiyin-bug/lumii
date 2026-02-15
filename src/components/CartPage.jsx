import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import api from '../api';
import { formatNaira, parsePrice } from '../utils/price';

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartSubtotal,
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
    country: '',
  });
  
  const [formErrors, setFormErrors] = useState({});

  const inputBaseClass =
    'w-full p-3 border rounded-lg outline-none transition-all duration-200 bg-white placeholder:text-gray-400';

  const getInputClass = (fieldName) =>
    `${inputBaseClass} ${
      formErrors[fieldName]
        ? 'border-[#e39bbf] bg-[#fff4fa] focus:border-[#d486ad] focus:ring-2 focus:ring-[#f4b8da]/40'
        : 'border-[var(--pinkish-brown)]/20 focus:border-[var(--pinkish-brown)] focus:ring-2 focus:ring-[var(--desert-sand)]/40 hover:border-[var(--pinkish-brown)]/40'
    }`;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Clear error when user starts typing
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
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.street.trim()) errors.street = 'Street address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.state.trim()) errors.state = 'State is required';
    if (!formData.postalCode.trim()) errors.postalCode = 'Postal code is required';
    if (!formData.country.trim()) errors.country = 'Country is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error('Please complete all required fields.');
      return;
    }

    if (cartCount <= 0) {
      toast.error('Your cart is empty.');
      return;
    }

    // Robust item formatting - prevents "NaN" prices from breaking Paystack
    const formattedItems = cartItems.map(item => {
      const priceNum = parsePrice(item.price);

      return {
        id: item.id,
        name: item.name,
        price: priceNum || 0, 
        quantity: item.quantity,
      };
    });

    const payload = {
      email: formData.email.trim().toLowerCase(),
      amount: parsePrice(subtotal),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phone: formData.phone.trim(),
      shippingAddress: {
        street: formData.street.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        postalCode: formData.postalCode.trim(),
        country: formData.country,
      },
      items: formattedItems,
    };

    const loadingToastId = toast.loading('Connecting to secure payment...');

    try {
      const response = await api.post('/api/payment/initialize', payload);

      toast.dismiss(loadingToastId);

      if (response.data?.success && response.data?.authorizationUrl) {
        // Redirect to Paystack
        window.location.href = response.data.authorizationUrl;
      } else {
        toast.error(response.data?.message || 'Could not initiate payment.');
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      console.error('Checkout Error:', error.response?.data || error.message);
      const msg = error.response?.data?.message || 'Payment server error. Please try again. If this persists, refresh and retry in 30 seconds.';
      toast.error(msg);
    }
  };

  const handleProductClick = (productId) => navigate(`/product/${productId}`);

  return (
    <div className="py-12 md:py-20 bg-gray-50 min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-center text-gray-800 mb-8">
          Checkout
        </h1>

        {cartCount === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg shadow-sm border">
            <p className="text-gray-500 mb-6">Your cart is currently empty.</p>
            <Link to="/jewelry" className="bg-amber-800 text-white px-8 py-3 rounded-lg hover:bg-amber-900 transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-6">
              
              {/* Item Review Section */}
              <div className="bg-white rounded-lg shadow-sm border border-[var(--pinkish-brown)]/15 p-6">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Review Items</h2>
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    // FIX: Unique key using ID and Index to prevent React warning
                    <div key={`${item.id}-${index}`} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.images ? item.images[0] : item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => handleProductClick(item.id)}
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">{formatNaira(item.price)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex border rounded overflow-hidden">
                          <button type="button" onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 hover:bg-gray-100">-</button>
                          <span className="px-3 py-1 bg-gray-50 border-x">{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 hover:bg-gray-100">+</button>
                        </div>
                        <button type="button" onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 p-2">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Form Section */}
              <div className="bg-white rounded-lg shadow-sm border border-[var(--pinkish-brown)]/15 p-6">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Shipping Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} className={getInputClass('firstName')} />
                    {formErrors.firstName && <span className="text-xs text-red-500 mt-1">{formErrors.firstName}</span>}
                  </div>
                  <div className="flex flex-col">
                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} className={getInputClass('lastName')} />
                    {formErrors.lastName && <span className="text-xs text-red-500 mt-1">{formErrors.lastName}</span>}
                  </div>
                  <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} className={`${getInputClass('email')} md:col-span-2`} />
                  <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} className={`${getInputClass('phone')} md:col-span-2`} />
                  <input type="text" name="street" placeholder="Street Address" value={formData.street} onChange={handleInputChange} className={`${getInputClass('street')} md:col-span-2`} />
                  <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} className={getInputClass('city')} />
                  <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} className={getInputClass('state')} />
                  <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleInputChange} className={getInputClass('postalCode')} />
                  <div className="flex flex-col">
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={getInputClass('country')}
                    />
                    {formErrors.country && <span className="text-xs text-red-500 mt-1">{formErrors.country}</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Summary Sidebar */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-[var(--pinkish-brown)]/15 p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Order Summary</h2>
                <div className="flex justify-between mb-2"><span>Subtotal</span><span>{formatNaira(subtotal)}</span></div>
                <div className="flex justify-between mb-4 text-green-600"><span>Shipping</span><span>FREE</span></div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg mb-6 text-gray-900">
                  <span>Total</span><span>{formatNaira(subtotal)}</span>
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-800 text-white py-4 rounded-xl font-bold hover:bg-amber-900 transition-all shadow-md active:transform active:scale-95"
                >
                  Make Payment
                </button>
                <p className="text-[10px] text-gray-400 mt-4 text-center">
                  Secure checkout powered by Paystack.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CartPage;