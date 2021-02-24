const buttons = document.querySelectorAll('.buttons');
const displayValue = document.querySelector('#display');
let numbersButton = document.querySelectorAll('.numbers');
let operatorsButton = document.querySelectorAll('.operands');
let backspaceButton = document.querySelector('#backspace');
let equalsButton = document.querySelector('#equals');
let decimalButton = document.querySelector('#decimal');
let clearButton = document.querySelector('#clear');
let currentNumberValue = '';
let previousNumberValue = '';
let currentOperatorValue = '';
let operationValue;
let isLastInputOperator = false;
let isLastInputEquals = false;
let decimalAllowed = true;

const add = (num1, num2) => num1 += num2;

const substract = (num1, num2) => num1 - num2;

const multiply = (num1, num2) => num1 * num2;

const divide = (num1, num2) => num1 / num2;

const operate = (operator, num1, num2) => {
    switch(operator) {
        case '+':
            return add(num1, num2)
        break;
        case '-':
            return substract(num1, num2)
        break;
        case '*':
            return multiply(num1, num2)
        break;
        case '/':
            return divide(num1, num2)
        break;
    }
}

const resetEverything = () => {
    displayValue.textContent = 0;
    currentNumberValue = '';
    previousNumberValue = '';
    currentOperatorValue = '';
    operationValue = undefined;
    isLastInputOperator = false;
    decimalAllowed = true;
}

const backspace = () => {
    currentNumberValue = currentNumberValue.slice(0, currentNumberValue.length-1);
    displayValue.textContent = currentNumberValue;
    if (currentNumberValue.includes('.') == false) {
        decimalAllowed = true;
    }
}

//to round displayed answers (but not the actual values)
const roundToTwo = (num) => {
    return +(Math.round(num + "e+2")  + "e-2");
}

numbersButton.forEach(button => button.addEventListener('click', () => {
    //this part makes sure 0 is not shown at the start
   // if (button.textContent == '0' && currentNumberValue == '') {
 //       alert('Can\'t start with a 0!');
 //   }
 //   else {
        //if user inputs a number right after equals it goes here
        if (isLastInputEquals == true) {
            resetEverything();
            currentNumberValue += button.textContent;
            displayValue.textContent = currentNumberValue;
            isLastInputEquals = false;
        }
        //first number input goes here and all the other numbers (the digit after the first digit that doesn't go here)
        else if (isLastInputOperator == false) {
            currentNumberValue += button.textContent;
            displayValue.textContent = currentNumberValue;
        }
        //number input right after an operator goes here, digit after goes to the condition above
        else if (isLastInputOperator == true) {
            //this part is for when user clicks on an operator after they had used an operator before (multiple operations)
            if (previousNumberValue != operationValue && currentNumberValue != '') {
                previousNumberValue = currentNumberValue;
            }
            currentNumberValue = '';
            //this part makes sure 0 is not shown at the start 
            // if (button.textContent == '0' && currentNumberValue == '') {
            //     alert('Can\'t start with a 0!');
            // }
            // else {
            currentNumberValue += button.textContent;
            displayValue.textContent = currentNumberValue;
            isLastInputOperator = false;
            // }
        }
  //  }
}));

operatorsButton.forEach(button => button.addEventListener('click', () => {
    //to make sure there's no error if the user clicks the operator twice problem: what if they want to change operators
    if (isLastInputOperator == false) {
        //if user inputs an operator right after equals it goes here
        if (isLastInputEquals == true) {
            previousNumberValue = operationValue;
            currentOperatorValue = button.value;
            isLastInputEquals = false;
            currentNumberValue = '';
        }
        else if (isLastInputEquals == false) {
            //this part is for when user clicks on an operator after they had used an operator before (multiple operations)
            if (previousNumberValue){
                if (currentOperatorValue == '/' && currentNumberValue == '0') {
                    alert('You can\'t divide by zero!');
                }
                else {
                    operationValue = operate(currentOperatorValue, parseFloat(previousNumberValue), parseFloat(currentNumberValue));
                    previousNumberValue = operationValue;
                    displayValue.textContent = roundToTwo(operationValue);
                }
            }
            currentOperatorValue = button.value;
            isLastInputOperator = true;
        }
        decimalAllowed = true;
    }
}));

decimalButton.addEventListener('click', () => {
    if (decimalAllowed == true) {
        currentNumberValue += '.';
        displayValue.textContent = currentNumberValue;
        //this makes sure there's only one dot for each decimal
        decimalAllowed = false;
    }
})

equalsButton.addEventListener('click', () => {
    //checks if user has entered all the inputs needed before pressing equals
    if (currentOperatorValue && previousNumberValue) {
        if (currentOperatorValue == '/' && currentNumberValue == '0') {
            alert('You can\'t divide by zero!');
        }
        //parseFloat is used instead of parseInt so that the decimals won't be ignored
        else {
            operationValue = operate(currentOperatorValue, parseFloat(previousNumberValue), parseFloat(currentNumberValue));
            displayValue.textContent = roundToTwo(operationValue);
            isLastInputEquals = true;
        }
    }
});

clearButton.addEventListener('click', () => {
    resetEverything();
});

backspaceButton.addEventListener('click', () => {
    backspace();
})