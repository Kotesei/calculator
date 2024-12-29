'use strict'
const btnsContainer = document.querySelector(".calc--btns")
const resultContainer = document.querySelector(".calc--input")

function resizeResult() {
    const convertToRem = window.getComputedStyle(resultContainer).fontSize.split("px")[0] / 16
    const getResultContainerPadding = Number(window.getComputedStyle(resultContainer).padding.split("px")[0] * 2)
    const textSize = resultContainer.querySelector("p").clientWidth + getResultContainerPadding
    let value = convertToRem
    if (value === 3) {
        console.log("Reached Size Limit");
    } else {
        if (textSize > resultContainer.clientWidth) {
            value--
            resultContainer.style.fontSize = `${value}rem`
            resizeResult();
        }
    }

   
}

function loadBtns() {
    let thisBtn;
const btns = ["AC", "+/-", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="]
const color1 = ".0123456789"
const color2 = ["AC", "+/-", "%"]
const color3 = ["/", "*", "-", "+", "="]

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

resizeResult();