const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstvalue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
    // Check if number is typed directly after using = operator and if so clearDisplay for new calculation
    if (operatorValue === '='){
        clearDisplay();
    }

    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        // If current display value is 0, replace it, if not add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function sendDecimalValue(decimal) {
    // If operator pressed, don't add decimal
    if (awaitingNextValue) return;
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue.includes('.') ? displayValue : displayValue + decimal;
}

// Clears Calculator Display
function clearDisplay() {
    calculatorDisplay.textContent = '0';
    resetValues();
}

// Reset Global Values
function resetValues() {
    firstvalue = 0;
    operatorValue = '';
    awaitingNextValue = false;
}

// Calculate first and second values depending on operator (= is not necessary and does not matter if you return second or first number because they are the same)
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => firstNumber,
};

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    // Assign firstValue if no value
    if (!firstvalue) {
        firstvalue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstvalue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstvalue = calculation;
    }
    awaitingNextValue = true;
    operatorValue = operator;
}

// Add Event Listeners
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => sendDecimalValue(inputBtn.value));
    }
});

clearBtn.addEventListener('click', clearDisplay);

