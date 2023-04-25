
window.onload = () =>{
    const slider = document.querySelector("#switch");
    const  configData = chrome.storage.local.get(["isActivate"]);
    
    slider.addEventListener("click" , event => {
        console.log(event.currentTarget.checked );
        document.querySelector(".title").textContent = slider.checked ? "ON" : "OFF";
        chrome.storage.local.set({["isActivate"]:event.currentTarget.checked}, () => {
            console.log("set!!")
        });
    })
}

