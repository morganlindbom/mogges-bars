// filename: src/routes/bar.routes.js

/**
 * Bar routes.
 *
 * Defines all endpoints related to bar resources.
 * Delegates logic to controller layer.
 */

import express from "express";
import * as barController from "#controllers/bar.controller";

const router = express.Router();

/**
 * GET /api/bars
 *
 * Fetch all bars.
 */
router.get("/", barController.getBars);

/**
 * GET /api/bars/:id
 *
 * Fetch a single bar by ID.
 */
router.get("/:id", barController.getBarById);

/**
 * POST /api/bars
 *
 * Create a new bar.
 */
router.post("/", barController.createBar);

/**
 * PUT /api/bars/:id
 *
 * Update a bar by ID.
 */
router.put("/:id", barController.updateBar);

/**
 * DELETE /api/bars/:id
 *
 * Delete a bar by ID.
 */
router.delete("/:id", barController.deleteBar);

export default router;