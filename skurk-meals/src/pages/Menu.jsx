import { useEffect, useState } from "react";
import { getProducts } from "../services/api.js";
import {useFavorites} from "../context/FavoritesContext.jsx";

import CategoryFilter from "../components/menu/CategoryFilter"
import ProductGrid from "../components/menu/ProductGrid";
import "./Menu.css";

function Menu() {
  const [selectedFilter, setSelectedFilter] = useState("Alla rätter");

  const { favoriteIds } = useFavorites();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filteredProducts =
    selectedFilter === "Alla rätter"
      ? products
      : selectedFilter === "Favoriter"
      ? products.filter((product) => favoriteIds.includes(product.id))
      : products.filter((product) => product.category === selectedFilter);

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