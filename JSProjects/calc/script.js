const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

/**
 * Updates the value of the display in the calculator interface
 * with the current value of `calculator.displayNumber`
 */
function updateDisplay() {
  document.querySelector("#display").value = calculator.displayValue;
}

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
 
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;

    //   let {displayValue} = calculator
    //   let length = displayValue.length
    //   console.log(length-1, displayValue[length-1])
}


function handleOperator(nextOperator) {
    let { firstOperand, displayValue, operator, waitingForSecondOperand } = calculator
  calculator.displayValue += nextOperator;
}

function clearCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function calculateResult() {
  let result = eval(calculator.displayValue);
  document.querySelector("#display").value = result;
  calculator.displayValue = result;
}

const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", function (event) {
  const { target } = event;

  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("operator")) {
        console.log(target.value)
  }

  if (target.classList.contains("operator")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("equal-sign")) {
    console.log("equal sign");
    calculateResult();
    return;
  }

  if (target.classList.contains("all-clear")) {
    clearCalculator();
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});
