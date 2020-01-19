//Variables
var lengthEl = document.getElementById("length");
var symbolsEl = document.getElementById("symbols");
var numbersEl = document.getElementById("numbers");
var lowerEl = document.getElementById("lower");
var upperEl = document.getElementById("upper");
var generateEl = document.getElementById("generate");
var passwordEl = document.getElementById("password");
var clipboardEl = document.getElementById("copy");

//Object (functions)
var randomFunc = {
    symbols: getRandomSymbol,
    numbers: getRandomNumber,
    lower: getRandomLower,
    upper: getRandomUpper,
}

//Functions (from https://www.youtube.com/watch?v=duNmhKgtcsI)
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

    var typesCount = symbols + numbers + lower + upper; 

    var typesArr = [{ symbols }, { numbers }, { lower }, { upper }].filter(item => Object.values(item)[0]);

    //App validates input, ensures >= one character type selected
    if (typesCount === 0) {
        alert("Please select at least one character type.")
        return ""; 
    }

    //randomly pick out # of characters that matches password length
    //add those to new var --> generated password
    for (let i = 0; i < length; i+= typesCount) {
        typesArr.forEach(type => {
            var funcName = Object.keys(type)[0];

            //generated password += each array index --> string
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
    var length = lengthEl.value;
    var hasSymbols = symbolsEl.checked;
    var hasNumbers = numbersEl.checked;
    var hasLower = lowerEl.checked;
    var hasUpper = upperEl.checked;

    //show string in text area content
    passwordEl.innerText = generatePassword(
        length, 
        hasSymbols, 
        hasNumbers, 
        hasLower, 
        hasUpper);
})

//BONUS: copy to clipboard
copy.addEventListener("click", () => {
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
