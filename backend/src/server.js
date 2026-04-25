// filename: src/server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";


import ingredientRoutes from "#routes/ingredient.routes";
import recipeRoutes from "#routes/recipe.routes";
import errorMiddleware from "#middleware/error.middleware";

import authRoutes from "#routes/auth.routes";

dotenv.config();

const app = express();

/**
 * Connect to MongoDB
 */
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    console.log("DB NAME:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/ingredients", ingredientRoutes);
app.use("/api/recipes", recipeRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});