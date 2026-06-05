import { createContext, useContext, useState } from "react";

// Skapar context för varukorgen så den kan användas i hela appen
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Lägger till en produkt i varukorgen
  // Om produkten redan finns ökas quantity istället
  function addToCart(product) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  }

  // Tar bort en produkt helt från varukorgen
  function removeFromCart(productId) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  }

  // Ökar antal på en produkt
  function increaseQuantity(productId) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  // Minskar antal på en produkt
  // Om quantity blir 0 tas produkten bort
  function decreaseQuantity(productId) {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Tömmer hela varukorgen, används efter lagd order
  function clearCart() {
    setCartItems([]);
  }

  // Räknar ut totalt antal produkter i varukorgen
  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Räknar ut totalpriset för hela varukorgen
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook så komponenter enkelt kan använda varukorgen
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}