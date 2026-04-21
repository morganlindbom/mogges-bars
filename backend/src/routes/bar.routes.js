// filename: src/routes/bar.routes.js

import express from "express";
import * as barController from "#controllers/bar.controller";

/**
 * Bar routes.
 *
 * Defines all endpoints related to bar resources.
 */
const router = express.Router();

/**
 * GET /api/bars
 */
router.get("/", barController.getBars);

/**
 * GET /api/bars/:id
 */
router.get("/:id", barController.getBarById);

/**
 * POST /api/bars
 */
router.post("/", barController.createBar);

/**
 * PUT /api/bars/:id
 */
router.put("/:id", barController.updateBar);

/**
 * DELETE /api/bars/:id
 */
router.delete("/:id", barController.deleteBar);

export default router;