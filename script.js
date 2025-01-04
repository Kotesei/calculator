'use strict'
const btnsContainer = document.querySelector(".calc--btns")
const resultContainer = document.querySelector(".calc--input")

// Display (User Input: Step 2 of 2)
const results = resultContainer.querySelector("p");


const originalfontSize = Number(window.getComputedStyle(results).fontSize.split("px")[0] / 16)
// Saves (User Input: Step 1 of 2)
let input;

let isNegative;

// Stores the first value
let num;

// Saves the last operator except equal
let lastUsedOperator;

// Stores the second value
let num2;
let storeNum2

// After num, lastUsedOperator, and num2 have values run the functions and store it in total
let total;

let isInputting;

// Enable this after pressing equal 
let operationDone;

// Specifically for the equal sign repeats the last action
let isRepeating;

// Specifically for every other operator, takes total and turns it to num instead
let isContinuing

// For the results not to go outside the div if it gets too big
let sizeLimit;




function resizeResult(isReset) {
    const getContainerWidth = Number(window.getComputedStyle(resultContainer).width.split("px")[0])
    const getContainerPadding = Number(window.getComputedStyle(resultContainer).padding.split("px")[0] * 2)
    const getTextWidth = Number(window.getComputedStyle(results).width.split("px")[0])
    const getTextFontSize = Number(window.getComputedStyle(results).fontSize.split("px")[0] / 16)

    let fontSize;
    
    if (isReset) {
        fontSize = originalfontSize
        results.style.fontSize = `${fontSize}rem`
        isReset = false
    }

    
    if (fontSize === undefined) fontSize = getTextFontSize;

    if (fontSize === 3) {
        console.log("Reached Size Limit");
        sizeLimit = true;
    }
    

    if (getTextWidth + getContainerPadding > getContainerWidth) {
        fontSize--
        results.style.fontSize = `${fontSize}rem`
        resizeResult();
    }


}

