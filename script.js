'use strict'
const btnsContainer = document.querySelector(".calc--btns")

function loadBtns() {
    let thisBtn;
const btns = ["AC", "+/-", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="]
const color1 = ".0123456789"
const color2 = ["AC", "+/-", "%"]
const color3 = ["/", "*", "-", "+", "="]
console.log(btns.length);

for (let btn = 0; btn < btns.length; btn++) {
    btnsContainer.insertAdjacentHTML("beforeend", `<button class="btn">${btns[btn]}</button>`)    
    thisBtn = document.querySelectorAll(".btn")[btn]
    if (thisBtn.innerHTML === "0") {
        thisBtn.style.flex = "1"
    }
    if (color1.includes(thisBtn.innerHTML)) {
        thisBtn.classList.add("color--numbers")
    }
    if (color2.includes(thisBtn.innerHTML)) {
        thisBtn.classList.add("color--topBtns")
    }
    if (color3.includes(thisBtn.innerHTML)) {
        thisBtn.classList.add("color--operators")
    }
}

}

loadBtns();