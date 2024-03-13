const originalConsole = console;

// There is much more API here but let's handle just the log method for now
window.console = {
  ...console,
  log: (d) => {
    if (window.onLog) {
      window.onLog(d);
    }
    originalConsole.log(d);
  },
  debug: (d) => {
    if (window.onLog) {
      window.onLog(d);
    }
    originalConsole.debug(d);
  },
};
document.addEventListener("DOMContentLoaded", function () {
  var term = new Terminal();
  term.open(document.getElementById("terminal"));
  term.write("initializing...\r\n");

  let fitAddon = new FitAddon.FitAddon();
  term.loadAddon(fitAddon);
  fitAddon.fit();

  window.onLog = (data) => {
    if (typeof data === "object") {
      term.write(`${JSON.stringify(d)}\r\n`);
    } else {
      term.write(`${data}\r\n`);
    }
  };
});
