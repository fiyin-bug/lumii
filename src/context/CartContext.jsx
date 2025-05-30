// src/context/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { debounce } from 'lodash';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

const getInitialCart = () => {
  const savedCart = localStorage.getItem('cartItems');
  const cart = savedCart ? JSON.parse(savedCart) : [];
  return cart.map((item) => ({
    ...item,
    image: item.image && !item.image.startsWith('/images/') ? `/images/${item.image}` : item.image
  }));
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getInitialCart);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = debounce((productToAdd) => {
    if (!productToAdd.id || !productToAdd.name || !productToAdd.price || !productToAdd.image) {
      toast.error('Invalid product data.');
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productToAdd.id);
      if (existingItem) {
        toast.success(`${productToAdd.name} quantity updated!`);
        return prevItems.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success(`${productToAdd.name} added to cart!`);
        const imagePath = productToAdd.image.startsWith('/images/')
          ? productToAdd.image
          : `/images/${productToAdd.image}`;
        return [...prevItems, { ...productToAdd, image: imagePath, quantity: 1 }];
      }
    });
  }, 300);

  const removeFromCart = debounce((productId) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === productId);
      if (itemToRemove) {
        toast.error(`${itemToRemove.name} removed from cart.`);
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  }, 300);

  const updateQuantity = (productId, amount) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = item.quantity + amount;
            if (newQuantity > 0) {
              return { ...item, quantity: newQuantity };
            }
            return null;
          }
          return item;
        })
        .filter((item) => item !== null)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
    toast.success('Cart cleared!');
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = typeof item.price === 'string'
        ? parseFloat(item.price.replace(/[^0-9.-]+/g, ''))
        : parseFloat(item.price);
      if (!isNaN(price)) {
        return total + price * item.quantity;
      }
      console.warn(`Invalid price for item ${item.id}: ${item.price}`);
      return total;
    }, 0);
  };

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