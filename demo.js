setTimeout(async () => {
  console.log("Launching browser...");
  // Launch a browser instance
  // This only works with ws, not wss for now
  const playwright = window.playwright;
  const browser = await playwright.chromium.connectOverCDP(
    "ws://54.177.182.49:8080/devtools/browser/8073987a-6e50-4b13-b95b-e6e136eba7b3"
  );

  // Create a new page
  const page = await browser.newPage();

  // Navigate to Google.com
  await page.goto("https://www.google.com");

  //wait for 10 seconds
  await page.waitForTimeout(10000);

  console.log("success!");

  // Close the browser
  await browser.close();
}, 10000);
