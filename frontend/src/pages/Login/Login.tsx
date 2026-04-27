// filename: src/pages/Login.tsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";
import styles from "./Login.module.css";

/**
 * Login page.
 *
 * Handles user authentication by sending credentials
 * to backend and storing returned JWT token.
 */
function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  /**
   * Form state.
   *
   * Stores email and password input values.
   */
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * Handle input change.
   *
   * Updates form dynamically.
   */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  /**
   * Handle form submit.
   *
   * Sends login request to backend.
   */
  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await res.json();

      /**
       * Save token globally
       */
      login(data.token);

      /**
       * Redirect after login
       */
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Render UI.
   */
  return (
    <section className={styles.page}>
      <h1>Login</h1>

      <div className={styles.card}>
        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.formGrid}>
          <label className={styles.field}>
            <span>Email</span>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className={styles.field}>
            <span>Password</span>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          <div className={styles.actions}>
            <button
              className={styles.primaryButton}
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <p className={styles.muted}>
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
