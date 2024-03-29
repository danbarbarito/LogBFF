import { createResource, useContext } from "solid-js";
import styles from "./Home.module.css";
import Loading from "../components/Loading";
import LogContainer from "../components/LogContainer";
import { useLog } from "../contexts/LogProvider";
import MainLayout from "../layouts/MainLayout";
import LogActions from "../components/LogActions";

function Home() {
  const { logs, received } = useLog();
  return (
    <MainLayout>
      <div class={styles.Home}>
        <LogActions />
        {!received() ? (
          <div class={styles.FullscreenLoading}>
            <Loading />
          </div>
        ) : (
          <LogContainer logs={logs} />
        )}
      </div>
    </MainLayout>
  );
}

export default Home;
