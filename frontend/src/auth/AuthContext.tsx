// filename: src/auth/AuthContext.tsx

import { createContext, useState, useEffect, useMemo, ReactNode } from "react";

type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = Readonly<{
  children: ReactNode;
}>;

export function AuthProvider({ children }: AuthProviderProps) {
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
    setToken(null);
    localStorage.removeItem("token");
  }

  const value = useMemo(() => ({ token, login, logout }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
