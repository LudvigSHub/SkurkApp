import { useState } from "react";
import { products } from "../data/products";
import {useFavorites} from "../context/FavoritesContext.jsx";

import CategoryFilter from "../components/menu/CategoryFilter"
import ProductGrid from "../components/menu/ProductGrid";
import "./Menu.css";

function Menu() {
  const [selectedFilter, setSelectedFilter] = useState("Alla rätter");

  const { favoriteIds } = useFavorites();

  const filteredProducts =
    selectedFilter === "Alla rätter"
      ? products
      : selectedFilter === "Favoriter"
      ? products.filter((product) => favoriteIds.includes(product.id))
      : products.filter((product) => product.category === selectedFilter);

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