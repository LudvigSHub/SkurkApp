import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./Auth.css";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
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

    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError("Fyll i alla fält");
      return;
    }

    
      setIsSubmitting(true);
      setError("");

    const result = await register(
      formData.username,
      formData.email,
      formData.password
    );

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.message || "Något gick fel");
      return;
    }

    navigate("/");
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Registrera dig</h1>
        <p>Skapa ett konto och spara dina favoriter.</p>

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
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
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
            {isSubmitting ? "Skapar konto..." : "Skapa konto"}
          </button>
        </form>

        <p className="auth-link-text">
          Har du redan konto? <Link to="/login">Logga in</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;