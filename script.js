'use strict'
const btnsContainer = document.querySelector(".calc--btns")
const resultContainer = document.querySelector(".calc--input")
const results = resultContainer.querySelector("p");


const originalfontSize = Number(window.getComputedStyle(results).fontSize.split("px")[0] / 16)

let operation;
let previousoperation;
let isOperating
let canOperate;
let num;
let previousnum;
let num2;
let previousnum2;
let total;
let isFirst;
let isSecondary;
let doneOperating;
let repeatOperation;
let isPercentage;
let savePercent;
let preventChangingOperation;

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
                    preventChangingOperation = false;
            
                    if (sizeLimit) return
                    if (doneOperating) clear();
                    
                    if (isOperating) {
                    
                        isSecondary = true;
                        isFirst = false
                        if (!num2 && e.target.innerHTML === "0") return
                        num2 = num2 ? num2 + e.target.innerHTML : e.target.innerHTML;
                        results.innerHTML = num2
                    } else {
                        isSecondary = false
                        isFirst = true;
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
                            if (doneOperating) return
                            if (sizeLimit) return
                            if (results.innerHTML === "0") return
                            invertNumber();
                            resizeResult()
                            if (num && !num2) {
                                num = results.innerHTML;
                            }
                            else {
                                num2 = results.innerHTML
                            }
                            break;
                            case "%":
                                if (doneOperating) return
                                if (sizeLimit) return
                            if (results.innerHTML === "0") return

                            // Build a function for this 
                            percentage();
                            resizeResult()
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
                        if (preventChangingOperation) return                        
                        preventChangingOperation = true;
                        doneOperating = false;
                        if (operation === "*" && !doneOperating && previousoperation || operation === "/" && !doneOperating && previousoperation) {
                            console.log("test");
                            if (operation === "/" || operation === "*") {
                                num = previousnum
                                num2 = calc(previousnum2, operation, num2)
                                previousnum2 = num2
                                total = Math.floor(calc(num, previousoperation, num2) * 10000) / 10000
                                num = total
                            }
                          
                        
                        results.innerHTML = total
                        num2 = 0
                        isPercentage = false;
                        operation = e.target.innerHTML  
                        } else {
                        previousnum = num;
                        previousnum2 = num2;
                        
                        if (isOperating) {
                            previousoperation = operation
                            
                            if (!num) num = 0
                        if (!num2) num2 = 0
                        // Should calculate here and continue.
                        if (num === 0 && num2 === 0) {
                        } else {
                            total = calc(num, operation, num2)
                            if (operation === "*" && num2 === 0) total = num
                            total = Math.floor(total * 10000) / 10000
                            results.innerHTML = total
                            num = total
                            num2 = 0
                         
                            // if (e.target.innerHTML === "*")
                        }
                        }
                        else {
                            if (!num) num = 0
                            
                            // isOperating ensures input stays on num2 and num is left untouched, should only be false if clearing.
                            isOperating = true;
                            results.innerHTML = "0"
                        }
                        isPercentage = false;
                        operation = e.target.innerHTML  
                    }
                }
                    // For pressing equal
                    if (e.target.innerHTML === "=") {
                        preventChangingOperation = false;
                        isOperating = false;
                        if (doneOperating) {
                            
                            repeatOperation = true;
                 
                            num = total
                            num2 = previousnum2
                            
                        } 

                  
                        if (!repeatOperation) {
                            if (operation === "*" && !doneOperating && previousoperation || operation === "/" && !doneOperating && previousoperation) {
                                if (operation === "/" || operation === "*") {
                                
                                    num = previousnum
                                    num2 = calc(previousnum2, operation, num2)
                              
                                    previousnum2 = num2
                                    total = Math.floor(calc(num, previousoperation, num2) * 10000) / 10000
                                    operation = previousoperation
                                }
                    }
                }

                                 // Return num as the total if no num2 found
                        if (!num) num = 0
                        if (!num2) num2 = 0
                    
                        // Calculates the total
                        total = calc(num, operation, num2)
                        num = total
                        
                     
                        if (operation === "*" && num2 === 0) total = num
                    if (operation) total = Math.floor(total * 10000) / 10000
                        if (!isFinite(calc(num, operation, num2))) total = Infinity
                        if (!operation || total === undefined) {
                            num = results.innerHTML
                            total = num
                        }
                    
                        results.innerHTML = total
                        
                     
                        doneOperating = true;
                        previousnum2 = num2
                        num2 = 0;

                        console.log(num);
                        console.log(previousnum2);
                    }
                    resizeResult()
                }
            )
            }
        }
}


function percentage() {
    if (isFirst) num = num / 100
    else num2 = num2 / 100;
    savePercent = results.innerHTML;
    results.innerHTML = results.innerHTML + "%"
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
       
            isOperating = false;
            doneOperating = false;
            isPercentage = false;
            num = undefined;
            num2 = undefined;
            total = undefined;
            previousnum = undefined;
            previousoperation = undefined
            operation = undefined
            
            results.innerHTML = "0"
       
        } else {
            if (doneOperating) {
               
                isOperating = false;
                isPercentage = false;
                doneOperating = false;
                isSecondary = false;
                operation = undefined;
                num = undefined;
                num2 = undefined;
                total = undefined;
                previousnum = undefined;
                previousoperation = undefined
                operation = undefined
                savePercent = undefined
                results.innerHTML = "0"
          
               
            }
            else {
              
                num2 = undefined
                results.innerHTML = "0"
            }
        }
    } else {

        isOperating = false;
        doneOperating = false;
        isPercentage = false
        num = undefined;
        num2 = undefined;
        total = undefined;
        previousnum = undefined;
        previousoperation = undefined;
        operation = undefined
        results.innerHTML = "0"

    }
    resizeResult(true)
}

function invertNumber() {
    if (isPercentage) {
        results.innerHTML = "-" + Number(results.innerHTML.split("%")[0]) / 100
        isPercentage = false;
    } else {
        if (results.innerHTML.includes("-")) results.innerHTML = results.innerHTML.split("-")[1]
        else results.innerHTML = "-" + results.innerHTML
    }
    
}