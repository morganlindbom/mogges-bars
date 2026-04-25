// filename: src/auth/PrivateRoute.tsx

import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

type Props = {
  children: JSX.Element;
};

export default function PrivateRoute({ children }: Props) {
/* Private route.

   Detailed explanation:
   - Purpose: Protect routes that require authentication
   - Inputs: child component
   - Outputs: Either the component or redirect to login
   - Edge cases:
     - Missing token
*/

  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}