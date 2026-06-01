import { useCart } from "../../context/CartContext";

import "./CheckoutSummary.css";

function CheckoutSummary() {
  const { cartItems, cartTotal } = useCart();

  return (
    <aside className="checkout-summary">
      <h2>Din order</h2>

      <div className="checkout-summary-items">
        {cartItems.map((item) => (
          <div key={item.id} className="checkout-summary-item">
            <span>
              {item.quantity} × {item.name}
            </span>

            <strong>{item.price * item.quantity} kr</strong>
          </div>
        ))}
      </div>

      <div className="checkout-summary-total">
        <span>Total</span>
        <strong>{cartTotal} kr</strong>
      </div>
    </aside>
  );
}

export default CheckoutSummary;