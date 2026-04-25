// filename: src/App.tsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout/MainLayout";

import Home from "@/pages/Home";
import Bars from "@/pages/Bars";
import Shakes from "@/pages/Shakes";
import RecipesPage from "@/pages/Recipes/RecipesPage";
import IngredientsPage from "@/pages/Ingredient/IngredientsPage";

import Statistics from "@/pages/Statistics";
import Compare from "@/pages/Compare";

import Login from "@/pages/Login";
import Register from "@/pages/Register";

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