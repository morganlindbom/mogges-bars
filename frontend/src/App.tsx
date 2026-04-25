// filename: src/App.tsx

import { lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout/MainLayout";

const Home = lazy(() => import("@/pages/Home"));
const Bars = lazy(() => import("@/pages/Bars"));
const Shakes = lazy(() => import("@/pages/Shakes"));
const RecipesPage = lazy(() => import("@/pages/Recipes/RecipesPage"));
const IngredientsPage = lazy(
  () => import("@/pages/Ingredient/IngredientsPage"),
);
const Statistics = lazy(() => import("@/pages/Statistics"));
const Compare = lazy(() => import("@/pages/Compare"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));

function App() {
  /* App routing.

   Detailed explanation:
   - Purpose: Define routes
   - Inputs: None
   - Outputs: Router structure
   - Edge cases:
     - 404 fallback
*/

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/home" />} />

          {/* Public */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Public READ */}
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/bars" element={<Bars />} />
          <Route path="/shakes" element={<Shakes />} />
          <Route path="/ingredients" element={<IngredientsPage />} />

          {/* Other */}
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/compare" element={<Compare />} />

          <Route path="*" element={<h1>404 - Page not found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
