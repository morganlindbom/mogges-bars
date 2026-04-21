// filename: src/pages/EditBar.tsx

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

/**
 * EditBar page.
 *
 * Updates a bar.
 */
function EditBar() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch(`/api/bars/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    });

    navigate("/bars");
  }

  return (
    <div>
      <h1>Edit Bar</h1>

      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditBar;