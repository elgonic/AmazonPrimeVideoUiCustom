
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
    hideElement(element);
  });
}
const hideElement = element => {
    if (element.style) {
      element.style.opacity = 0;
      element.style.visibility = "hidden";
  }
}
const showElements = elements => {
  elements.forEach(element => {
    showElement(element);
  });
}
const showElement = element => {
    if (element.style) {
      element.style.opacity = 1;
      element.style.visibility = "visible";
    }
}



let a = false;
const observer = new MutationObserver(records => {

  console.log("Observe!!");

  chrome.storage.local.get(null).then((configData) => {

    if (Object.keys(configData).length === 0) firstSetup();

    console.log(`isActivate = ${configData["isActivate"]}`);

    const baseNode1 = document.getElementById("dv-web-player");
    if(baseNode1){
      HideProcess( configData , baseNode1)
    }

    const baseNode2 = document.getElementById("dv-web-player-2");
    if(baseNode2){
      HideProcess( configData , baseNode2)
    }

  });
});

const HideProcess = (configData, base) => {
  const parent = base?.querySelector(".fq2lkuj");
  const base1 = parent?.querySelector(".fkhz08q.f8hspre");
  const base2 = parent?.querySelector(".ffszj3z.f8hspre.f1icw8u");



  //翻訳設定のときだけ
  const transraterSetting = parent?.querySelector(".fzvxfsy");
  if (transraterSetting) {
    //すでに下の位置位いるなら不要(初期位置に戻ってるはず)
    console.log("transraterSetting");
    const check1 = parent?.querySelector(".fkhz08q.f8hspre");
    const check2 = parent?.querySelector(".ffszj3z.f8hspre.f1icw8u");
    if (!(check1 && check2)) {
      const aaa = parent?.parentNode?.querySelector(".fkhz08q.f8hspre");
      const bbb = parent?.parentNode?.querySelector(".ffszj3z.f8hspre.f1icw8u");
      if (aaa && bbb) {
        transraterSetting.before(bbb);
        transraterSetting.before(aaa);
        showElement(parent)
      }
    }
  } else {
    //並び替え
    if (base1) {
      parent.after(base1);
    }
    if (base2) {
      parent.after(base2);
    }
    hideElement(parent);
  }

  //字幕位置と透過防止
  const transraterText = parent?.parentNode?.querySelector(".fkhz08q.f8hspre")?.querySelector(".f35bt6a");
  const transraterTextOpacity = transraterText?.querySelector(".atvwebplayersdk-captions-overlay");
  const transraterTextPos = transraterText?.querySelector(".f1hy437");

  if (transraterTextOpacity && transraterTextOpacity.style) {
    console.log(transraterTextOpacity);
    transraterTextOpacity.style.opacity = 1;
  }

    console.log(transraterTextPos);
  if (transraterTextPos && transraterTextOpacity) {
      transraterTextPos?.style.setProperty("height" , `99vh`);
      transraterTextPos?.style.setProperty("margin-top" , `0vw`);
  }else{
      if(transraterTextOpacity) transraterTextOpacity.style.setProperty("height" , `0%`);
      if(transraterTextOpacity) transraterTextOpacity.style.setProperty("margin-top" , `99vh`);
    }

  const darkingElements = base.querySelectorAll(".f8hspre.f1makowq");
  const playStopButtons = base.querySelectorAll(".f1aiijcp.fw80uk2");
  const loadButton = base.querySelectorAll(".f1dd7ldt");
  const roadElements = base.querySelectorAll(".f1la87wm");
  const titles = base.querySelectorAll(".f3w9jrr.fcckh95");


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
}

var beforeTarget = null;
const waitLoadPage = () => {
  //なんとなく中央の再生ボタンが配置されてればページ読み込めているといるだろうという希望的観測
  const target = document.querySelector(".dv-player-fullscreen");
  //console.log(target);
  if (target !== null && beforeTarget !== target) {
    observer.disconnect();
    console.log("Start CustomUI");
    observer.observe(target, {
      childList: true,
      subtree: true
    });
    beforeTarget = target;
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
