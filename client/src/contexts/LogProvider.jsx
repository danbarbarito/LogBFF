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
  const [paused, setPaused] = createSignal(false);
  const [maxLogs, setMaxLogs] = createSignal(100);
  const [offsetLogs, setOffsetLogs] = createSignal(0);
  const [logs, setLogs] = createSignal(props.logs || []);
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
  };

  let sendLogRequestInterval;

  const socket = createReconnectingWS(`ws://${location.host}/logs`);

  const sendLogRequest = () => {
    const logRequest = { limit: maxLogs(), offset: offsetLogs() };
    socket.send(JSON.stringify(logRequest));
  };

  socket.addEventListener("open", () => {
    sendLogRequest();
    sendLogRequestInterval = setInterval(() => {
      sendLogRequest();
    }, 1000);
  });

  socket.addEventListener("message", (event) => {
    if (!paused()) {
      const logsArr = JSON.parse(event.data);
      setLogs(logsArr);
    }
  });

  createEffect(on([maxLogs, offsetLogs], sendLogRequest));

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
