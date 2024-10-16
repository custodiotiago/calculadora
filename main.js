let displayValue = "0";
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("click", () => handleButtonClick(button));
});

function handleButtonClick(button) {
  const value = button.textContent;

  if (button.classList.contains("number")) {
    handleNumber(value);
  } else if (button.classList.contains("operator")) {
    handleOperator(value);
  } else if (button.classList.contains("equals")) {
    handleEquals();
  } else if (button.classList.contains("clear")) {
    clearCalculator();
  } else if (button.classList.contains("backspace")) {
    backspace();
  } else if (button.classList.contains("decimal")) {
    inputDecimal();
  }

  updateDisplay();
}

function handleNumber(number) {
  if (displayValue === "0" || currentOperator) {
    displayValue = number;
  } else {
    displayValue += number;
  }
}

function handleOperator(operator) {
  if (firstOperand === null) {
    firstOperand = parseFloat(displayValue);
  } else if (currentOperator) {
    secondOperand = parseFloat(displayValue);
    const result = operate(currentOperator, firstOperand, secondOperand);
    displayValue = `${result}`;
    firstOperand = result;
  }
  currentOperator = operator;
}

function handleEquals() {
  if (currentOperator && firstOperand !== null) {
    secondOperand = parseFloat(displayValue);
    const result = operate(currentOperator, firstOperand, secondOperand);
    displayValue = `${result}`;
    firstOperand = result;
    currentOperator = null;
  }
}

function clearCalculator() {
  displayValue = "0";
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
}

function backspace() {
  if (displayValue.length > 1) {
    displayValue = displayValue.slice(0, -1);
  } else {
    displayValue = "0";
  }
}

function inputDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}

function updateDisplay() {
  display.textContent = displayValue;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? "Erro" : a / b;
    default:
      return 0;
  }
}