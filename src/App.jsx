// src/App.jsx (or App.js)
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // Ensure path is correct
import Navbar from "./components/Navbar";           // Ensure path is correct
import Home from "./pages/Home";                   // Ensure path is correct
import JewelryPage from "../src/pages/JewelryPage";         // Updated path based on your previous code
import CartPage from "../src/components/CartPage";             // Updated path based on your previous code
import OrderStatusPage from "./pages/OrderStatusPage"; // <-- Import the combined status page
import Footer from "./components/Footer";           // Optional: Ensure path is correct
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <CartProvider>
      <Router>
        {/* --- Toast Notifications Container --- */}
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
              style: { background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }
            },
            error: {
                 style: { background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca' }
            }
          }}
        />

        <Navbar />
        <main className="pt-16"> {/* Adjust padding if Navbar height changes */}
          <Routes>
            {/* Core Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/jewelry" element={<JewelryPage />} />
            <Route path="/jewelry/:category" element={<JewelryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order-status" element={<OrderStatusPage />} /> {/* <-- Added the combined order status route */}

            {/* Placeholders (Uncomment if needed) */}
            {/* <Route path="/gift-combo" element={<div className="text-center py-20">Gift Combo Page (Placeholder)</div>} />
            <Route path="/about" element={<div className="text-center py-20">About Us Page (Placeholder)</div>} />
            <Route path="/contact" element={<div className="text-center py-20">Contact Us Page (Placeholder)</div>} /> */}

            {/* Catch-all 404 */}
            <Route path="*" element={<div className="text-center py-20">404 Not Found</div>} />
          </Routes>
        </main>
        {/* <Footer /> Optional: Ensure path is correct if you use it */}
      </Router>
    </CartProvider>
  );
};

export default App;