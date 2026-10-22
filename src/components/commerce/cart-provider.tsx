"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getPrebookProduct,
  isProductPurchasable,
  type PrebookProduct,
  type PrebookProductId,
} from "@/lib/commerce/products";
import type { CartItem } from "@/lib/commerce/types";
import { productIdForAudience } from "@/lib/audience/filter";
import { useAudience } from "@/components/providers/audience-provider";

const STORAGE_KEY = "arvit-prebook-cart";

type CartLine = CartItem & { product: PrebookProduct };

type CartContextValue = {
  items: CartItem[];
  lines: CartLine[];
  count: number;
  totalCents: number;
  addItem: (productId: PrebookProductId, quantity?: number) => void;
  removeItem: (productId: PrebookProductId) => void;
  setQuantity: (productId: PrebookProductId, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function sanitizeItems(items: CartItem[]): CartItem[] {
  const map = new Map<PrebookProductId, number>();
  for (const item of items) {
    const product = getPrebookProduct(item.productId);
    if (!product || !isProductPurchasable(product)) continue;
    const qty = Math.min(20, Math.max(1, Math.floor(item.quantity) || 1));
    map.set(item.productId, (map.get(item.productId) ?? 0) + qty);
  }
  return Array.from(map.entries()).map(([productId, quantity]) => ({ productId, quantity }));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const { audience } = useAudience();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(sanitizeItems(parsed));
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  // Keep the cart on the single AAC Device
  useEffect(() => {
    if (!hydrated) return;
    const allowed = productIdForAudience(audience);
    if (!allowed) return;
    setItems((prev) => {
      const next = prev.filter((item) => item.productId === allowed);
      return next.length === prev.length ? prev : next;
    });
  }, [audience, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback(
    (productId: PrebookProductId, quantity = 1) => {
      const product = getPrebookProduct(productId);
      if (!product || !isProductPurchasable(product)) return;
      const allowed = productIdForAudience(audience);
      if (allowed && productId !== allowed) return;
      setItems((prev) => sanitizeItems([...prev, { productId, quantity }]));
    },
    [audience]
  );

  const removeItem = useCallback((productId: PrebookProductId) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: PrebookProductId, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((item) => item.productId !== productId));
      return;
    }
    setItems((prev) =>
      sanitizeItems(prev.map((item) => (item.productId === productId ? { ...item, quantity } : item)))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const lines = useMemo(() => {
    return items.flatMap((item) => {
      const product = getPrebookProduct(item.productId);
      if (!product) return [];
      return [{ ...item, product }];
    });
  }, [items]);

  const count = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines]);
  const totalCents = useMemo(
    () =>
      lines.reduce((sum, line) => {
        const price = line.product.priceCents ?? 0;
        return sum + price * line.quantity;
      }, 0),
    [lines]
  );

  const value = useMemo(
    () => ({ items, lines, count, totalCents, addItem, removeItem, setQuantity, clearCart }),
    [items, lines, count, totalCents, addItem, removeItem, setQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
