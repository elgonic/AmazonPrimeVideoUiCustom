
window.onload = () =>{
    const slider = document.querySelector("#switch");
    console.log("aaa")
    console.log(slider)
    slider.addEventListener("click" , event => {
        console.log(event.currentTarget.checked );
        document.querySelector(".title").textContent = "ON"
        chrome.storage.local.set({"aaa":event.currentTarget.checked}, () => {
            console.log("set!!")
        });
    })
}

