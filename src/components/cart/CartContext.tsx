"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { type PartItem } from "@/components/catalog/PartCard";

export interface CartItem {
  part: PartItem;
  quantity: number;
  name: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (part: PartItem, name?: string) => void;
  removeItem: (partId: string) => void;
  updateQty: (partId: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQty: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
  openCart: () => {},
  closeCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  const persist = (newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems));
  };

  const addItem = (part: PartItem, name?: string) => {
    let resolvedName = name;
    if (!resolvedName) {
      try {
        const tr = JSON.parse(part.translations || "{}");
        resolvedName = tr.en?.name || tr.az?.name || part.partNumber;
      } catch {
        resolvedName = part.partNumber;
      }
    }
    const finalName: string = resolvedName || part.partNumber;
    setItems((prev) => {
      const existing = prev.find((i) => i.part.id === part.id);
      let next: CartItem[];
      if (existing) {
        next = prev.map((i) =>
          i.part.id === part.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        next = [...prev, { part, quantity: 1, name: finalName }];
      }
      localStorage.setItem("cart", JSON.stringify(next));
      return next;
    });
    setIsOpen(true);
  };

  const removeItem = (partId: string) => {
    persist(items.filter((i) => i.part.id !== partId));
  };

  const updateQty = (partId: string, qty: number) => {
    if (qty < 1) { removeItem(partId); return; }
    persist(items.map((i) => i.part.id === partId ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => persist([]);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.part.priceUSD * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
