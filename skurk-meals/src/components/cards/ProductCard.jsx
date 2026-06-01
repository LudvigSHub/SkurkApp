import "./ProductCard.css";
import { useCart } from "../../context/CartContext.jsx";
import { useFavorites } from "../../context/FavoritesContext.jsx";

function ProductCard({ meal }) {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(meal.id);
  return (
    <article className="product-card">
      <img src={meal.image} alt={meal.name} className="product-card-image" />

      <div className="product-card-info">
        <h3>{meal.name}</h3>

        <ul>
          <li>{meal.kcal} kcal</li>
          <li>{meal.protein}g protein</li>
        </ul>
        <p className="product-card-price">{meal.price} kr</p>
      </div>

      

        <div className="product-card-actions">
            <button className="button button-primary product-card-button" 
            onClick={() => addToCart(meal)}>
                Lägg i varukorgen
            </button>

            <button
                className={
                favorite
                  ? "product-card-favorite active"
                  : "product-card-favorite"
              }
                onClick={() => toggleFavorite(meal.id)}
                aria-label="Lägg till favorit"
            >
                {favorite ? "♥" : "♡"}
            </button>
        </div>
    </article>
  );
}

export default ProductCard;