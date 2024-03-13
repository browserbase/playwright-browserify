// Import the playwright package
process.versions = { node: "14.17.0" };
process.env.PLAYWRIGHT_BROWSERS_PATH = "/browsers";
process.hrtime = (previousTimestamp) => {
  // High resolution time mock. Returns time in [seconds, nanoseconds].
  // This is a simple version that does not provide high-resolution time.
  // For actual benchmarking, a more accurate timer should be used.
  const mockTime = [0, 1e7]; // Mock time, e.g., 0 seconds and 10 milliseconds.
  if (previousTimestamp) {
    // If previousTimestamp is provided, return the difference.
    return [
      mockTime[0] - previousTimestamp[0],
      mockTime[1] - previousTimestamp[1],
    ];
  }
  return mockTime;
};

const playwright = require("playwright-core");
const originalConsole = console;
window.console = {
  ...console,
  log: (d) => {
    if (window.onLog) {
      window.onLog(d);
    }
    originalConsole.log(d);
  },
};

window.playwright = playwright;
