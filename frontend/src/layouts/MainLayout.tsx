// filename: src/layouts/MainLayout.tsx

import { ReactNode } from "react";
import Navbar from "@/components/Nav";

/**
 * Main layout.
 *
 * Wraps all pages with shared UI (navbar, etc).
 */
type Props = {
  children: ReactNode;
};

function MainLayout({ children }: Props) {
  /**
   * Layout structure.
   */
  return (
    <div>
      <Navbar />

      <main style={{ padding: "20px" }}>
        {children}
      </main>
    </div>
  );
}

export default MainLayout;