
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

let a = false;
const observer = new MutationObserver(records => {

  console.log("Observe!!");

  chrome.storage.local.get(null).then((configData) => {

    if (Object.keys(configData).length === 0) firstSetup();

    console.log(`isActivate = ${configData["isActivate"]}`);

    const parentNode = document;
    const parent = parentNode.querySelectorAll(".fq2lkuj");
    const base1 = parent[0].querySelectorAll(".fkhz08q.f8hspre");
    const base2 = parent[0].querySelectorAll(".ffszj3z.f8hspre.f1icw8u");

    //並び替え
    if (base1.length > 0 && base2.length > 0) {
      console.log("InsertAdjacentHTML");
      parent[0].after(base1[0]);
      parent[0].after(base2[0]);
    }

    const darkingElements = parentNode.querySelectorAll(".f8hspre.f1makowq");
    const playStopButtons = parentNode.querySelectorAll(".f1aiijcp.fw80uk2");
    const loadButton = parentNode.querySelectorAll(".f1dd7ldt");
    const roadElements = parentNode.querySelectorAll(".f1la87wm");
    const titles = parentNode.querySelectorAll(".f3w9jrr.fcckh95");

    hideElements(parent);

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

var beforTarget = null;
const waitLoadPage = () => {
  //なんとなく中央の再生ボタンが配置されてればページ読み込めているといるだろうという希望的観測
  const target = document.querySelector(".dv-player-fullscreen");
  //console.log(target);
  if (target !== null && beforTarget !== target) {
    observer.disconnect();
    console.log("Start CustomUI");
    observer.observe(target, {
      childList: true,
      subtree: true
    });
    beforTarget = target;
    //clearInterval(intervalID);
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
