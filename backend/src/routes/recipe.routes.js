// filename: backend/src/routes/recipe.routes.js

import express from "express";
import {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
} from "../controllers/recipe.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";

/* Recipe routes.

   Detailed explanation:
   - GET: public read endpoints
   - POST: create (protected)
   - PUT: update (protected)
   - DELETE: remove (protected)
   - Follows REST conventions
*/

const router = express.Router();

/* READ */
router.get("/", getRecipes);            // supports ?type=bar
router.get("/:id", getRecipeById);

/* CREATE */
router.post("/", verifyToken, createRecipe);

/* UPDATE */
router.put("/:id", verifyToken, updateRecipe);

/* DELETE */
router.delete("/:id", verifyToken, deleteRecipe);

export default router;