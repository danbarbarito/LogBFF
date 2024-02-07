import vibe.vibe;
import std.stdio;
import std.datetime;

import configuration;
import db;
import log_manager;

struct LogBFFWorker {
  private LogBFFConfiguration logBffConfiguration;
  private LogBFFDatabase logBffDatabase;
  private LogBFFLogManager logBffLogManager;
  private Duration workerInterval = 5.seconds;
  private Duration maxWorkerTime = 2.seconds;

  void startWorker() {
    logInfo("LogBFF worker started...");
    this.logBffDatabase.printVersion();

    string line;
    runEventLoop();
    // while ((line = stdin.readln()) !is null) {
    //   try {
    //     if (!this.logBffConfiguration.quiet) {
    //       writeln(line);
    //     }
    //     this.logBffLogManager.addLog(line);
    //   }

    //   catch (Exception e) {
    //     logError("LogBFF worker failed: " ~ e.msg);
    //   }
    // }
  }
}

LogBFFWorker makeLogBFFWorker(LogBFFLogManager logBffLogManager, LogBFFConfiguration logBffConfiguration) {
  LogBFFWorker logBFFWorker;
  logBFFWorker.logBffDatabase = logBffLogManager.logBffDatabase;
  logBFFWorker.logBffLogManager = logBffLogManager;
  logBFFWorker.logBffConfiguration = logBffConfiguration;
  return logBFFWorker;
}
