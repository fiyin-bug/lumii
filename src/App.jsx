import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import JewelryPage from './pages/JewelryPage';
import ProductDetail from './pages/ProductDetail';
import CartPage from './components/CartPage';
import OrderStatusPage from './pages/OrderStatusPage';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import PaymentCallback from './pages/PaymentCallback';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import LuxuryHair from './pages/LuxuryHair';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            className: '',
            duration: 3000,
            style: { background: '#363636', color: '#fff' },
            success: {
              duration: 3000,
              theme: { primary: '#f4b8da', secondary: 'black' },
              iconTheme: { primary: '#f4b8da', secondary: '#fff' },
              style: { background: '#fff0f6', color: '#9d174d', border: '1px solid #f4b8da' },
            },
            error: {
              style: { background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca' },
            },
          }}
        />
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jewelry" element={<JewelryPage />} />
            <Route path="/jewelry/:category" element={<JewelryPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment/callback" element={<PaymentCallback />} />
            <Route path="/order-status" element={<OrderStatusPage />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/luxury-hair" element={<LuxuryHair />} />

            {/* <Route path="*" element={<div className="text-center py-20">404 Not Found</div>} /> */}
          </Routes>
        </main>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;
