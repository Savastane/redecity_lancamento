import { useState, useCallback } from 'react';
import type { Promotion, CartItem } from '../types/index';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = useCallback((promotion: Promotion) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === promotion.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.id === promotion.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { ...promotion, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems(currentItems =>
      currentItems
        .map(item => item.id === id ? { ...item, quantity } : item)
        .filter(item => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  }, []);

  const toggleCart = useCallback(() => {
    setIsOpen(current => !current);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    items,
    isOpen,
    totalItems,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    toggleCart,
    closeCart: () => setIsOpen(false)
  };
}