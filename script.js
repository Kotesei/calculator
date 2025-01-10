'use strict'
const btnsContainer = document.querySelector(".calc--btns")
const resultContainer = document.querySelector(".calc--input")

// Display (User Input: Step 2 of 2)
const results = resultContainer.querySelector("p");


const originalfontSize = Number(window.getComputedStyle(results).fontSize.split("px")[0] / 16)

let operation;
let isOperating
let canOperate;
let num;
let num2;
let total;
let doneOperating;
let isPercentage;
let savePercent;

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

    if (numerics.includes(thisBtn.innerHTML)) {
                thisBtn.classList.add("color--numerics")
                thisBtn.addEventListener("click", function(e) {
                    if (sizeLimit) return
                    if (doneOperating) clear();
                    
                    if (isOperating) {
                        if (!num2 && e.target.innerHTML === "0") return
                        num2 = num2 ? num2 + e.target.innerHTML : e.target.innerHTML;
                        results.innerHTML = num2
                    } else {
                        if (!num && e.target.innerHTML === "0") return
          
                        
                        
                    num = num ? num + e.target.innerHTML : e.target.innerHTML;
                    if (results.innerHTML === ".") results.innerHTML = "0."
                    results.innerHTML = num
                }
                resizeResult()
                })
               
            }
            if (utility.includes(thisBtn.innerHTML)) {
                thisBtn.classList.add("color--utility")
                thisBtn.addEventListener("click", function(e) {
                    switch (e.target.innerHTML) {
                        case "AC":
                            clear();
                        break;
                        case "+/-":
                            if (sizeLimit) return
                            invertNumber();
                            if (num && !num2) {
                                num = results.innerHTML;
                            }
                            else {
                                num2 = results.innerHTML
                            }
                        break;
                        case "%":
                            if (sizeLimit) return
                            if (results.innerHTML === "0") return

                            // Build a function for this 
                            percentage();
                        break;
                    }
                })
            }
            if (operations.includes(thisBtn.innerHTML)) {
                thisBtn.classList.add("color--operators")
                thisBtn.addEventListener("click", function(e) {
                    if (sizeLimit) return

                    // For operation add, multi, divide, sub
                    if (e.target.innerHTML !== "=") {
                        console.log(isPercentage);
                        
                        if (isOperating) {
                            if (!num) num = 0
                        if (!num2) num2 = 0
                        // Should calculate here and continue.
                        if (num === 0 && num2 === 0) {
                        } else {
                            total = calc(num, operation, num2)
                            results.innerHTML = total
                            num = total
                            num2 = 0
                        }
                        }
                        else {
                            if (!num) num = 0
                            
                            // isOperating ensures input stays on num2 and num is left untouched, should only be false if clearing.
                            isOperating = true;
                            results.innerHTML = "0"
                        }
                        doneOperating = false;
                        isPercentage = false;
                        operation = e.target.innerHTML  
                    }

                    // For pressing equal
                    if (e.target.innerHTML === "=") {
                        console.log(num, num2, total);
                        if (doneOperating) {
                            num = total
                            if (isPercentage) {
                                console.log("is percentage");
                                num2 = num * savePercent / 100
                            } else {
                            console.log("not percentage");
                            }
                            
                        }
                        // Return num as the total if no num2 found
                        if (!num) num = 0
                        if (!num2) num2 = 0
                        // Calculates the total
                        total = calc(num, operation, num2)
                        if (!isFinite(calc(num, operation, num2))) total = Infinity
                        if (!operation || total === undefined) total = num
                    results.innerHTML = total
                    doneOperating = true;
                    }
                    resizeResult()
                }
            )
            }
        }
}



function percentage() {
    if (isOperating) {
        num2 = num * num2 / 100 
        console.log(num2);
    } else {
        num = results.innerHTML / 100;
    }
    savePercent = results.innerHTML;
    results.innerHTML = results.innerHTML + "%"
    console.log(savePercent);
    isPercentage = true;
}


loadBtns();

function calc(num, operation, num2) {
    switch(operation) {
        case "+":
        return Number(num) + Number(num2);
        case "-":
        return Number(num) - Number(num2);
        case "/":
        return Number(num) / Number(num2);
        case "*":
        return Number(num) * Number(num2);
    }
}

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
        sizeLimit = false;
    }

    
    if (fontSize === undefined) fontSize = getTextFontSize;

    if (fontSize === 3) {
        results.innerHTML = "Size Limit!"
        sizeLimit = true;
    }
    

    if (getTextWidth + getContainerPadding > getContainerWidth) {
        fontSize--
        results.style.fontSize = `${fontSize}rem`
        resizeResult();
    }


}


function clear() {
    if (isOperating){
        if (!num2) {
            // Wipes if no num2 found
            console.log("Wipe");
            isOperating = false;
            doneOperating = false;
            isPercentage
            num = undefined;
            num2 = undefined;
                results.innerHTML = "0"
        } else {
            if (doneOperating) {
                console.log("Wipe");
                isOperating = false;
                isPercentage
            doneOperating = false;
                num = undefined;
                num2 = undefined;
                results.innerHTML = "0"
            }
            else {
                console.log(num2);
                console.log("Clear Num2");
                num2 = undefined
                results.innerHTML = "0"
            }
        }
    } else {
        console.log("Wipe");
        isOperating = false;
            doneOperating = false;
            isPercentage
        num = undefined;
        num2 = undefined;
        results.innerHTML = "0"
    }
    resizeResult(true)
}

function invertNumber() {
    if (results.innerHTML === "0") return
    if (results.innerHTML.includes("-")) results.innerHTML = results.innerHTML.split("-")[1]
    else results.innerHTML = "-" + results.innerHTML
}