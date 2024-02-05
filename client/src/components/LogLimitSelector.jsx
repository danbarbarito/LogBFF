import { For } from "solid-js";
import { useLog } from "../contexts/LogProvider";
import styles from "./LogLimitSelector.module.css";

function LogLimitSelector(props) {
  const { maxLogs, setMaxLogs } = useLog();
  const options = [50, 100, 200, 500, 1000];
  return (
    <div class={styles.LogLimitSelector}>
      <label class={styles.LogLimitLabel}>Log Limit</label>
      <For each={options}>
        {(option) => (
          <button
            class={
              maxLogs() === option
                ? `${styles.LogLimitButton} ${styles.LogLimitActiveButton}`
                : styles.LogLimitButton
            }
            onClick={() => setMaxLogs(option)}
          >
            {option}
          </button>
        )}
      </For>
    </div>
  );
}

export default LogLimitSelector;
