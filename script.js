'use strict'
const btnsContainer = document.querySelector(".calc--btns")
const resultContainer = document.querySelector(".calc--input")

// Display (User Input: Step 2 of 2)
const results = resultContainer.querySelector("p");



// Saves (User Input: Step 1 of 2)
let input;

// Saves the value via input here if doing any of the following: Divison, Multiplication, Subtraction, Addition can compute itself and give a result right away, for percentage just do division by 100.
let num;

// Switches to storing the input in here afterwards if num has a value already stored inside. Doing any form of operation will first, store both num, and num2 into a total then total will become num and num2 will be ready to take another input. This can happen as many times as the user wishes.
let num2;

// Total is updated after computing it takes the input and the secondary number. If pressing anything to operate on top of it, then it will go into num and start the user at num2. If user presses a number after total is received then reset everything.
let total;

// For the results not to go outside the div if it gets too big
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