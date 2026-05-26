import { Link } from "react-router-dom";

import koreanBeefBowl from "../assets/foodPictures/KoreanBeefBowl.png";
import mascot from "../assets/mascot/Mascot_PekaUppVänster.png";
import FeaturedMealCard from "./cards/FeaturedMealCard";

function HeroSection() {
    const featuredMeal = {
      name: "Korean Beef Bowl",
      kcal: 620,
      protein: 42,
      price: 109,
      image: koreanBeefBowl,
    };
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
          <Link to="/menu" className="primary-button">
            Se meny
          </Link>

          <a href="#how-it-works" className="secondary-button">
            Så funkar det
          </a>
        </div>
      </div>

     <FeaturedMealCard meal={featuredMeal} mascotImage={mascot} />
    </section>
  );
}

export default HeroSection;