import ProductCard from "./cards/ProductCard";


import { getProducts } from "../services/api";
import { useEffect, useState } from "react";

import "./PopularMealsSection.css";

function PopularMeals() {
   
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setError("Kunde inte hämta populära matlådor");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const popularMeals = products.filter((meal) => meal.popular);

  return (
    <section className="popular-meals-section">
      <div className="popular-meals-header">
        <h2>Populära matlådor</h2>

        <p>
          Ta en kik på våra favoritmatlådor, menyn ändras varannan vecka.
        </p>
      </div>

     {/* Olika utskrifter beroende på vilken state vi är i: */}
       {/* loading ? Om loading är true: - visa detta */}
        {/* error ? Om error inte är tomt: - visa error*/}
          {/* Innehåller popularmeals något? ja - mappa igenom listan. */}
            {/* Nej - visa detta */}
     <div className="popular-meals-grid">
        {loading ? (
          <p className="popular-meals-message">Hämtar populära matlådor...</p>
        ) : error ? (
          <p className="popular-meals-message">{error}</p>
        ) : popularMeals.length > 0 ? (
          popularMeals.map((meal) => (
            <ProductCard key={meal.id} meal={meal} />
          ))
        ) : (
          <p className="popular-meals-message">
            Inga populära matlådor hittades.
          </p>
        )}
      </div>
    </section>
  );
}

export default PopularMeals;