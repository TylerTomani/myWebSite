function allowDrop(event) {
    event.preventDefault();
}
function handleDrop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const inputField = document.getElementById("inputField");
    inputField.value += data + " ";
}

function parseNumbers(input) {
    return input
        .replace(/,/g, "") // Remove commas
        .split(/\s+/)      // Split by spaces
        .filter(num => num.trim() !== "") // Remove empty entries
        .map(num => parseFloat(num)) // Convert to numbers
        .filter(num => !isNaN(num)); // Remove invalid numbers
}

function calculate(operation) {
    const inputField = document.getElementById("inputField");
    const numbers = parseNumbers(inputField.value);

    if (numbers.length === 0) {
        document.getElementById("result").innerText = "Result: No valid numbers provided.";
        return;
    }

    let result;
    switch (operation) {
        case '+':
            result = numbers.reduce((acc, num) => acc + num, 0);
            break;
        case '-':
            result = numbers.reduce((acc, num) => acc - num);
            break;
        case '*':
            result = numbers.reduce((acc, num) => acc * num, 1);
            break;
        case '/':
            result = numbers.reduce((acc, num) => acc / num);
            break;
        default:
            result = "Invalid operation.";
    }

    const isCommaSeparated = document.getElementById("commaSeparated").checked;
    const resultText = isCommaSeparated ? result.toLocaleString() : result;
    document.getElementById("result").innerText = `Result: ${resultText}`;
}