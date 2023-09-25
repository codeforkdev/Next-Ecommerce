import { createContext, useEffect, useState } from "react";
import { useImmer } from "use-immer";
type Product = { id: string; name: string; img: string; price: number };
type CartItem = Product & { count: number };
type Cart = {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  shipping: number;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (id: string, quantity: number) => void;
};
type CartContextType = Cart;

export const CartContext = createContext<CartContextType>({
  items: [],
  totalItems: 0,
  subtotal: 0,
  shipping: 0,
  addItem: () => {},
  removeItem: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useImmer<CartItem[]>(
    JSON.parse(window.localStorage.getItem("store_cart") ?? "[]")
  );
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const newSubtotal = items.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
    setSubtotal(newSubtotal);
    setTotalItems(items.reduce((acc, item) => acc + item.count, 0));
    window.localStorage.setItem("store_cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    setShipping(() => (items.length === 0 || subtotal > 100 ? 0 : 25));
  }, [subtotal]);

  const addItem = (product: Product, quantity: number = 1) => {
    let existingItemIdx = items.findIndex((item) => item.id === product.id);

    if (existingItemIdx === -1) {
      setItems((draft) => {
        draft.push({ ...product, count: quantity });
      });
      return;
    }
    setItems((draft) => {
      const cartItem = draft[existingItemIdx];
      cartItem.count += quantity;
    });
  };

  const removeItem = (id: string, quantity: number = 1) => {
    const existingItemIdx = items.findIndex((i) => i.id === id);
    if (existingItemIdx === -1) return;

    setItems((draft) => {
      const cartItem = draft[existingItemIdx];
      cartItem.count -= quantity;
      if (cartItem.count <= 0) {
        draft.splice(existingItemIdx, 1);
      }
    });
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, subtotal, shipping, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}
