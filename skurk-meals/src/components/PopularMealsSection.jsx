import ProductCard from "./cards/ProductCard";

import teriyakiSalmon from "../assets/foodPictures/TeriyakiSalmon.png";
import buffaloChickenPasta from "../assets/foodPictures/BuffaloChickenPasta.png";
import koreanBeefBowl from "../assets/foodPictures/KoreanBeefBowl.png";

import "./PopularMealsSection.css";

function PopularMeals() {
  const popularMeals = [
    {
      id: 1,
      name: "Teriyaki Salmon Bowl",
      kcal: 580,
      protein: 39,
      price: 125,
      image: teriyakiSalmon,
    },
    {
      id: 2,
      name: "Buffalo Chicken Pasta",
      kcal: 690,
      protein: 52,
      price: 119,
      image: buffaloChickenPasta,
    },
    {
      id: 3,
      name: "Korean Beef Bowl",
      kcal: 620,
      protein: 42,
      price: 109,
      image: koreanBeefBowl,
    },
  ];

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