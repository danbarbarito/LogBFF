public import d2sqlite3;
import std.stdio;

struct LogBFFDatabase {
  Database db;

  void createTables() {
    this.db.execute("PRAGMA journal_mode = wal");
    this.db.execute(
      "CREATE TABLE IF NOT EXISTS log (id INTEGER PRIMARY KEY, date TEXT, message TEXT)"
    );
  }

  void printVersion() {
    auto results = this.db.execute("SELECT sqlite_version()");
    foreach (Row row; results) {
      writeln("SQLite version: ", row.peek!string(0));
    }
  }
}

LogBFFDatabase makeLogBFFDatabase() {
  LogBFFDatabase logBffDatabase;
  logBffDatabase.db = Database("logbff.db");
  logBffDatabase.createTables();
  return logBffDatabase;
}
