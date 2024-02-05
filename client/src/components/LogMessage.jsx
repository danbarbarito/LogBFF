import { Show } from "solid-js";
import styles from "./LogMessage.module.css";

function LogMessage(props) {
  const logLevelClass =
    {
      info: styles.LogLevelInfo,
      warning: styles.LogLevelWarning,
      error: styles.LogLevelError,
    }[props.log.level] || styles.LogLevelInfo;
  return (
    <div class={`${styles.LogMessage} ${logLevelClass}`}>
      {props.log.message}
    </div>
  );
}

export default LogMessage;
