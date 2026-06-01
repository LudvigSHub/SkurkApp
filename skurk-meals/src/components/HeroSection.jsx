import { Link } from "react-router-dom";


import mascot from "../assets/mascot/Mascot_PekaUppVänster.png";
import FeaturedMealCard from "./cards/FeaturedMealCard";

import { products } from "../data/products";
import "./HeroSection.css";

function HeroSection() {
    const featuredMeal = products.find((meal) => meal.showCase);
    
  return (
    <section className="hero-section">
      <div className="hero-info-card">
        <p className="eyebrow">SKURK MATLEVERANS</p>

        <h1>INTE DIN VANLIGA MATLÅDA</h1>

        <p className="hero-text">
          Färdiga rätter med tydliga makros och hög proteinhalt. Skurk är här
          för att du ska slippa laga dina tråkiga matlådor och leva ett tråkigt
          liv.
        </p>

        <div className="hero-actions">
          <Link to="/menu" className="button button-primary hero-button">
            Se meny
          </Link>

          <a href="#how-it-works" className="button button-secondary hero-button">
            Så funkar det
          </a>
        </div>
      </div>

     <FeaturedMealCard meal={featuredMeal} mascotImage={mascot} />
    </section>
  );
}

export default HeroSection;