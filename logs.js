document.addEventListener("DOMContentLoaded", function () {
  var term = new Terminal();
  term.open(document.getElementById("terminal"));
  term.write("initializing...\r\n");

  let fitAddon = new FitAddon.FitAddon();
  term.loadAddon(fitAddon);
  fitAddon.fit();

  window.onLog = (d) => {
    if (typeof d === "object") {
      term.write(JSON.stringify(d) + "\r\n");
    } else {
      term.write(d + "\r\n");
    }
  };
});
