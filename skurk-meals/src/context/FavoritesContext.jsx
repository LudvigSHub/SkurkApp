import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);

  function toggleFavorite(productId) {
    setFavoriteIds((prevIds) => {
      const isFavorite = prevIds.includes(productId);

      if (isFavorite) {
        return prevIds.filter((id) => id !== productId);
      }

      return [...prevIds, productId];
    });
  }

  function isFavorite(productId) {
    return favoriteIds.includes(productId);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }

  return context;
}