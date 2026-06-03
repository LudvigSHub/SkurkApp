import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";

const FavoritesContext = createContext();

// Hämta sparade favoriter från localStorage
function getSavedFavorites(storageKey) {
  const savedFavorites = localStorage.getItem(storageKey);
  return savedFavorites ? JSON.parse(savedFavorites) : [];
}

export function FavoritesProvider({ children }) {
  // Hämta user från authContext
  const { user } = useAuth();

  // om user finns, använd "favorites_{user.id}" som nyckel, annars "favorites_guest"
  // Det sparas ungefär så här i localStorage:
  // "favorites_123": [1, 5, 8] (för inloggad användare med id 123)
  // "favorites_guest": [2, 4] (för gästanvändare)
  // [1, 5, 8] är en array av produkt-id:n som är favoriter
  const storageKey = user?.id
    ? `favorites_${user.id}`
    : "favorites_guest";

  const [favoriteIds, setFavoriteIds] = useState([]);

  // ladda favoriter när user/storageKey ändras
  useEffect(() => {
    const savedFavorites = getSavedFavorites(storageKey);
    setFavoriteIds(savedFavorites);
  }, [storageKey]);

  // Funktion för att toggla favoriter
  // sparar produkten i localStorage under "favorites_{user.id}" eller "favorites_guest"
  // och uppdaterar state
  function toggleFavorite(productId) {
    setFavoriteIds((prevIds) => {
      const isAlreadyFavorite = prevIds.includes(productId);

      const updatedFavorites = isAlreadyFavorite
        ? prevIds.filter((id) => id !== productId)
        : [...prevIds, productId];

      localStorage.setItem(storageKey, JSON.stringify(updatedFavorites));

      return updatedFavorites;
    });
  }

  // Funktion för att kolla om en produkt är favorit
  // så bool för om hjärtat ska vara fyllt eller inte
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