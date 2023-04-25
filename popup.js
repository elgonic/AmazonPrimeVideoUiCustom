window.onload = () => {
  const slider = document.querySelector("#switch");
  //Check local storage data 
  chrome.storage.local.get(["isActivate"]).then((configData) => {
    console.log(configData["isActivate"]);
    slider.checked = configData["isActivate"];
    document.querySelector(".title").textContent = slider.checked
      ? "ON"
      : "OFF";
    // Main Process
    slider.addEventListener("click", (event) => {
      document.querySelector(".title").textContent = slider.checked
        ? "ON"
        : "OFF";
      chrome.storage.local.set({ ["isActivate"]: event.currentTarget.checked });
    });
  });
};

