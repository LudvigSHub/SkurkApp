import { NavLink } from "react-router-dom";
import skurkLogo from "../assets/SKURK_logo.png";
import { useCart } from "../context/CartContext";

import "./Navbar.css";

function Navbar() {
  const { cartCount } = useCart();
  return (
   <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-logo">
          <img src={skurkLogo} alt="SKURK Meals logo" />
        </NavLink>

        <nav className="navbar-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/about">About us</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <div className="navbar-actions">
          <NavLink to="/cart" className="cart-link" aria-label="Varukorg">
            🛒 
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </NavLink>

          <NavLink to="/login" className="navbar-button">
            Sign in
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Navbar;