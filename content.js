let intervalID;
if (!intervalID) intervalID = setInterval(waitLoadPage, 1000);


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


