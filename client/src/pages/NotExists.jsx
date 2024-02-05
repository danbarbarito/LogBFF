import styles from "./NotExists.module.css";
import MainLayout from "../layouts/MainLayout";

function NotExists() {
  return (
    <MainLayout>
      <div class={styles.NotExists}>Page Does Not Exist</div>
    </MainLayout>
  );
}

export default NotExists;
