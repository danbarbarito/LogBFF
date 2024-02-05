import { Show } from "solid-js";
import styles from "./LogMessage.module.css";

function LogMessage(props) {
  return <div class={styles.LogMessage}>{props.log.message}</div>;
}

export default LogMessage;
