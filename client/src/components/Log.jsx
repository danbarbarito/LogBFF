import styles from "./Log.module.css";

function Log(props) {
  return <div class={styles.Log}>{props.log}</div>;
}

export default Log;
