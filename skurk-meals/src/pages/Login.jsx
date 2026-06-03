import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);
    setError("");

    const result = await login(formData.username, formData.password);

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/");
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Sign in</h1>
        <p>Logga in med ditt SKURK-konto.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Användarnamn
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>

          <label>
            Lösenord
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button className="button button-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loggar in..." : "Logga in"}
          </button>
        </form>

        <p className="auth-link-text">
          Har du inget konto? <Link to="/register">Registrera dig</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;