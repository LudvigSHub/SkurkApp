import "./RegisterCard.css";
import { NavLink } from "react-router-dom";

function RegisterCard({mascotImage}) {
    return ( 
        <article className="register-card">
      <h2>Har du inget konto?</h2>

      <NavLink to="/register">
        <button className="button button-primary">
          Registrera dig
        </button>
      </NavLink>

      <img
        src={mascotImage}
        alt="SKURK mascot"
        className="register-card-mascot"
      />
    </article>
     );
}

export default RegisterCard;