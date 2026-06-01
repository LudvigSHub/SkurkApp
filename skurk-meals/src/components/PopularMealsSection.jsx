import ProductCard from "./cards/ProductCard";

import { products } from "../data/products";


import "./PopularMealsSection.css";

function PopularMeals() {
   const popularMeals = products.filter((meal) => meal.popular);

  

  return (
    <section className="popular-meals-section">
      <div className="popular-meals-header">
        <h2>Populära matlådor</h2>

        <p>
          Ta en kik på våra favoritmatlådor, menyn ändras varannan vecka.
        </p>
      </div>

      <div className="popular-meals-grid">
        {popularMeals.map((meal) => (
          <ProductCard key={meal.id} meal={meal} />
        ))}
      </div>
    </section>
  );
}

export default PopularMeals;