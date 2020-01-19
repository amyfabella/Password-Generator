//Variables
var lengthEl = document.getElementById("length");
var symbolsEl = document.getElementById("symbols");
var numbersEl = document.getElementById("numbers");
var lowerEl = document.getElementById("lower");
var upperEl = document.getElementById("upper");
var generateEl = document.getElementById("generate");
var passwordEl = document.getElementById("password");
var clipboardEl = document.getElementById("copy");

var randomFunc = {
    length: getRandomLength,
    symbols: getRandomSymbol,
    numbers: getRandomNumber,
    lower: getRandomLower,
    upper: getRandomUpper,
}

//App validates input, ensures >= one character type selected (needs conditional)
//from https://stackoverflow.com/questions/29567932/javascript-multiple-checkbox-validation-not-work
function validate() {
    var userSelections = document.querySelectorAll(".check:checked");
    if (!userSelections) {
        alert("Please select at least one character type!");
        return false;
    }
}

//Functions (from https://www.youtube.com/watch?v=duNmhKgtcsI)
function getRandomLength() {
    return String(Math.floor(Math.random() * 128) + 8);
}

function getRandomSymbol() {
    var symbols = '!@#$%^&*(){}[]=<>/,.';
    let symArray = symbols.split("");
    return symArray[Math.floor(Math.random() * symbols.length)];
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function generatePassword(length, symbols, numbers, lower, upper) {
    let generatedPassword = "";

    var typesCount = length + symbols + numbers + lower + upper; 

    var typesArr = [{ length }, { symbols }, { numbers }, { lower }, { upper }].filter(item => Object.values(item)[0]);

    if (typesCount === 0) {
        alert("Please select at least one character type.")
        return ""; 
    }

    for (let i = 0; i < length; i+= typesCount) {
        typesArr.forEach(type => {
            var funcName = Object.keys(type)[0];

            generatedPassword += randomFunc[funcName]();
        });
    }

    var finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

//Event Listeners
generate.addEventListener("click", function(event) {
    event.preventDefault();
})

generate.addEventListener("click", () => {
    var hasLength = lengthEl.checked;
    var hasSymbols = symbolsEl.checked;
    var hasNumbers = numbersEl.checked;
    var hasLower = lowerEl.checked;
    var hasUpper = upperEl.checked;

    passwordEl.innerText = generatePassword(
        hasLength, 
        hasSymbols, 
        hasNumbers, 
        hasLower, 
        hasUpper);

    //randomly pick out # of characters that matches password length
    //add those to new var --> generated password
    //generated password += each array index --> string
    //show string in text area content≥21
})

//BONUS: 'copy to clipboard'
clipboardEl.addEventListener("click", () => {
    var textarea = document.createElement("textarea");
    var password = passwordEl.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard.");

})
