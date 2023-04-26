window.onload = () => {
  const sliderAboutActivate = document.querySelector("#switch");
  const sliderAboutPreventDarkening = document.querySelector("#switch2");
  //Check local storage data
  chrome.storage.local.get(null).then((configData) => {
    console.log(configData["isActivate"]);
    console.log(sliderAboutActivate.querySelector("input").checked);
    console.log(sliderAboutActivate.querySelector(".title").textContent);

    sliderAboutActivate.querySelector("input").checked =
      configData["isActivate"];
    sliderAboutActivate.querySelector(".title").textContent =
      sliderAboutActivate.querySelector("input").checked ? "ON" : "OFF";
      
    sliderAboutPreventDarkening.querySelector("input").checked =
      configData["isPreventDarkening"];
    // Main Process
    sliderAboutActivate
      .querySelector("input")
      .addEventListener("click", (event) => {
        const checkboxStatus = event.currentTarget.checked;
        console.log(checkboxStatus);
        sliderAboutActivate.querySelector(".title").textContent = checkboxStatus
          ? "ON"
          : "OFF";
        chrome.storage.local.set({ ["isActivate"]: checkboxStatus });
      });
    sliderAboutPreventDarkening
      .querySelector("input")
      .addEventListener("click", (event) => {
        const checkboxStatus = event.currentTarget.checked;
        console.log(checkboxStatus);
        chrome.storage.local.set({ ["isPreventDarkening"]: checkboxStatus });
      });
  });
};
