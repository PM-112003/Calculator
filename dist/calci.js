let display = document.querySelector('#display');
let num = document.querySelectorAll('.number');
let clearbtn = document.querySelector('.clear');
let deletebtn = document.querySelector('.delete');
let equals = document.querySelector('.equalsto');

display.textContent = 0;

// adding the number to display
num.forEach((number) => {
    number.addEventListener("click", () => {
        let value = number.textContent; // Get the correct text content of the button
        if(display.textContent == 0){
            display.textContent = value;
        }
        else{
        display.textContent += value; // Append it to the display
        }
    });
});

// clearing the display
clearbtn.addEventListener("click", () => {
    display.textContent = 0;
})


// delete one text 
deletebtn.addEventListener("click", () => {
    display.textContent = display.textContent.slice(0, -1);
    if(display.textContent==""){
        display.textContent = 0;
    }
})

let operators = ['+', '-', '*', '/'];

function isoperator(character){
    for(let i=0;i<operators.length;i++){
        if(character==operators[i]){
            return true;
        }
    }
    return false;
}

equals.addEventListener("click", () => {
    // Check validity of the expression
    let str = display.textContent;
    if (isoperator(str[0])) {
        alert("Invalid expression: Cannot start with an operator!");
        return;
    }
    for (let i = 1; i < str.length - 1; i++) {
        if (isoperator(str[i]) && isoperator(str[i + 1])) {
            alert("Invalid expression: Cannot have consecutive operators!");
            return;
        }
    }

    // Extract numbers and operators
    let numbers = [];
    let ops = [];
    let temp = "";

    for (let i = 0; i < str.length; i++) {
        if (!isoperator(str[i])) {
            temp += str[i]; // Build the number
        } else {
            numbers.push(parseFloat(temp)); // Push the number to the numbers array
            ops.push(str[i]); // Push the operator to the ops array
            temp = ""; // Reset temp for the next number
        }
    }
    if (temp !== "") {
        numbers.push(parseFloat(temp)); // Push the last number
    }

    // Handle operator precedence
    let op_preced = ['/','*','+','-'];
    for (let i = 0; i < op_preced.length; i++) {
        while (ops.indexOf(op_preced[i]) !== -1) {
            let idx = ops.indexOf(op_preced[i]);

            // Perform the correct operation based on the operator
            let tempans = 0;
            if (ops[idx] === '/') {
                tempans = numbers[idx] / numbers[idx + 1];
            } else if (ops[idx] === '*') {
                tempans = numbers[idx] * numbers[idx + 1];
            } else if (ops[idx] === '+') {
                tempans = numbers[idx] + numbers[idx + 1];
            } else if (ops[idx] === '-') {
                tempans = numbers[idx] - numbers[idx + 1];
            }

            // Replace the two numbers with the result
            numbers.splice(idx, 2, tempans);
            ops.splice(idx, 1); // Remove the operator
        }
    }

    // Display the final answer
    let finalans = numbers[0];
    display.textContent = parseFloat(finalans.toFixed(2)); // Round to 2 decimal places for clarity
});








