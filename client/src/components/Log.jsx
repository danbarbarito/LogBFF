import { Show } from "solid-js";
import styles from "./Log.module.css";
import LogMessage from "./LogMessage";

function Log(props) {
  return (
    <div class={styles.Log}>
      <Show when={!props.log.isJsonMessage}>
        <LogMessage log={props.log} />
      </Show>
      <Show when={props.log.isJsonMessage}>
        <LogMessage log={props.log} /> {props.log.rawMessage}
      </Show>
    </div>
  );
}

export default Log;
