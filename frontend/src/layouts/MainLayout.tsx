// filename: src/layouts/MainLayout/MainLayout.tsx

import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";

/**
 * Main layout.
 *
 * Wraps all pages with shared UI.
 */
function MainLayout() {
  return (
    <div className={styles.wrapper}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.inner}>
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;