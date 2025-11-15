import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCarts, createCart, updateCart, deleteCart } from '../services/fakeStoreApi';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // Load cart from localStorage or API
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedUserId = localStorage.getItem('userId');
    
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart.products || []);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
    
    if (savedUserId) {
      setUserId(savedUserId);
      loadCartFromAPI(savedUserId);
    }
  }, []);

  const loadCartFromAPI = async (id) => {
    try {
      setLoading(true);
      const carts = await getCarts(id);
      if (carts && carts.length > 0) {
        const latestCart = carts[0];
        setCart(latestCart);
        setCartItems(latestCart.products || []);
        localStorage.setItem('cart', JSON.stringify(latestCart));
      }
    } catch (error) {
      console.error('Error loading cart from API:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      const existingItemIndex = cartItems.findIndex(
        (item) => item.productId === product.id
      );

      let updatedItems;
      if (existingItemIndex >= 0) {
        updatedItems = [...cartItems];
        updatedItems[existingItemIndex].quantity += quantity;
      } else {
        updatedItems = [
          ...cartItems,
          {
            productId: product.id,
            quantity,
            title: product.title,
            price: product.price,
            image: product.image,
          },
        ];
      }

      setCartItems(updatedItems);

      // Save to localStorage
      const cartData = {
        userId: userId || 1,
        date: new Date().toISOString(),
        products: updatedItems,
      };
      localStorage.setItem('cart', JSON.stringify(cartData));
      setCart(cartData);

      // Save to API if user is logged in
      if (userId && cart?.id) {
        try {
          await updateCart(cart.id, cartData);
        } catch (error) {
          console.error('Error updating cart in API:', error);
        }
      } else if (userId) {
        try {
          const newCart = await createCart(cartData);
          setCart(newCart);
        } catch (error) {
          console.error('Error creating cart in API:', error);
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const updatedItems = cartItems.filter(
        (item) => item.productId !== productId
      );
      setCartItems(updatedItems);

      const cartData = {
        userId: userId || 1,
        date: new Date().toISOString(),
        products: updatedItems,
      };
      localStorage.setItem('cart', JSON.stringify(cartData));
      setCart(cartData);

      if (userId && cart?.id) {
        try {
          await updateCart(cart.id, cartData);
        } catch (error) {
          console.error('Error updating cart in API:', error);
        }
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    try {
      const updatedItems = cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
      setCartItems(updatedItems);

      const cartData = {
        userId: userId || 1,
        date: new Date().toISOString(),
        products: updatedItems,
      };
      localStorage.setItem('cart', JSON.stringify(cartData));
      setCart(cartData);

      if (userId && cart?.id) {
        try {
          await updateCart(cart.id, cartData);
        } catch (error) {
          console.error('Error updating cart in API:', error);
        }
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      setCartItems([]);
      setCart(null);
      localStorage.removeItem('cart');

      if (userId && cart?.id) {
        try {
          await deleteCart(cart.id);
        } catch (error) {
          console.error('Error deleting cart in API:', error);
        }
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const setUserCart = (id) => {
    setUserId(id);
    localStorage.setItem('userId', id);
    if (id) {
      loadCartFromAPI(id);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        setUserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

