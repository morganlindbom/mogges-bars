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
router.put("/:id", verifyToken, updateIngredient);
router.delete("/:id", verifyToken, deleteIngredient);

export default router;