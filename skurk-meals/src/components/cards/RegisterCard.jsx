import "./RegisterCard.css";

function RegisterCard({mascotImage}) {
    return ( 
        <article className="register-card">
      <h2>Har du inget konto?</h2>

      <button className="button button-primary">
        Registrera dig
      </button>

      <img
        src={mascotImage}
        alt="SKURK mascot"
        className="register-card-mascot"
      />
    </article>
     );
}

export default RegisterCard;