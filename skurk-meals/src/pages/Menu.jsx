import { useEffect, useState } from "react";
import { getProducts } from "../services/api.js";
import {useFavorites} from "../context/FavoritesContext.jsx";

import CategoryFilter from "../components/menu/CategoryFilter"
import ProductGrid from "../components/menu/ProductGrid";
import "./Menu.css";

function Menu() {
  const [selectedFilter, setSelectedFilter] = useState("Alla rätter");

  // Hämtar favorit-id:n från FavoritesContext
  const { favoriteIds } = useFavorites();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filtrerar produkterna beroende på vilken kategori användaren valt
  // "Alla rätter" visar alla produkter
  // "Favoriter" visar bara produkter som finns i favoriteIds
  // Annars filtreras på kategori
  const filteredProducts =
    selectedFilter === "Alla rätter"
      ? products
      : selectedFilter === "Favoriter"
      ? products.filter((product) => favoriteIds.includes(product.id))
      : products.filter((product) => product.category === selectedFilter);

      // Hämtar produkter från backend när sidan laddas
      // Hanterar loading och error state
      // useEffect körs när komponenten mountas, alltså när sidan öppnas
      useEffect(() => {
        async function loadProducts(){
          try {
            const data = await getProducts();
            setProducts(data);
          }catch (error) {
            setError("Kunde inte hämta menyn. Testa att ladda om sidan.");
          } finally{
            setLoading(false);
          }
        }

        loadProducts();
        },[]);

        if (loading) {
          return (
            <main className="menu-page">
              <section className="menu-header">
                <h1>MENY</h1>
                <p>Hämtar menyn...</p>
              </section>
            </main>
          )
        }
        if (error) {
          return (
            <main className="menu-page">
              <section className="menu-header">
                <h1>MENY</h1>
                <p>{error}</p>
              </section>
            </main>
  );
}
  return (
    <main className="menu-page">
      <section className="menu-header">
        <h1>MENY</h1>
        <p>Välj dina favoriter och bygg din nästa matlåda.</p>
      </section>

      <CategoryFilter
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
      />

      {filteredProducts.length === 0 ? (
        <p className="menu-empty-message">
          {selectedFilter === "Favoriter"
          ? "Du har inga favoriter ännu."
          : "Inga rätter hittades i denna kategori."}
        </p>
      ) : (
  <ProductGrid products={filteredProducts} />
)}
    </main>
  );
}

export default Menu;