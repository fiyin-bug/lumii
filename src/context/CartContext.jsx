// src/context/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast'; // <-- Import toast

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

// Helper to get cart from local storage
const getInitialCart = () => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getInitialCart); // Load cart from localStorage

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);


  const addToCart = (productToAdd) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productToAdd.id);

      if (existingItem) {
        // Increase quantity if item already exists
        toast.success(`${productToAdd.name} quantity updated!`); // Notify quantity update
        return prevItems.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1
        toast.success(`${productToAdd.name} added to cart!`); // Success toast
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
     setCartItems((prevItems) => {
         const itemToRemove = prevItems.find(item => item.id === productId);
         if(itemToRemove) {
            toast.error(`${itemToRemove.name} removed from cart.`); // Use error style for removal
         }
         return prevItems.filter((item) => item.id !== productId);
     });
  };

  const updateQuantity = (productId, amount) => {
      setCartItems((prevItems) =>
          prevItems.map((item) => {
              if (item.id === productId) {
                  const newQuantity = item.quantity + amount;
                  // Prevent quantity <= 0
                  if (newQuantity > 0) {
                      return { ...item, quantity: newQuantity };
                  } else {
                     // If quantity becomes 0 or less, filter it out (same as removing)
                     // No separate toast needed here as removeFromCart handles it if called
                     return null; // Mark for removal
                  }
              }
              return item;
          }).filter(item => item !== null) // Remove items marked as null
      );
      // Optional: Add a generic "Cart updated" toast if needed, but +/- actions might not require it.
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
    toast.success("Cart cleared!");
  };


  const getCartCount = () => {
    // Sum up the quantities of all items in the cart
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartSubtotal = () => {
      return cartItems.reduce((total, item) => {
          // Ensure price is a number, remove '$' and convert
          const price = parseFloat(item.price.replace(/[^0-9.-]+/g,""));
          if (!isNaN(price)) {
              return total + price * item.quantity;
          }
          return total; // Skip if price is invalid
      }, 0);
  }

  // Provide the state and functions through context
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartCount,
    getCartSubtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};