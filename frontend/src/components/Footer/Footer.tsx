// filename: src/layouts/Footer/Footer.tsx

import styles from "./Footer.module.css";

/**
 * Footer component.
 *
 * Displays application info and copyright.
 */
function Footer() {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.text}>
          Copyright © {new Date().getFullYear()} Mogges Nutrition Bar App. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;