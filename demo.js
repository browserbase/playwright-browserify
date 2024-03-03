setTimeout(async () => {
  console.log("Launching browser...");
  // Launch a browser instance
  // This only works with ws, not wss for now
  const playwright = window.playwright;
  const browser = await playwright.chromium.connectOverCDP(
    "YOUR_CHROMIUM_WS_ENDPOINT"
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
