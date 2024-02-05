import { Show } from "solid-js";
import styles from "./Log.module.css";
import LogMessage from "./LogMessage";
import LogDetails from "./LogDetails";

function Log(props) {
  return (
    <div class={styles.Log}>
      <Show when={!props.log.isJsonMessage}>
        <LogMessage log={props.log} />
      </Show>
      <Show when={props.log.isJsonMessage}>
        <LogMessage log={props.log} /> <LogDetails log={props.log} />
      </Show>
    </div>
  );
}

export default Log;
