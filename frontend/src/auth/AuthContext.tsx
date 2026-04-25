// filename: src/auth/AuthContext.tsx

import { createContext, useState, useEffect, ReactNode } from "react";

type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
/* Auth provider.

   Detailed explanation:
   - Purpose: Store global authentication state
   - Inputs: children
   - Outputs: Context provider
   - Edge cases:
     - Token missing in storage
*/

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
/* Init token from storage.

   Detailed explanation:
   - Purpose: Restore session on reload
   - Inputs: None
   - Outputs: Sets token if exists
   - Edge cases:
     - No token in storage
*/

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  function login(newToken: string) {
/* Login handler.

   Detailed explanation:
   - Purpose: Save JWT token
   - Inputs: token
   - Outputs: updates state + localStorage
   - Edge cases:
     - invalid token
*/

    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  function logout() {
/* Logout handler.

   Detailed explanation:
   - Purpose: Clear authentication
   - Inputs: None
   - Outputs: resets state + storage
   - Edge cases:
     - None
*/

    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}