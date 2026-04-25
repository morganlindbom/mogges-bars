// filename: src/pages/Login.tsx

import { useState } from "react";
import { useAuth } from "@/auth/useAuth";

export default function Login() {
/* Login page.

   Detailed explanation:
   - Purpose: Authenticate user and store token
   - Inputs: email + password
   - Outputs: updates auth state
   - Edge cases:
     - invalid credentials
     - API failure
*/

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
/* Handle login submit.

   Detailed explanation:
   - Purpose: Send login request to backend
   - Inputs: form event
   - Outputs: stores token on success
   - Edge cases:
     - wrong credentials
     - network error
*/

    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const data = await res.json();

      login(data.token); // 🔥 CRITICAL LINE

    } catch (err) {
      console.error("Login error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />

      <button type="submit">Login</button>
    </form>
  );
}