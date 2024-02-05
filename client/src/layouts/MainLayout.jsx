import styles from "./MainLayout.module.css";
import NavBar from "../components/Navbar";

function MainLayout(props) {
  return (
    <div class={styles.MainLayout}>
      <NavBar />
      <main class={styles.MainLayoutChild}>{props.children}</main>
    </div>
  );
}

export default MainLayout;
