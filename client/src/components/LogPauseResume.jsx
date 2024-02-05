import { useLog } from "../contexts/LogProvider";

function LogPauseResume(props) {
  const { paused, setPaused } = useLog();

  return (
    <button onClick={() => setPaused(!paused())}>
      {paused() ? "Resume" : "Pause"}
    </button>
  );
}

export default LogPauseResume;
