class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    
    clear() {
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1); // So, .slice() for a regular application, and .pop() for an array value.
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return; // This line of code makes it so you can only have one decimal on the screen at a time.
        this.currentOperand = this.currentOperand.toString() + number.toString(); // We use "toString()" so that JS doesn't ADD the values -- we merely want them to keep appearing at the end of the list.
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return; // If this returns, it stops the rest of the code below it from executing.
        if (this.previousOperand !== "") {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return; // || equals OR. This or that.
        switch (this.operation) {
            case "+":
                computation = prev + current;
                break
            
            case "-":
                computation = prev - current;
                break
            
            case "*":
                computation = prev * current;
                break
            
            case "÷":
                computation = prev / current;
                break
            
            default:
                return
        }
        
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }
    
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const intergerDigits = parseFloat(stringNumber.split(".")[0]); // This turns it into an array, which is why we must use the square brackets and index number.
        const decimalDigits = stringNumber.split(".")[1];
        let intergerDisplay // Left empty.
        if (isNaN(intergerDigits)) {
            intergerDisplay = "";
        } else {
            intergerDisplay = intergerDigits.toLocaleString('en', {maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${intergerDisplay}.${decimalDigits}`;
        } else {
            return intergerDisplay;
        }
    }

        updateDisplay() {
            this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
            if (this.operation != null) {
                this.previousOperandTextElement.innerText =
                    `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`; // These few lines are what keep the operation symbol next to the number when the number is transferred to "the back". Also includes the comma when needed.
            } else {
                this.previousOperandTextElement.innerText = "";
            }
        }
    }



const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})