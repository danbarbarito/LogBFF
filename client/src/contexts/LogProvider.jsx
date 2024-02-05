import { createReconnectingWS } from "@solid-primitives/websocket";
import {
  createContext,
  createEffect,
  createSignal,
  onCleanup,
  useContext,
  on,
} from "solid-js";

const LogContext = createContext();

export function LogProvider(props) {
  const [received, setReceived] = createSignal(false);
  const [paused, setPaused] = createSignal(false);
  const [maxLogs, setMaxLogs] = createSignal(100);
  const [offsetLogs, setOffsetLogs] = createSignal(0);
  const [logs, setLogs] = createSignal(props.logs || []);
  const [logLevels, setLogLevels] = createSignal(
    new Set(["debug", "info", "warn", "error"])
  );
  const addLogs = (newLog) => {
    setLogs((prevLogs) => [...prevLogs, newLog]);
  };
  const logValue = {
    logs,
    addLogs,
    paused,
    setPaused,
    maxLogs,
    setMaxLogs,
    offsetLogs,
    setOffsetLogs,
    logLevels,
    setLogLevels,
    received,
    setReceived,
  };

  let sendLogRequestInterval;

  const socket = createReconnectingWS(`ws://${location.host}/logs`);

  const sendLogRequest = () => {
    const logRequest = {
      limit: maxLogs(),
      offset: offsetLogs(),
      levels: Array.from(logLevels()),
    };
    socket.send(JSON.stringify(logRequest));
  };

  socket.addEventListener("open", () => {
    sendLogRequest();
    sendLogRequestInterval = setInterval(() => {
      sendLogRequest();
    }, 1000);
  });

  socket.addEventListener("message", (event) => {
    setReceived(true);
    if (!paused()) {
      const logsArr = JSON.parse(event.data);
      setLogs(logsArr);
    }
  });

  createEffect(on([maxLogs, offsetLogs, logLevels], sendLogRequest));

  onCleanup(() => {
    clearInterval(sendLogRequestInterval);
    socket.close();
  });

  return (
    <LogContext.Provider value={logValue}>{props.children}</LogContext.Provider>
  );
}

export function useLog() {
  return useContext(LogContext);
}
