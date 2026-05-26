function FeaturedMealCard({ meal, mascotImage }) {
  return (
    <article className="featured-meal-card">
      <img
        src={meal.image}
        alt={meal.name}
        className="featured-meal-image"
      />

      <div className="featured-meal-info">
        <h2>{meal.name}</h2>

        <ul>
          <li>{meal.kcal} kcal</li>
          <li>{meal.protein}g protein</li>
          <li>{meal.price}kr</li>
        </ul>
      </div>

      <button className="featured-meal-button">
        Lägg i varukorgen
      </button>

      <img
        src={mascotImage}
        alt="SKURK mascot"
        className="featured-meal-mascot"
      />
    </article>
  );
}

export default FeaturedMealCard;