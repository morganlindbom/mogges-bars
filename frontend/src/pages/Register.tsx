// filename: src/pages/Register.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import shell from "./PageShell.module.css";

/**
 * Register page.
 *
 * Handles user account creation.
 */
function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to create account");
      }

      navigate("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={shell.page}>
      <h1>Create Account</h1>

      <div className={shell.card}>
        {error && <p className={shell.error}>{error}</p>}

        <form onSubmit={handleSubmit} className={shell.formGrid}>
          <label className={shell.field}>
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

          <label className={shell.field}>
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

          <div className={shell.actions}>
            <button className={shell.primaryButton} disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;
