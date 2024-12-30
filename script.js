'use strict'
const btnsContainer = document.querySelector(".calc--btns")
const resultContainer = document.querySelector(".calc--input")
const results = resultContainer.querySelector("p");

// Total is updated after computing
let total;
let input;
let num;
let num2;
let sizeLimit;

function resizeResult() {
    const convertToRem = window.getComputedStyle(resultContainer).fontSize.split("px")[0] / 16
    const getResultContainerPadding = Number(window.getComputedStyle(resultContainer).padding.split("px")[0] * 2)
    const textSize = results.clientWidth + getResultContainerPadding
    let value = convertToRem
    if (value === 3) {
        console.log("Reached Size Limit");
        sizeLimit = true;
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

    thisBtn.addEventListener("click", function(el) {
        if (sizeLimit) return
        else
        if (num === undefined) {
            inputOne(el.target)
        }
        resizeResult();
    })
}

}

// When page loads
loadBtns();


// Should only run after computing
resizeResult();

function add(val, val2) {}

function subtract(val, val2) {}

function multiply(val, val2) {}

function divide(val, val2) {}

function inputOne(number) {
    if (number.classList.contains("color--topBtns")) {
        if (number.innerHTML.includes("AC")) {
            
            clear(1);
        }
    }
    if (number.classList.contains("color--numbers")) {
        if (input === undefined || input === "0") input = number.innerHTML
        else 
        input += number.innerHTML
    if (input === "0") input = "0"
    results.innerHTML = input
    clear(0)
    } else return
}



// Should double tap to clear all, one tap clears the 2nd number, if 2nd number undefined then clear all
function clear(reset) {
    if (reset === 1) {
    if (clear.num === undefined) {
        clear.num = 0;
    }
    clear.num += 1
    if (clear.num === 1) {
        console.log('Clear Once');
        results.innerHTML = "0"
        input = "0"
    } else if (clear.num === 2) {
        console.log('Wipe');
    }
} else {
    clear.num = 0
}
}

// Just take the current input and switch between negative or positive
function negPos() {}

// Should turn current input into a percentage. If user just presses equal after percentage then just give divide by 100
// Example: 300% = 3.00
function percentage() {}

// If total is defined then run operate
function operate(operator) {
    
}