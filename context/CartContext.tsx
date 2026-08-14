"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type CartContextType = {
  cartCount: number;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);

  const refreshCart = async () => {
    try {
      const response = await fetch("/api/cart");

      if (!response.ok) {
        setCartCount(0);
        return;
      }

      const cart = await response.json();

      const count =
        cart?.items?.reduce(
          (total: number, item: { quantity: number }) => total + item.quantity,
          0,
        ) ?? 0;

      setCartCount(count);
    } catch (error) {
      console.error("Failed to refresh cart:", error);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
