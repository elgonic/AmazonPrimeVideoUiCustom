
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

//dv-web-player と dv-web-player-2 の二つの親要素があり、それぞれに .fkpovp9.f8hspre のクラスが存在するので queryselecterAll で両方とって両方消す
const customizePage = () => {
  console.log("Start CustomUI");
  //なんとなく中央の再生ボタンが配置されてればページ読み込めているといるだろうという希望的観測
  const terget = document.querySelector(".atvwebplayersdk-playpause-button");
  if (terget) {
    chrome.storage.local.get(null).then((configData) => {
      //For First set up
      if (Object.keys(configData).length === 0) firstSetup();
      console.log(`isActivate = ${configData["isActivate"]}`);



      //使用する要素検索
      //serch darkingElement
      const darkingElements = document.querySelectorAll(".fkpovp9.f8hspre");
      //serch PlaypauseButton
      const playStopButtons = document.querySelectorAll(".f1aiijcp.fw80uk2");
      //serch skip時のぐるぐる
      const roadElements = document.querySelectorAll(".f1la87wm");
      const titles = document.querySelectorAll(".f3w9jrr.fcckh95");

      //拡張機能の有効 or 無効
      if (!configData["isActivate"]) {
        showElements(darkingElements);
        showElements(playStopButtons);
        showElements(roadElements);
        showElements(titles);
        return;
      }

      //画面暗くなる関係の処理
      console.log(`isPreventDarkening = ${configData["isPreventDarkening"]}`);
      if (configData["isPreventDarkening"]) {
        console.log("PreventDarkenings");
        hideElements(darkingElements);
      } else {
        console.log("Show Darkenings");
        showElements(darkingElements);
      }

      //再生ボタンとかの処理
      console.log(
        `isHidePlaypauseButton = ${configData["isHidePlaypauseButton"]}`
      );
      if (configData["isHidePlaypauseButton"]) {
        console.log("HidePlayStopButtons");
        hideElements(playStopButtons);
        console.log("HideRoadElement");
        hideElements(roadElements);
      } else {
        console.log("ShowPlayStopButtons");
        showElements(playStopButtons);
        console.log("ShowRoadElement");
        showElements(roadElements);

      }

      //タイトル関係の処理
      console.log(`isHideTitle = ${configData["isHideTitle"]}`);
      if (configData["isHideTitle"]) {
        console.log("HideTitles");
        hideElements(titles);
      } else {
        console.log("ShowTitles");
        showElements(titles);
      }
    });
  } else {
    // if now page is not amazon video 
    numberOfRepetitions++;
    if (numberOfRepetitions >= repetitionsLimit) {
      console.log("ClearInterval");
      clearInterval(intervalID);
    }
  }
};

const hideElements = elements => {
  elements.forEach(element => {
    if (element.style) {
      element.style.opacity = 0;
    }
  })
}

const showElements = elements => {
  elements.forEach(element => {
    if (element.style) {
      element.style.opacity = 1;
    }
  })
}

let numberOfRepetitions = 0;
const repetitionsLimit = 5;
let intervalID;
if (!intervalID) intervalID = setInterval(customizePage, 1000);

