import React, { createContext, useContext, useState } from 'react';
import { Promotion } from '../types';

interface CartItem {
  promotion: Promotion;
  quantity: number;
}

interface CartContextData {
  items: CartItem[];
  addToCart: (promotion: Promotion) => void;
  removeFromCart: (promotionId: string) => void;
  updateQuantity: (promotionId: string, quantity: number) => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (promotion: Promotion) => {
    setItems(current => {
      const existingItem = current.find(item => item.promotion.id === promotion.id);
      if (existingItem) {
        return current.map(item =>
          item.promotion.id === promotion.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { promotion, quantity: 1 }];
    });
    openCart();
  };

  const removeFromCart = (promotionId: string) => {
    setItems(current => current.filter(item => item.promotion.id !== promotionId));
  };

  const updateQuantity = (promotionId: string, quantity: number) => {
    setItems(current =>
      current.map(item =>
        item.promotion.id === promotionId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
