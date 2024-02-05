import { For } from "solid-js";
import { useLog } from "../contexts/LogProvider";
import styles from "./LogLevelSelector.module.css";
import logMessageStyles from "./LogMessage.module.css";

function LogLevelSelector(props) {
  const { logLevels, setLogLevels } = useLog();
  const levels = [
    {
      value: "debug",
      label: "Debug",
      activeClass: logMessageStyles.LogLevelDebug,
    },
    {
      value: "info",
      label: "Info",
      activeClass: logMessageStyles.LogLevelInfo,
    },
    {
      value: "warn",
      label: "Warn",
      activeClass: logMessageStyles.LogLevelWarning,
    },
    {
      value: "error",
      label: "Error",
      activeClass: logMessageStyles.LogLevelError,
    },
  ];
  return (
    <div class={styles.LogLevelSelector}>
      <label class={styles.LogLevelLabel}>Log Level</label>
      <For each={levels}>
        {(option) => (
          <button
            class={
              logLevels().has(option.value)
                ? `${styles.LogLevelButton} ${option.activeClass}`
                : styles.LogLevelButton
            }
            onClick={() => {
              const newSet = new Set(logLevels());
              if (!newSet.has(option.value)) {
                newSet.add(option.value);
              } else {
                newSet.delete(option.value);
              }
              setLogLevels(newSet);
            }}
          >
            {option.label}
          </button>
        )}
      </For>
    </div>
  );
}

export default LogLevelSelector;
