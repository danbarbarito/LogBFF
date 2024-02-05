import std.json;
import std.datetime;
import std.stdio;
import std.format;

import db;

struct LogBFFLog {
  int id;
  string date;
  string rawMessage;
}

struct LogBFFLogRequest {
  int limit = 100;
  int offset = 0;
};

struct LogBFFLogManager {
  LogBFFDatabase logBffDatabase;

  void addLog(string log) {
    this.logBffDatabase.db.execute(
      "INSERT INTO log (date, message) VALUES (:date, :message)",
      Clock.currTime().toISOExtString(),
      log
    );
  }

  string logsJson(LogBFFLogRequest logRequest) {
    string[] logs;
    ResultRange results = this.logBffDatabase.db.execute(
      "SELECT id, date, message FROM log ORDER BY id DESC LIMIT :limit OFFSET :offset",
      logRequest.limit,
      logRequest.offset
    );
    foreach (Row row; results) {
      auto id = row["id"].as!int;
      auto date = row["date"].as!string;
      auto message = row["message"].as!string;
      logs ~= format("%s: %s", date, message);
    }
    JSONValue jj = logs;
    return jj.toString();
  }
}

LogBFFLogManager makeLogBFFLogManager(LogBFFDatabase logBffDatabase) {
  LogBFFLogManager logBffLogManager;
  logBffLogManager.logBffDatabase = logBffDatabase;
  return logBffLogManager;
}

LogBFFLogRequest jsonToLogBFFLogRequest(string json) {
  LogBFFLogRequest logRequest;
  try {
    JSONValue jv = parseJSON(json);

    try {
      logRequest.limit = jv["limit"].get!int;
    }
    catch (Exception e) {
    }

    try {
      logRequest.offset = jv["offset"].get!int;
    }
    catch (Exception e) {
    }
  }
  catch (Exception e) {
  }
  return logRequest;
}
