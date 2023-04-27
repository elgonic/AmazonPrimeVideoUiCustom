const main = () => {
  const terget = document.querySelector(".fkpovp9.f8hspre");
  const terget2 = document.querySelector(".f124tp54.fz8eask.f12x3de4");
  const terget3 = document.querySelector(".atvwebplayersdk-overlays-container");
  const terget4 = document.querySelector(
    ".atvwebplayersdk-fastseekback-button"
  );
  const terget5 = document.querySelector(".atvwebplayersdk-playpause-button");
  const terget6 = document.querySelector(
    ".atvwebplayersdk-fastseekforward-button"
  );
  const terget7 = document.querySelector(
    ".atvwebplayersdk-hideabletopbuttons-container"
  );
  const terget8 = document.querySelector(
    ".atvwebplayersdk-closebutton-wrapper"
  );
  //ぐるぐる
  const terget9 = document.querySelector(".f1la87wm");
  //再生ボタンとかスキップボタンとか
  const terget10 = document.querySelector(".f1aiijcp.fw80uk2");

  const gui = document.querySelector(".ffszj3z.f8hspre.f1icw8u");

  //これで暗くならない
  //addHideClass(terget);
  terget.style.opacity = 0;
  console.log("opacityで暗くなるの防ぐ");
  //ぐるぐるを消す
  if (terget9?.style) {
    console.log("消してるはず");
    terget9.style.opacity = 0;
  }
  //画面上部のタイトルが消える <= タイトル確認できず
  //addHideClass(terget2);
  //分からん
  // if (!terget3.classList.contains("f1sp4gm7")) {
  //   console.log("terget3 dont have f1sp4gm7");
  //   terget3.classList.add("f1sp4gm7");
  // }
  //addHideClass(terget4);
  //addHideClass(terget5);
  //addHideClass(terget6);
  //addHideClass(terget7);
  //addHideClass(terget8);
  // gui.style.cursor = "none";
  //parentVisibilityHidden(terget3)
  //parentVisibilityHidden(terget4);
};

const waitLoadPage = () => {
  //なんとなく中央の再生ボタンが配置されてればページ読み込めているといるだろうという希望的観測
  const terget = document.querySelector(".atvwebplayersdk-playpause-button");
  if (terget) {
    let successFlag = true;
    chrome.storage.local.get(null).then((configData) => {
      //For First set up
      if (Object.keys(configData).length === 0) return;
      console.log(`isActivate = ${configData["isActivate"]}`);
      if (!configData["isActivate"]) return;
      console.log(`isPreventDarkening = ${configData["isPreventDarkening"]}`);
      if (configData["isPreventDarkening"]) {
        const darkingElement = document.querySelector(".fkpovp9.f8hspre");
        console.log("PreventDarkening");
        if (darkingElement?.style) {
          darkingElement.style.opacity = 0;
        }else{
          sucsessFlag = false; 
        }
      }
      console.log(`isHidePlaypauseButton = ${configData["isHidePlaypauseButton"]}`);
      if (configData["isHidePlaypauseButton"]) {
        const playStopButton = document.querySelector(".f1aiijcp.fw80uk2");
        console.log("HidePlayStopButton");
        if (playStopButton?.style) {
          playStopButton.style.opacity = 0;
        }else {
          successFlag = false;
        }
        //スキップ時のぐるぐるを消す
        const roadElement = document.querySelector(".f1la87wm");
        console.log("HideRoadElement");
        if (roadElement?.style) {
          roadElement.style.opacity = 0;
        }else{
          successFlag = false;
        }
      }
      if(successFlag) clearInterval(intervalID);
    });
  }
};

//Hide class 付与はやめた
//const addHideClass = (element) => {
//  console.log("addHIdeclas");
//  if (!element) return;
//  console.log(`${element}HIDE!`);
//  if (element.classList.contains("hide")) return;
//  element.classList.add("hide");
//};

//発火しない
//console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
//window.addEventListener("DOMContentLoaded" , () => {
//console.log("DOMContentLoaded Fire!")
//const tmp = document.querySelector(".f1la87wm");
//if(tmp?.style?.opacity)  tmp.style.opacity= 0;
//})

//要素が読み込まれていないようで動かなかった
//window.onload  = () => {
//  console.log("Onload Fire!")
//  const tmp = document.querySelector(".f1la87wm");
//  console.log(tmp?.style)
//  if(tmp?.style) { tmp.style.opacity= 0;}else{console.log("donthittpppp")}
//}

let intervalID;
if (!intervalID) intervalID = setInterval(waitLoadPage, 1000);
