// filename: src/pages/Ingredient/AddIngredientPage.tsx

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";
import styles from "./AddIngredientPage.module.css";
import {
  createIngredient,
  getIngredientById,
  updateIngredient,
} from "@/services/ingredient.api";

type FormState = {
  name: string;
  calories: string;
  carbs: string;
  fat: string;
  protein: string;
  density: string;
  pricePer1000g: string;
};

const initialForm: FormState = {
  name: "",
  calories: "",
  carbs: "",
  fat: "",
  protein: "",
  density: "",
  pricePer1000g: "",
};

export default function AddIngredientPage() {
/* Ingredient form page.

   Detailed explanation:
   - Grid layout with 2 columns
   - Last row: price (left) + buttons (right)
   - Text inputs used, parsed to numbers on submit
*/

  const { id } = useParams<{ id?: string }>();
  const isEditMode = Boolean(id);
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState<boolean>(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pageTitle = useMemo(
    () => (isEditMode ? "Edit Ingredient" : "Add Ingredient"),
    [isEditMode]
  );

  const submitLabel = useMemo(() => {
    if (submitting) return isEditMode ? "Saving..." : "Adding...";
    return isEditMode ? "Save Ingredient" : "Add Ingredient";
  }, [isEditMode, submitting]);

  useEffect(() => {
/* Load ingredient when editing */

    if (!isEditMode || !id) return;

    async function loadIngredient() {
      try {
        setLoading(true);
        const ingredient = await getIngredientById(id);

        setForm({
          name: ingredient.name,
          calories: String(ingredient.calories),
          carbs: String(ingredient.carbs),
          fat: String(ingredient.fat),
          protein: String(ingredient.protein),
          density: String(ingredient.density),
          pricePer1000g: String(ingredient.pricePer1000g),
        });

        setError(null);
      } catch {
        setError("Failed to load ingredient");
      } finally {
        setLoading(false);
      }
    }

    loadIngredient();
  }, [id, isEditMode]);

  function updateField(key: keyof FormState, value: string) {
/* Update form field */

    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
/* Submit form */

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

    const numericValues = Object.values(payload).slice(1);

    if (numericValues.some((v) => Number.isNaN(v) || v < 0)) {
      setError("All numeric fields must be valid numbers ≥ 0.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      if (isEditMode && id) {
        await updateIngredient(id, payload);
      } else {
        await createIngredient(payload);
      }

      navigate("/ingredients");
    } catch {
      setError("Failed to save ingredient.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!token) {
    return (
      <section className={styles.page}>
        <h1>{pageTitle}</h1>
        <p className={styles.error}>
          You must be logged in to manage ingredients.
        </p>
      </section>
    );
  }

  if (loading) {
    return (
      <section className={styles.page}>
        <h1>{pageTitle}</h1>
        <p className={styles.muted}>Loading...</p>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <h1>{pageTitle}</h1>

      <div className={styles.card}>
        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.formGrid}>

          <label className={styles.field}>
            <span>Name</span>
            <input type="text" value={form.name} onChange={(e) => updateField("name", e.target.value)} required />
          </label>

          <label className={styles.field}>
            <span>Calories</span>
            <input type="text" value={form.calories} onChange={(e) => updateField("calories", e.target.value)} required />
          </label>

          <label className={styles.field}>
            <span>Carbs</span>
            <input type="text" value={form.carbs} onChange={(e) => updateField("carbs", e.target.value)} required />
          </label>

          <label className={styles.field}>
            <span>Fat</span>
            <input type="text" value={form.fat} onChange={(e) => updateField("fat", e.target.value)} required />
          </label>

          <label className={styles.field}>
            <span>Protein</span>
            <input type="text" value={form.protein} onChange={(e) => updateField("protein", e.target.value)} required />
          </label>

          <label className={styles.field}>
            <span>Density</span>
            <input type="text" value={form.density} onChange={(e) => updateField("density", e.target.value)} required />
          </label>

          {/* 🔥 LAST ROW */}
          <label className={styles.field}>
            <span>Price per 1000g</span>
            <input
              type="text"
              value={form.pricePer1000g}
              onChange={(e) => updateField("pricePer1000g", e.target.value)}
              required
            />
          </label>

          <div className={styles.actionsRight}>
            <button className={styles.primaryButton} type="submit" disabled={submitting}>
              {submitLabel}
            </button>

            <Link className={styles.secondaryButton} to="/ingredients">
              Cancel
            </Link>
          </div>

        </form>
      </div>
    </section>
  );
}