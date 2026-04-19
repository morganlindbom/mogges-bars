// filename: src/controllers/bar.controller.js

import Bar from "#models/bar.model";

/**
 * Get all bars
 */
export async function getBars(req, res, next) {

  try {
    const bars = await Bar.find();

    res.json(bars);

  } catch (err) {
    next(err);
  }
}

/**
 * Get one bar
 */
export async function getBarById(req, res, next) {

  try {
    const bar = await Bar.findById(req.params.id);

    if (!bar) {
      return res.status(404).json({ message: "Bar not found" });
    }

    res.json(bar);

  } catch (err) {
    next(err);
  }
}

/**
 * Create bar
 */
export async function createBar(req, res, next) {

  try {
    const bar = await Bar.create(req.body);

    res.status(201).json(bar);

  } catch (err) {
    next(err);
  }
}

/**
 * Update bar
 */
export async function updateBar(req, res, next) {

  try {
    const updated = await Bar.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updated);

  } catch (err) {
    next(err);
  }
}

/**
 * Delete bar
 */
export async function deleteBar(req, res, next) {

  try {
    await Bar.findByIdAndDelete(req.params.id);

    res.status(204).send();

  } catch (err) {
    next(err);
  }
}