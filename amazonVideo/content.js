
const firstSetup = () => {
  {
    //ForFirstUp
    chrome.storage.local.set({
      ["isActivate"]: true,
    });
    chrome.storage.local.set({
      ["isPreventDarkening"]: true
    });
    chrome.storage.local.set({
      ["isHidePlaypauseButton"]: true
    });
    chrome.storage.local.set({
      ["isHideTitle"]: true
    });
  }
}


const hideElements = elements => {
  elements.forEach(element => {
    if (element.style) {
      element.style.opacity = 0;
      element.style.visibility = "hidden";
    //  element.style.display = "none";
    }
  });
}

const showElements = elements => {
  elements.forEach(element => {
    if (element.style) {
      element.style.opacity = 1;
      element.style.visibility = "visible";
  //    element.style.display = "block";
    }
  });
}

const observer = new MutationObserver(records => {

  console.log("Observe!!");

  chrome.storage.local.get(null).then((configData) => {

    if (Object.keys(configData).length === 0) firstSetup();

    console.log(`isActivate = ${configData["isActivate"]}`);

//    records.forEach(record => {
//      record.addedNodes.forEach(node => {
//        if (node.nodeType === Node.ELEMENT_NODE) {
          //const parentNode = node.parentElement;
          const parentNode = document;
          const darkingElements = parentNode.querySelectorAll(".f8hspre.f1makowq");
          const playStopButtons = parentNode.querySelectorAll(".f1aiijcp.fw80uk2");
          const loadButton = parentNode.querySelectorAll(".f1dd7ldt");
          const roadElements = parentNode.querySelectorAll(".f1la87wm");
          const titles = parentNode.querySelectorAll(".f3w9jrr.fcckh95");

          if (!configData["isActivate"]) {
            showElements(darkingElements);
            showElements(playStopButtons);
            showElements(roadElements);
            showElements(titles);
            return;
          }

          if (configData["isPreventDarkening"]) {
            hideElements(darkingElements);
          } else {
            showElements(darkingElements);
          }

          if (configData["isHidePlaypauseButton"]) {
            hideElements(playStopButtons);
            hideElements(roadElements);
            hideElements(loadButton);

          } else {
            showElements(playStopButtons);
            showElements(roadElements);
            showElements(loadButton);
          }

          if (configData["isHideTitle"]) {
            hideElements(titles);
          } else {
            showElements(titles);
          }
        });
    });
//    });
//  });
//});

const waitLoadPage = () => {
  console.log("Start CustomUI");
    //なんとなく中央の再生ボタンが配置されてればページ読み込めているといるだろうという希望的観測
  const terget = document.querySelector(".dv-player-fullscreen");
  console.log(terget);
  if (terget != null) {
    observer.observe(terget, {
      childList: true,
      subtree: true
    });
    clearInterval(intervalID);
  }
//  else {
//      // if now page is not amazon video 
//    numberOfRepetitions++;
//    if (numberOfRepetitions >= repetitionsLimit) {
//      console.log("ClearInterval");
//      clearInterval(intervalID);
//    }
//  }
}

let numberOfRepetitions = 0;
//const repetitionsLimit = 10000;
let intervalID;
if (!intervalID) intervalID = setInterval(waitLoadPage, 1000);
