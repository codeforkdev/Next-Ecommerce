import { createContext, useState } from "react";

type Product = { id: string; name: string; img: string };
type CartItem = Product & { count: number };
type Cart = {
  items: CartItem[];
  addProduct: (product: Product) => void;
};
type CartContextType = Cart;

export const CartContext = createContext<CartContextType>({
  items: [],
  addProduct: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addProduct = (product: Product) => {
    console.log("add product to cart", product);
    let existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
      const item = existingItem;
      const otherItems = items.filter((i) => i.id !== item.id);
      setItems(() => [...otherItems, { ...item, count: item.count + 1 }]);
    } else {
      setItems((prev) => [...prev, { ...product, count: 1 }]);
    }
  };

  const removeProduct = () => {};

  return (
    <CartContext.Provider value={{ items, addProduct }}>
      {children}
    </CartContext.Provider>
  );
}
