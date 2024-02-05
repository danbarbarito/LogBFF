import { For } from "solid-js";
import styles from "./LogContainer.module.css";
import Log from "./Log";

function LogContainer(props) {
  return (
    <div class={styles.LogContainer}>
      <For each={props.logs()}>{(log) => <Log log={log} />}</For>
    </div>
  );
}

export default LogContainer;
