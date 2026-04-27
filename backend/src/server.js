// filename: backend/src/server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import ingredientRoutes from "#routes/ingredient.routes";
import recipeRoutes from "#routes/recipe.routes";
import authRoutes from "#routes/auth.routes";

import errorMiddleware from "#middleware/error.middleware";

dotenv.config();

const app = express();

/* Middleware setup.

   Detailed explanation:
   - Enables CORS
   - Parses JSON body
*/
app.use(cors());
app.use(express.json());

/* Route registration.

   Detailed explanation:
   - Mount all API routes
*/
app.use("/api/auth", authRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/recipes", recipeRoutes);

/* Error middleware (must be last) */
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

try {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("Connected to MongoDB");
  console.log("DB NAME:", mongoose.connection.name);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (err) {
  console.error("MongoDB connection error:", err);
  process.exit(1);
}
