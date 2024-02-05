import styles from "./Navbar.module.css";
import { A } from "@solidjs/router";

function NavBar() {
  return (
    <nav className={styles.Navbar}>
      <div className={styles.Logo}>
        <A end href="/">
          LogBFF 📜😀
        </A>
      </div>
      <ul className={styles.NavList}>
        <li className={styles.NavItem}>
          <A end href="/">
            View
          </A>
        </li>
        <li className={styles.NavItem}>
          <A end href="/settings">
            Settings
          </A>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
