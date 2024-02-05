import styles from "./LogActions.module.css";

function LogActions({ paused, setPaused, maxLogs, setMaxLogs }) {
  return (
    <div class={styles.LogActions}>
      <button onClick={() => setPaused(!paused())}>
        {paused() ? "Resume" : "Pause"}
      </button>
      <div>
        <label for="limit">Limit:</label>
        <input
          name="limit"
          type="number"
          min={1}
          max={1000}
          value={maxLogs()}
          onChange={(e) => setMaxLogs(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
}

export default LogActions;
