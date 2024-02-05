# LogBFF 📜😀

Powerful log viewer packed into a single binary

---

Status: **Pre-Alpha**

(Not ready to be used)

---

LogBFF is an open-source tool for developers who are sick and tired of Ctrl+F-ing in their terminal or text editor to find the log line they are looking for. LogBFF brings the power of cloud-based log analysis tools such as Mezmo, Splunk, Kibana, etc. onto your device - distributed as a single binary file that can be installed anywhere and everywhere.

## Usage

LogBFF is designed to be as simple to use as possible. After [installing the CLI tool](#installing), you can either pipe your applications output into the tool, or tell it to read from a log file.

### Reading from stdin

```bash
# Piping data from your node application into LogBFF
npm run dev | logbff

```

### Reading from a file

```bash
logbff -f development.log
```

It's as simple as that! LogBFF will start up a web interface on port 8080, and display all of the logs it captures in real-time. Within the web interface, you can find, filter, and analyze your logs as you wish. No more Ctrl+F-ing. No more messy copy/pasting from the terminal. You'll wonder how you ever lived without it.


## Installing

*TODO: Write installation instructions :)*