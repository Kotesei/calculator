'use strict'
const btnsContainer = document.querySelector(".calc--btns")
const resultContainer = document.querySelector(".calc--input")

// Display (User Input: Step 2 of 2)
const results = resultContainer.querySelector("p");


const originalfontSize = Number(window.getComputedStyle(results).fontSize.split("px")[0] / 16)
// Saves (User Input: Step 1 of 2)
let input;

// Saves the value via input here if doing any of the following: Divison, Multiplication, Subtraction, Addition can compute itself and give a result right away, for percentage just do division by 100.
let num;

// Saves the last operator
let prevOperator;
let repeatOperation = 0;
let isNumber;

// Switches to storing the input in here afterwards if num has a value already stored inside. Doing any form of operation will first, store both num, and num2 into a total then total will become num and num2 will be ready to take another input. This can happen as many times as the user wishes.
let num2;
let storeNum2;

// Total is updated after computing it takes the input and the secondary number. If pressing anything to operate on top of it, then it will go into num and start the user at num2. If user presses a number after total is received then reset everything.
let total;

// For the results not to go outside the div if it gets too big
let sizeLimit;

// Checks if user is looking at results or continuing
let operationDone;


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
        
        // Checks if button pressed is a numeric one and if the sizeLimit hasn't been reached.
        if (el.target.classList.contains("color--numerics") && !sizeLimit) {
            clear(0)
            operationDone = false;
            isNumber = true;
            if (input === undefined || input === "0") input = el.target.innerHTML
            else
            input += el.target.innerHTML
        results.innerHTML = input
    }
    
    // Sets the operator to use
    if (el.target.classList.contains("color--operators")) {
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

function operate(operator, continuous) {
    if (operator === "=") {
        if (repeatOperation !== 2) {
            repeatOperation++             
        }

        if (repeatOperation === 2) {
            num2 = input
            input = "0"
            if (prevOperator === "+") total = add(total, storeNum2)
            if (prevOperator === "-") total = subtract(total, storeNum2)
            if (prevOperator === "*") total = multiply(total, storeNum2)
            results.innerHTML = total
        }
if (repeatOperation !== 2) {
        if (prevOperator === "+") {
            if (!isNumber) {
                storeNum2 = total
                total = add(total, total)
            } else {
                num2 = input
                storeNum2 = num2
                input = "0"
                if (total !== undefined) total = add(total, num2)
                    else total = add(num, num2)
            }
            results.innerHTML = total
            isNumber = false;
           
        }

        if (prevOperator === "-") {
            if (!isNumber) {
                storeNum2 = total
                total = subtract(total, total)
            } else {
                num2 = input
                storeNum2 = num2
                input = "0"
                if (total !== undefined) total = subtract(total, num2)
                    else total = subtract(num, num2)
            }
            results.innerHTML = total
            isNumber = false;
           
        }

        if (prevOperator === "*") {
            if (!isNumber) {
                storeNum2 = total
                total = multiply(total, total)
            } else {
                num2 = input
                storeNum2 = num2
                input = "0"
                if (total !== undefined) total = multiply(total, num2)
                    else total = multiply(num, num2)
            }
            results.innerHTML = total
            isNumber = false;
           
        }
    }
        
    }

    if (operator !== "=") repeatOperation = 0;
    
    if (continuous && operator !== "=") {       
        prevOperator = operator


        if (operator === "+") {
            num2 = input
            input = "0"
            if (total !== undefined) total = add(total, num2)
                else total = add(num, num2)
            results.innerHTML = total
        }

        if (operator === "-") {
            num2 = input
            input = "0"
            if (total !== undefined) total = subtract(total, num2)
                else total = subtract(num, num2)
            results.innerHTML = total
        }

        if (operator === "*") {
            num2 = input
            input = "0"
            if (total !== undefined) total = multiply(total, num2)
                else total = multiply(num, num2)
            results.innerHTML = total
        }
    }
    
    if (!continuous && operator !== "=") {
        prevOperator = operator
        num = input
        input = "0"
    }
 
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

function divide(val, val2) {}

function getTotal() {

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
        results.innerHTML = "0"
        input = "0"
    } else if (clear.num === 2 || operationDone) {
        num = undefined;
        num2 = undefined;
        total = undefined;
        input = "0"
        results.innerHTML = input
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

