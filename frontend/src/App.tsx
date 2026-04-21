// filename: src/App.tsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

import Home from "@/pages/Home";
import Bars from "@/pages/Bars";
import CreateBar from "@/pages/CreateBar";
import BarDetails from "@/pages/BarDetails";
import EditBar from "@/pages/EditBar";
import Ingredients from "@/pages/Ingredients";
import CreateIngredient from "@/pages/CreateIngredient";
import Stats from "@/pages/Stats";

/**
 * App routing.
 *
 * Defines all application routes.
 */
function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>

          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/home" />} />

          {/* Core pages */}
          <Route path="/home" element={<Home />} />
          <Route path="/bars" element={<Bars />} />

          {/* CRUD routes */}
          <Route path="/bars/create" element={<CreateBar />} />
          <Route path="/bars/:id" element={<BarDetails />} />
          <Route path="/bars/:id/edit" element={<EditBar />} />

          {/* Other collections */}
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/ingredients/create" element={<CreateIngredient />} />

          {/* Custom feature */}
          <Route path="/stats" element={<Stats />} />

          {/* Fallback */}
          <Route path="*" element={<h1>404 - Page not found</h1>} />

        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;