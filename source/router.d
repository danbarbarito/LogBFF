import std.file;
import std.algorithm;
import std.stdio;
import std.json;
import vibe.vibe;

import assets;
import log_manager;

struct LogBFFRouter {
  private LogBFFLogManager logManager;

  URLRouter router;

  // Callback functions
  private void callbackJavascriptAsset(HTTPServerRequest req, HTTPServerResponse res) {
    res.headers["Content-Type"] = "application/javascript";

    debug {
      // Iterate over all *.js files in client assets directory
      string logBffJsFileContents;
      auto dFiles = dirEntries("client/dist/assets", SpanMode.depth).filter!(
        f => f.name.endsWith(".js"));
      foreach (d; dFiles)
        logBffJsFileContents = readText(d.name);
      res.writeBody(logBffJsFileContents);
    }
    else {
      res.writeBody(logbffJs);
    }
  }

  private void callbackLogsWs(scope WebSocket sock) {
    while (sock.connected) {
      auto msg = sock.receiveText();
      LogBFFLogRequest logRequest = jsonToLogBFFLogRequest(msg);
      auto resp = this.logManager.logsJson(logRequest);
      sock.send(resp);
    }
  }

  private void callbackPage(HTTPServerRequest req, HTTPServerResponse res) {
    res.render!("main.dt", req);
  }
}

LogBFFRouter makeLogBFFRouter(LogBFFLogManager logManager) {
  LogBFFRouter logBffRouter;

  logBffRouter.logManager = logManager;
  logBffRouter.router = new URLRouter;
  logBffRouter.router.get("/logbff.js", &logBffRouter.callbackJavascriptAsset);
  logBffRouter.router.get("/logs", handleWebSockets(&logBffRouter.callbackLogsWs));
  logBffRouter.router.get("*", &logBffRouter.callbackPage);
  return logBffRouter;
}
