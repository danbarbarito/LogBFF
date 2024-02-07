import std.concurrency;
import std.getopt;
import std.stdio;

import vibe.vibe;
import d2sqlite3;

import configuration;
import router;
import worker;
import db;
import log_manager;

void startWorker(Tid parentTid, LogBFFConfiguration logBFFConfiguration) {
  LogBFFDatabase logBffDatabase = makeLogBFFDatabase();
  LogBFFLogManager logBFFLogManager = makeLogBFFLogManager(logBffDatabase);

  LogBFFWorker logBFFWorker = makeLogBFFWorker(logBFFLogManager, logBFFConfiguration);
  logBFFWorker.startWorker();

  scope (exit) {
    logBffDatabase.db.close();
  }
}

void startServer() {
  auto settings = new HTTPServerSettings;
  settings.port = 8080;
  settings.bindAddresses = ["::1", "127.0.0.1"];

  LogBFFDatabase logBffDatabase = makeLogBFFDatabase();
  LogBFFLogManager logBFFLogManager = makeLogBFFLogManager(logBffDatabase);
  LogBFFRouter logBFFRouter = makeLogBFFRouter(logBFFLogManager);
  auto listener = listenHTTP(settings, logBFFRouter.router);

  logInfo("LogBFF is listening on http://127.0.0.1:8080/");

  scope (exit) {
    listener.stopListening();
    logBffDatabase.db.close();
  }

  runEventLoop();

  listener.stopListening();
}

void main(string[] args) {
  try {
    LogBFFConfiguration logBFFConfiguration;
    auto helpInformation = getopt(
      args,
      "quiet", "Silence log output", &logBFFConfiguration.quiet
    );

    if (helpInformation.helpWanted) {
      defaultGetoptPrinter("logbff - simple log analysis.",
        helpInformation.options);
    }
    else {
      auto threadId = spawn(&startWorker, thisTid, logBFFConfiguration);
      startServer();
    }
  }
  catch (GetOptException e) {
    stderr.writeln(e.msg);
  }
}
