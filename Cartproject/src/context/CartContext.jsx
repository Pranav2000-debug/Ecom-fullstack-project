/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState({ total: 0, oldTotal: 0 });

  // To see changes
  useEffect(() => {
    console.log("Cart item added/changed", cart);
  }, [cart]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart && storedCart.length > 0) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function totalPrice() {
    const total = cart.reduce((acc, curr) => acc + curr.newPrice * curr.quantity, 0);
    const oldTotal = cart.reduce((acc, curr) => acc + curr.oldPrice * curr.quantity, 0);
    setPrice({ total, oldTotal });
  }

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeCompletely = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === id);
      if (!existing) return prevCart;

      if (existing.quantity === 1) {
        // Remove product entirely
        return prevCart.filter((item) => item.id !== id);
      } else {
        // Decrease quantity by 1
        return prevCart.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item));
      }
    });
  };

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, price, totalPrice, removeCompletely }}>{children}</CartContext.Provider>;
}

// Hook for using context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be within a CartProvider");
  }
  return context;
}
