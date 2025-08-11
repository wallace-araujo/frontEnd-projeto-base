'use client';
import { apiFetch } from '@/app/utils/apiFetch';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type CartItem = {
  id: number;
  product_id: number;
  name: string;
  price: number;
  photo: string;
  quantity: number;
};

type CartResponse = {
  items: CartItem[];
  quantity?: number;
  total: number;
};

type CartContextType = {
  cart: CartResponse;
  loading: boolean;
  error: string | null;
  addItem: (productId: number, quantity?: number) => Promise<void>;
  removeItem: (itemId: number, quantity?: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartResponse>({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/cart');
      setCart(res);
    } catch {
      setError('Erro ao carregar carrinho');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (productId: number, quantity: number = 1) => {
    try {
      setLoading(true);
      await apiFetch('/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }),
      });
      await fetchCart();
    } catch {
      setError('Erro ao adicionar item');
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: number, quantity: number = 1) => {
    try {
      setLoading(true);
      await apiFetch(`/cart/items/${itemId}/${quantity}`, {
        method: 'PATCH',
      });
      await fetchCart();
    } catch {
      setError('Erro ao remover item');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await apiFetch('/cart/clear', { method: 'DELETE' });
      setCart({ items: [], total: 0 });
    } catch {
      setError('Erro ao limpar carrinho');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, loading, error, addItem, removeItem, clearCart, refreshCart: fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider');
  }
  return context;
}
