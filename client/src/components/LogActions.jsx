import { useLog } from "../contexts/LogProvider";
import styles from "./LogActions.module.css";
import LogLevelSelector from "./LogLevelSelector";
import LogLimitSelector from "./LogLimitSelector";
import LogPauseResume from "./LogPauseResume";

function LogActions(props) {
  const { maxLogs, setMaxLogs } = useLog();

  return (
    <div class={styles.LogActions}>
      <LogPauseResume />
      <LogLimitSelector />
      <LogLevelSelector />
    </div>
  );
}

export default LogActions;
