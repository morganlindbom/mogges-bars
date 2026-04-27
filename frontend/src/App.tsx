// filename: src/App.tsx

import { lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout/MainLayout";

const Home = lazy(() => import("@/pages/Home/Home"));
const Bars = lazy(() => import("@/pages/Bar/Bars"));
const Shakes = lazy(() => import("@/pages/Shake/Shakes"));

const RecipesPage = lazy(() => import("@/pages/Recipes/RecipesPage"));

// 🔥 KORREKT PATH (din mapp)
const EditRecipePage = lazy(
  () => import("@/pages/EditRecipe/EditRecipePage"),
);

const IngredientsPage = lazy(
  () => import("@/pages/Ingredient/IngredientsPage"),
);

// 🔥 DETTA VAR DIN CRASH
const AddIngredientPage = lazy(
  () => import("@/pages/AddIngredient/AddIngredientPage"),
);

const Statistics = lazy(() => import("@/pages/Statistic/Statistics"));
const Compare = lazy(() => import("@/pages/Compare/Compare"));
const Login = lazy(() => import("@/pages/Login/Login"));
const Register = lazy(() => import("@/pages/Register/Register"));

function App() {
/* App routing */

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>

          <Route path="/" element={<Navigate to="/home" />} />

          {/* Public */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Recipes */}
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipes/:id/edit" element={<EditRecipePage />} />

          {/* Ingredients */}
          <Route path="/ingredients" element={<IngredientsPage />} />
          <Route path="/ingredients/add" element={<AddIngredientPage />} />
          <Route path="/ingredients/:id/edit" element={<AddIngredientPage />} />

          {/* Other */}
          <Route path="/bars" element={<Bars />} />
          <Route path="/shakes" element={<Shakes />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/compare" element={<Compare />} />

          <Route path="*" element={<h1>404 - Page not found</h1>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;