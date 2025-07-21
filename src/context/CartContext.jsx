import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.find(item => item._id === action.product._id);
      if (existing) {
        return state.map(item =>
          item._id === action.product._id
            ? { ...item, quantity: item.quantity + (action.quantity || 1) }
            : item
        );
      }
      return [...state, { ...action.product, quantity: action.quantity || 1 }];
    }
    case "REMOVE":
      return state.filter(item => item._id !== action._id);
    case "UPDATE":
      return state.map(item =>
        item._id === action._id ? { ...item, quantity: action.quantity } : item
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

function getInitialCart() {
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], getInitialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
} 
