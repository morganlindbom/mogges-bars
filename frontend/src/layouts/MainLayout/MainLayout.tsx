// filename: src/layouts/MainLayout/MainLayout.tsx

import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "./MainLayout.module.css";

export default function MainLayout() {
/* Main application layout.

   Detailed explanation:
   - Purpose: Provide global UI structure (navbar, content, footer)
   - Inputs: None
   - Outputs: Layout wrapper
   - Edge cases:
     - None
*/

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}