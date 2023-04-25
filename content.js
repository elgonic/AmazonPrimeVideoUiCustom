
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

  const gui = document.querySelector(".ffszj3z.f8hspre.f1icw8u");

  //これで暗くならない
  addHideClass(terget);
  //ぐるぐるを消す
  terget9.style.opacity = 0;
  //画面上部のタイトルが消える
  //addHideClass(terget2);
  //分からん
  //if (!terget3.classList.contains("f1sp4gm7")) {
  //  console.log("terget3 dont have f1sp4gm7");
  //  terget3.classList.add("f1sp4gm7");
  //}
  //addHideClass(terget4);

  // addHideClass(terget5);
  // addHideClass(terget6);
  // addHideClass(terget7);
  // addHideClass(terget8);
  // gui.style.cursor = "none";
  //parentVisibilityHidden(terget3)
  //parentVisibilityHidden(terget4);
};

const waitLoadPage = () => {
  const terget = document.querySelector(".atvwebplayersdk-closebutton-wrapper");
  if (terget) {
    chrome.storage.local.get(["isActivate"],(value) => {
      console.log("aaaaaaaaaaaaaaaaaaaaaa"+value);
    })
    console.log("terget Hit!!");
    clearInterval();
    setInterval(main, 100);
  }
};

const addHideClass = (element) => {
  if (!element) return;
  if (element.classList.contains("hide")) return;
  element.classList.add("hide");
};

const parent = (element) => {
  console.log("parentElement");
  //element.parentElement.style.visibility = "hidden";
  //element.parentElement.style.display = "none";
  element.parentElement.style.opacity = 0;
};
setInterval(waitLoadPage, 1000);
