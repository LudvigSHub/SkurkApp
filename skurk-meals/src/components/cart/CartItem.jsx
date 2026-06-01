import { useCart } from "../../context/CartContext";

import "./CartItem.css";

function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <article className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />

      <div className="cart-item-info">
        <h2>{item.name}</h2>
        <p>{item.kcal} kcal · {item.protein}g protein</p>
        <p>{item.price} kr/st</p>
      </div>

      <div className="cart-item-quantity">
        <button onClick={() => decreaseQuantity(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => increaseQuantity(item.id)}>+</button>
      </div>

      <p className="cart-item-total">
        {item.price * item.quantity} kr
      </p>

      <button
        className="cart-item-remove"
        onClick={() => removeFromCart(item.id)}
        aria-label="Ta bort produkt"
      >
        ×
      </button>
    </article>
  );
}

export default CartItem;