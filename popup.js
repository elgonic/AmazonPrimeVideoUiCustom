window.onload = () => {
  const sliderAboutActivate = document.querySelector("#switch");
  const sliderAboutPreventDarkening = document.querySelector("#switch2");
  const sliderAboutHidePlayButton = document.querySelector("#switch3");
  //Check local storage data
  chrome.storage.local.get(null).then((configData) => {

    console.log(Object.keys(configData));
    console.log(configData["isActivate"]);
    console.log(sliderAboutActivate.querySelector("input").checked);
    console.log(sliderAboutActivate.querySelector("span").textContent);

    //ほんとの最初
    if (!Object.keys(configData).length) {
      chrome.storage.local.set({ ["isActivate"]: sliderAboutActivate.querySelector("input").checked});
      chrome.storage.local.set({ ["isPreventDarkening"]: sliderAboutPreventDarkening.querySelector("input").checked });
      chrome.storage.local.set({ ["isHidePlaypauseButton"]: sliderAboutHidePlayButton.querySelector("input").checked });
    } else {
      sliderAboutActivate.querySelector("input").checked =
        configData["isActivate"];
      sliderAboutActivate.querySelector("span").textContent =
        sliderAboutActivate.querySelector("input").checked ? "ON" : "OFF";

      sliderAboutPreventDarkening.querySelector("input").checked =
        configData["isPreventDarkening"];
      sliderAboutHidePlayButton.querySelector("input").checked =
        configData["isHidePlaypauseButton"];
    };




    //UI 初期設定
    controlCheckBoxes(sliderAboutActivate.querySelector("input").checked);


    // Main Process
    sliderAboutActivate
      .querySelector("input")
      .addEventListener("click", (event) => {
        const checkboxStatus = event.currentTarget.checked;
        console.log(checkboxStatus);
        sliderAboutActivate.querySelector("span").textContent = checkboxStatus
          ? "ON"
          : "OFF";
        chrome.storage.local.set({ ["isActivate"]: checkboxStatus });
        //UI処理
        controlCheckBoxes(checkboxStatus);
      });
    sliderAboutPreventDarkening
      .querySelector("input")
      .addEventListener("click", (event) => {
        const checkboxStatus = event.currentTarget.checked;
        console.log(checkboxStatus);
        chrome.storage.local.set({ ["isPreventDarkening"]: checkboxStatus });
      });
    sliderAboutHidePlayButton
      .querySelector("input")
      .addEventListener("click", (event) => {
        const checkboxStatus = event.currentTarget.checked;
        console.log(checkboxStatus);
        chrome.storage.local.set({ ["isHidePlaypauseButton"]: checkboxStatus });
      });
  });
};

const controlCheckBoxes = (masterCheckboxStatus) => {
  const checkBoxes = document.querySelectorAll(".switch_label")
  let i = 0;
  checkBoxes.forEach(checkBox => {
    if (i === 0) {
      i++;
      return;
    }
    console.log({ masterCheckboxStatus })
    if (masterCheckboxStatus) {
      checkBox.querySelector(".circle").classList.remove("circle-disActivate");
      checkBox.querySelector(".base").classList.remove("base-disActivate");
    } else {
      checkBox.querySelector(".circle").classList.add("circle-disActivate");
      checkBox.querySelector(".base").classList.add("base-disActivate");

    }
  })
}