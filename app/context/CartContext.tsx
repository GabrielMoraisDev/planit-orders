"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { CartItem, Product, VariacaoSelecionada } from '@/app/types';

const STORAGE_KEY = 'acai_cart_v1';

interface CartContextType {
  items: CartItem[];
  total: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, qty?: number, variacoes?: VariacaoSelecionada[], precoTotal?: number) => void;
  removeItem: (productId: string, itemIndex?: number) => void;
  updateQty: (productId: string, qty: number, itemIndex?: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, qty = 1, variacoes?: VariacaoSelecionada[]) => {
    setItems(prev => {
      const idx = prev.findIndex(
        i => i.product.id === product.id && 
        JSON.stringify(i.variacoes_selecionadas) === JSON.stringify(variacoes)
      );
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy.filter(i => i.qty > 0);
      }
      return [...prev, { product, qty, variacoes_selecionadas: variacoes }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (productId: string, itemIndex?: number) => {
    setItems(prev => {
      if (itemIndex !== undefined) {
        return prev.filter((_, idx) => idx !== itemIndex);
      }
      return prev.filter(i => i.product.id !== productId);
    });
  };

  const updateQty = (productId: string, qty: number, itemIndex?: number) => {
    setItems(prev => {
      if (itemIndex !== undefined) {
        return prev.map((item, idx) => 
          idx === itemIndex ? { ...item, qty } : item
        ).filter(i => i.qty > 0);
      }
      return prev.map(i => i.product.id === productId ? { ...i, qty } : i).filter(i => i.qty > 0);
    });
  };

  const clear = () => setItems([]);

  const total = useMemo(() => items.reduce((acc, i) => {
    const precoItem = i.product.valor;
    const adicional = i.variacoes_selecionadas?.reduce((sum, variacao) => {
      const vars = i.product.variacoes?.find(v => v.id === variacao.variacao_id);
      if (vars) {
        return sum + variacao.opcoes_selecionadas.reduce((s, opcaoId) => {
          const opcao = vars.opcoes.find(o => o.id === opcaoId);
          return s + (opcao?.preco_adicional ?? 0);
        }, 0);
      }
      return sum;
    }, 0) ?? 0;
    return acc + (precoItem + adicional) * i.qty;
  }, 0), [items]);

  const value: CartContextType = {
    items,
    total,
    isCartOpen,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
    toggleCart: () => setIsCartOpen(v => !v),
    addItem,
    removeItem,
    updateQty,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
