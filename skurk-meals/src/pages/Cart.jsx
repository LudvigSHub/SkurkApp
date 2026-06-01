import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

import CartItem from "../components/cart/CartItem";

import "./Cart.css";

function Cart() {
  const { cartItems, cartTotal } = useCart();

  return (
    <main className="cart-page">
      <section className="cart-header">
        <h1>Varukorg</h1>
        <p>Här ser du dina valda matlådor.</p>
      </section>

      {cartItems.length === 0 ? (
        <section className="cart-empty">
          <h2>Din varukorg är tom</h2>
          <Link to="/menu" className="button button-primary">
            Till menyn
          </Link>
        </section>
      ) : (
        <section className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Sammanfattning</h2>

            <div className="cart-summary-row">
              <span>Total</span>
              <strong>{cartTotal} kr</strong>
            </div>

            <Link to="/checkout" className="button button-primary cart-checkout-button">
              Gå till betalning
            </Link>
          </aside>
        </section>
      )}
    </main>
  );
}

export default Cart;