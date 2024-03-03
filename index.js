// Import the playwright package
console.log(process);
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

(async () => {
  // Launch a browser instance
  // This only works with ws, not wss for now
  const browser = await playwright.chromium.connectOverCDP(
    "ws://54.177.182.49:8080/devtools/browser/8073987a-6e50-4b13-b95b-e6e136eba7b3"
  );

  // Create a new page
  const page = await browser.newPage();

  // Navigate to Google.com
  await page.goto("https://www.google.com");

  console.log("success!");

  // Close the browser
  await browser.close();
})();
