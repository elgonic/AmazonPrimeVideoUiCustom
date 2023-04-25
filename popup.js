window.onload = () => {
  const sliderAboutActivate = document.querySelector("#switch");
  const sliderAboutPreventDarkening = document.querySelector("#switch2");
  //Check local storage data 
  chrome.storage.local.get(null).then((configData) => {
    console.dir(configData)
    console.log(configData["isActivate"]);
    sliderAboutActivate.checked = configData["isActivate"];
    document.querySelector(".title").textContent = sliderAboutActivate.checked
      ? "ON"
      : "OFF";
    // Main Process
    sliderAboutActivate.addEventListener("click", (event) => {
      const checkboxStatus = event.currentTarget.checked;
      console.log(checkboxStatus)
      document.querySelector(".title").textContent = checkboxStatus
        ? "ON"
        : "OFF";
      chrome.storage.local.set({ ["isActivate"]:checkboxStatus});
    });
  });
};

