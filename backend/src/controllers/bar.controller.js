// filename: src/controllers/bar.controller.js

export async function getBars(req, res, next) {
  try {
    res.json([]);
  } catch (err) {
    next(err);
  }
}

export async function getBarById(req, res, next) {
  try {
    res.json({ id: req.params.id });
  } catch (err) {
    next(err);
  }
}

export async function createBar(req, res, next) {
  try {
    res.status(201).json(req.body);
  } catch (err) {
    next(err);
  }
}

export async function updateBar(req, res, next) {
  try {
    res.json({ updated: true });
  } catch (err) {
    next(err);
  }
}

export async function deleteBar(req, res, next) {
  try {
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}