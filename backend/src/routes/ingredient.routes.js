// filename: src/routes/ingredient.routes.js

import express from "express";
import { verifyToken } from "#middleware/auth.middleware";
import {
  getIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient
} from "#controllers/ingredient.controller";

const router = express.Router();

router.post("/", verifyToken, createIngredient);
router.get("/", getIngredients);
router.get("/:id", getIngredientById);
router.post("/", createIngredient);
router.put("/:id", updateIngredient);
router.delete("/:id", deleteIngredient);

export default router;