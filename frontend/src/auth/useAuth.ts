// filename: src/auth/useAuth.ts

import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {
/* useAuth hook.

   Detailed explanation:
   - Purpose: Access auth context
   - Inputs: None
   - Outputs: AuthContext
   - Edge cases:
     - Used outside provider
*/

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}