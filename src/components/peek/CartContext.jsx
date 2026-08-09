import React, { createContext, useContext, useMemo, useState, useCallback } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // { id, name, animal, price, image, qty }
  const [open, setOpen] = useState(false);
  const [wagging, setWagging] = useState(false);

  const add = useCallback((product) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setWagging(true);
    setOpen(true);
    window.setTimeout(() => setWagging(false), 1600);
  }, []);

  const remove = useCallback((id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const setQty = useCallback((id, qty) => {
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty } : p))
        .filter((p) => p.qty > 0)
    );
  }, []);

  const count = useMemo(() => items.reduce((n, p) => n + p.qty, 0), [items]);
  const total = useMemo(() => items.reduce((s, p) => s + p.qty * p.price, 0), [items]);

  const value = useMemo(
    () => ({ items, open, setOpen, add, remove, setQty, count, total, wagging }),
    [items, open, add, remove, setQty, count, total, wagging]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}