function loadBtns() {
    let thisBtn;
const btns = ["AC", "+/-", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="]
const numerics = ".0123456789"
const utility = ["AC", "+/-", "%"]
const operations = ["/", "*", "-", "+", "="]

for (let btn = 0; btn < btns.length; btn++) {
    btnsContainer.insertAdjacentHTML("beforeend", `<button class="btn">${btns[btn]}</button>`)    
    thisBtn = document.querySelectorAll(".btn")[btn]
    if (thisBtn.innerHTML === "0") {
        thisBtn.style.flex = "1"
    }

    // Move all the event listeners inside here instead maybe a helper function? 
    if (numerics.includes(thisBtn.innerHTML)) {
        thisBtn.classList.add("color--numerics")
    }
    if (utility.includes(thisBtn.innerHTML)) {
        thisBtn.classList.add("color--utility")
    }
    if (operations.includes(thisBtn.innerHTML)) {
        thisBtn.classList.add("color--operators")

    }

    thisBtn.addEventListener("click", function(el) {
        
        // This button is for the clearing
            if (el.target.innerHTML.includes("AC")) {
                // Clear set to true (and if pressed again then wipes this is why we use a number rather than true / false)
                clear(1);
            }
            if (el.target.innerHTML.includes("+/-")) turnToNegative();
        
        // Checks if button pressed is a numeric one and if the sizeLimit hasn't been reached.
        if (el.target.classList.contains("color--numerics") && !sizeLimit) {
            clear(0)
            operationDone = false;
            isInputting = true;
            if (input === undefined || input === "0") input = el.target.innerHTML
            else
            input += el.target.innerHTML
        results.innerHTML = input
    }
    
    // Sets the operator to use
    if (el.target.classList.contains("color--operators")) {
        isInputting = false;
            clear(0)      
            // Second input
            if (num !== undefined) {
                operate(el.target.innerHTML, true);
            } else {
                // First input
                operate(el.target.innerHTML);
            }
        }

        resizeResult();
    })
}

}


// Fix this code up


// Saves the last operator except equal
// let lastUsedOperator;

// Enable this after pressing equal 
// let operationDone;

// Specifically for the equal sign repeats the last action
// let isRepeating;

// Specifically for every other operator, takes total and turns it to num instead
// let isContinuing

// Enable this after pressing equal 
// operationDone = true;
// If true then repeat operation based off of lastUsedOperator 

function operate(operator) {
    if (!num) num = input
    if (num) num2 = input
if (operator === "=") {
    if (!num) total = 0
    // If operationDone then repeat last one
    if (operationDone) {
        getTotal("Repeat")
    } else {
        getTotal();
        isContinuing = false;
    }
    operationDone = true;
    updateScreen()
}
if (operator !== "=") {
    // If operationDone then turn num into total and getTotal
    if (operationDone) {
        console.log("Continue after pressing equal");
        operationDone = false
    }
    if (isContinuing) {
        console.log(num, num2, total);
        getTotal("Continue", operator)
        console.log(num, num2, total);
        
        operationDone = false
    }
    lastUsedOperator = operator
    updateScreen()
    isContinuing = true;
}

}

function updateScreen() {
    if (isContinuing) input = total
    if (operationDone) input = total
    if (!total) input = "0"
    results.innerHTML = input
    input = "0"
    }



function getTotal(isDuring, operator) {
    console.log(num, num2, total);
    if (isDuring === "Repeat") {
        console.log("Repeat Operation!");
        num = total
        switch (lastUsedOperator) {
            case "+":
                total = add(total, storeNum2)
                break;
            case "-":
                total = subtract(total, storeNum2)
                break;
            case "*":
                total = multiply(total, storeNum2)
                break;
            case "/":
                total = divide(total, storeNum2)
                break;
            }
    } else if (!isDuring){
        console.log("Results!");
        storeNum2 = num2
        num2 = input
        if (!lastUsedOperator) total = input
        switch (lastUsedOperator) {
            case "+":
                total = add(num, num2)
                break;
            case "-":
                total = subtract(num, num2)
                break;
            case "*":
                total = multiply(num, num2)
                break;
            case "/":
                total = divide(num, num2)
                break;
        }
        
    } else if (isDuring === "Continue") {
        console.log("Continue Operation!");
        console.log(lastUsedOperator, operator);
        switch (lastUsedOperator) {
                case "+":
                    total = add(num, num2)
                    break;
                case "-":
                    total = subtract(num, num2)
                    break;
                case "*":
                    // Set to 1 so it doesn't change
                    if (input === "0") num2 = 1
                    total = multiply(num, num2)
                    break;
                case "/":
                    // Set to 1 so it doesn't change
                    if (input === "0") num2 = 1
                    total = divide(num, num2)
                    break;
                }
            }
            num = total
    
    }


// When page loads
loadBtns();


// Should only run after computing
// resizeResult();

function add(val, val2) {
    return Number(val) + Number(val2)
}

function subtract(val, val2) {
    return Number(val) - Number(val2)
}

function multiply(val, val2) {
    return Number(val) * Number(val2)
}

function divide(val, val2) {
    return Number(val) / Number(val2)
}


// Should double tap to clear all, one tap clears the 2nd number, if 2nd number undefined then clear all
function clear(reset) {
    
    if (reset === 1) {
        sizeLimit = false;
        resizeResult(true)
    if (clear.num === undefined) {
        clear.num = 0;
    }
    clear.num += 1
    if (clear.num === 1 && !operationDone) {
        console.log('Clear Once');
        if (num !== undefined) {
            num2 = undefined
        } else {
            num = undefined
        }

        updateScreen();
    } else if (clear.num === 2 || operationDone) {
        num = undefined;
        num2 = undefined;
        total = undefined;
        isContinuing = false
        operationDone = false
        updateScreen();
        console.log('Wipe');
    }
} else {
    clear.num = 0
}
}

let storePositive;
// Just take the current input and switch between negative or positive
function turnToNegative() {
    if (!isInputting || results.innerHTML === "0") return
    if (Number(results.innerHTML) < 0) isNegative = true
    else isNegative = false


    if (isNegative) {
        isNegative = false
        storePositive ??= results.innerHTML.split("-")[1]
        input = `${storePositive}`
        console.log("Turn to positive");
        console.log(num, num2, total);
    } else
    if (!isNegative) {
        isNegative = true
        storePositive = input
        input = `-${input}`
        console.log(num, num2, total);
        console.log("Turn to negative");
    }
results.innerHTML = input
}

// Should turn current input into a percentage. If user just presses equal after percentage then just give divide by 100
// Example: 300% = 3.00
function percentage() {}

