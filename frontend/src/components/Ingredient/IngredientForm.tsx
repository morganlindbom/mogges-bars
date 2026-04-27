// filename: src/components/Ingredient/IngredientForm.tsx

import { useState } from "react";
import { createIngredient } from "@/services/ingredient.api";
import { useAuth } from "@/auth/useAuth";
import { AddIngredient } from "@/types";
import styles from "./IngredientForm.module.css";

type Props = Readonly<{
  onSuccess: () => void;
}>;

const initialForm: AddIngredient = {
  name: "",
  calories: "",
  carbs: "",
  fat: "",
  protein: "",
  density: "",
  pricePer1000g: "",
};

export default function IngredientForm({ onSuccess }: Props) {
  const { token } = useAuth();

  const [form, setForm] = useState<AddIngredient>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token) {
    return (
      <p className={styles.muted}>You must be logged in to add ingredients.</p>
    );
  }

  function updateField(key: keyof AddIngredient, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      name: form.name.trim(),
      calories: Number(form.calories),
      carbs: Number(form.carbs),
      fat: Number(form.fat),
      protein: Number(form.protein),
      density: Number(form.density),
      pricePer1000g: Number(form.pricePer1000g),
    };

    if (!payload.name) {
      setError("Name is required.");
      return;
    }

    const numericValues = [
      payload.calories,
      payload.carbs,
      payload.fat,
      payload.protein,
      payload.density,
      payload.pricePer1000g,
    ];

    if (numericValues.some((value) => Number.isNaN(value) || value < 0)) {
      setError(
        "All numeric fields must be valid numbers greater than or equal to 0.",
      );
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await createIngredient(payload);
      setForm(initialForm);
      onSuccess();
    } catch {
      setError("Failed to create ingredient.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formGrid}>
      <label className={styles.field} htmlFor="ingredient-name">
        <span>Name</span>
        <input
          id="ingredient-name"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          required
        />
      </label>

      <label className={styles.field} htmlFor="ingredient-calories">
        <span>Calories (per 100g)</span>
        <input
          id="ingredient-calories"
          type="number"
          min={0}
          value={form.calories}
          onChange={(e) => updateField("calories", e.target.value)}
          required
        />
      </label>

      <label className={styles.field} htmlFor="ingredient-carbs">
        <span>Carbs (per 100g)</span>
        <input
          id="ingredient-carbs"
          type="number"
          min={0}
          value={form.carbs}
          onChange={(e) => updateField("carbs", e.target.value)}
          required
        />
      </label>

      <label className={styles.field} htmlFor="ingredient-fat">
        <span>Fat (per 100g)</span>
        <input
          id="ingredient-fat"
          type="number"
          min={0}
          value={form.fat}
          onChange={(e) => updateField("fat", e.target.value)}
          required
        />
      </label>

      <label className={styles.field} htmlFor="ingredient-protein">
        <span>Protein (per 100g)</span>
        <input
          id="ingredient-protein"
          type="number"
          min={0}
          value={form.protein}
          onChange={(e) => updateField("protein", e.target.value)}
          required
        />
      </label>

      <label className={styles.field} htmlFor="ingredient-density">
        <span>Density</span>
        <input
          id="ingredient-density"
          type="number"
          min={0}
          value={form.density}
          onChange={(e) => updateField("density", e.target.value)}
          required
        />
      </label>

      <label className={styles.field} htmlFor="ingredient-price">
        <span>Price per 1000g</span>
        <input
          id="ingredient-price"
          type="number"
          min={0}
          value={form.pricePer1000g}
          onChange={(e) => updateField("pricePer1000g", e.target.value)}
          required
        />
      </label>

      <div className={styles.actions}>
        <button
          className={styles.primaryButton}
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Adding..." : "Add Ingredient"}
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </form>
  );
}
