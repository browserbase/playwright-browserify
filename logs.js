console.log(window);

document.addEventListener("DOMContentLoaded", function () {
  window.onLog = (d) => {
    const logs = document.querySelector("#logs");
    if (logs) {
      const logItem = document.createElement("li");
      logItem.textContent = JSON.stringify(d);
      logs.appendChild(logItem);
    }
  };

  console.log("DOM fully loaded and parsed");
});
