import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import "highlight.js/styles/devibeans.min.css";
import styles from "./LogDetails.module.css";
import { onMount } from "solid-js";

hljs.registerLanguage("json", json);

function LogDetails(props) {
  let details;

  onMount(() => {
    hljs.highlightElement(details);
  });

  return (
    <div ref={details} class={styles.LogDetails}>
      {props.log.rawMessage}
    </div>
  );
}

export default LogDetails;
