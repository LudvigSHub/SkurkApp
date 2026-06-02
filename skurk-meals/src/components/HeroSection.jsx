import { Link } from "react-router-dom";


import mascot from "../assets/mascot/Mascot_PekaUppVänster.png";
import FeaturedMealCard from "./cards/FeaturedMealCard";

import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

import "./HeroSection.css";

function HeroSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setError("Kunde inte hämta dagens utvalda matlåda");
      }finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

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

    {/* Olika utskrifter beroende på vilken state vi är i: */}
       {/* loading ? Om loading är true: - visa detta */}
        {/* error ? Om error inte är tomt: - visa error*/}
          {/* featuredMeal ? finns featured meal? ja - visa detta. */}
            {/* Nej - visa detta */}
     {loading ? (
        <p className="hero-loading">Hämtar dagens matlåda...</p>
      ): error ? (
        <p className="hero-loading">{error}</p>
      ) : featuredMeal ? (
        <FeaturedMealCard meal={featuredMeal} mascotImage={mascot} />
      ) : (
        <p className="hero-loading">Ingen utvald matlåda hittades.</p>
      )}
    </section>
  );
}

export default HeroSection;