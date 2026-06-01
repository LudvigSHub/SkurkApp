import { Link, useLocation } from "react-router-dom";

import "./Confirmation.css";

function Confirmation() {
  const location = useLocation();

  const order = location.state?.order;

  if (!order) {
    return (
      <main>
        <h1>Ingen order hittades</h1>
        <Link to="/menu">Till menyn</Link>
      </main>
    );
  }

  return (
    <main className="confirmation-page">
  <section className="confirmation-card">
    <h1>Tack för din beställning!</h1>

    <p>
      Din leverans skickas till {order.customer.address}, {order.customer.city}.
    </p>

    <p>Leveransdag: {order.customer.deliveryDay}</p>

    <div className="confirmation-details">
      <h2>Din order</h2>

      <div className="confirmation-order-list">
        {order.items.map((item) => (
          <div key={item.id} className="confirmation-order-item">
            <span>
              {item.quantity} × {item.name}
            </span>
            <strong>{item.price * item.quantity} kr</strong>
          </div>
        ))}
      </div>

      <div className="confirmation-total">
        <span>Total</span>
        <strong>{order.total} kr</strong>
      </div>
    </div>

    <div className="confirmation-actions">
      <Link to="/menu" className="button button-primary">
        Till menyn
      </Link>
    </div>
  </section>
</main>
  );
}

export default Confirmation;