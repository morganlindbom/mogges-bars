// filename: src/routes/recipe.routes.js

import express from "express";
import { createRecipe, getRecipes } from "#controllers/recipe.controller";
import { verifyToken } from "#middleware/auth.middleware";

const router = express.Router();

/**
 * GET /api/recipes?type=bar|shake
 */
router.get("/", getRecipes);

/**
 * POST /api/recipes
 */
router.post("/", verifyToken, createRecipe);

export default router;