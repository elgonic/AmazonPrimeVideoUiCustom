
window.onload = () =>{
    const slider = document.querySelector("#switch");
    console.log("aaa")
    console.log(slider)
    slider.addEventListener("click" , event => {
        console.log(event);
        document.querySelector(".title").textContent = "ON"
    })
}

