// filename: src/layouts/MainLayout/MainLayout.tsx

import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "./MainLayout.module.css";

export default function MainLayout() {
  return (
    <div className={styles.wrapper}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.inner}>
          <Suspense
            fallback={<p className={styles.loading}>Loading page...</p>}
          >
            <Outlet />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
