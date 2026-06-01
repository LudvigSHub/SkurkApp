import { useState } from "react";
import { products } from "../data/products";

import CategoryFilter from "../components/menu/CategoryFilter"
import ProductGrid from "../components/menu/ProductGrid";
import "./Menu.css";

function MenuPage() {

    const [selectedCategory, setSelectedCategory] = useState("Alla rätter");

  const filteredProducts =
    selectedCategory === "Alla rätter"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <main className="menu-page">
      <section className="menu-header">
        <h1>MENY</h1>
        <p>Välj dina favoriter och bygg din nästa matlåda.</p>
      </section>

      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <ProductGrid products={filteredProducts} />
    </main>
  );
}

export default MenuPage;