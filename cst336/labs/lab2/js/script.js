//Event Listeners
document.querySelector("#guessBtn").addEventListener("click",checkGuess)
document.querySelector("#resetBtn").addEventListener("click",initializeGame)
document.querySelector("#playerGuess").addEventListener("click",clearInput)
document.querySelector("#playerGuess").addEventListener("keypress", function(event){
    if(event.key == "Enter" && document.querySelector("#mainContainer").style.background != "rgba(255, 255, 255, 0.7)"){
        checkGuess();
    }})

//global variables
let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;

initializeGame();

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1
    console.log("randomNumber: " + randomNumber)
    attempts = 0;
    resetDisplay();
    document.querySelector("#status").textContent = "Attempts Made: " + attempts;
    document.querySelector("#winCount").textContent = "Wins: " + wins;
    document.querySelector("#lossCount").textContent = "Losses: " + losses;
    //hiding the reset button
    document.querySelector("#resetBtn").style.display = "none";
    //showing the guess button
    document.querySelector("#guessBtn").style.display = "inline";

    //adding focus to textbox
    document.querySelector("#playerGuess").focus();

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus()
    playerGuess.value = ""

    let feedback = document.querySelector("#feedback");
    feedback.textContent = ""

    document.querySelector("#lowGuesses").textContent = "";
    document.querySelector("#highGuesses").textContent = "";
}

function clearInput() {
    document.querySelector("#playerGuess").placeholder = "";
}

function resetDisplay() {
    document.querySelector("#prevGuesses").style.display = "none"
    document.querySelector("#mainContainer").style.border = "0";
    document.querySelector("#mainContainer").style.background = "rgba(0, 0, 150, 0.65)";
    document.querySelector("#status").style.background = "rgba(255, 255, 255, 0.55)";
    document.querySelector("#status").style.color = "black";
    document.querySelector("#status").style.background = "rgba(255, 255, 255, 0.55)";
    document.querySelector("#status").style.color = "black";
    document.querySelector("#winDisplay").style.background = "rgba(255, 255, 255, 0.55)";
    document.querySelector("#winDisplay").style.color = "black";
    document.querySelector("#lossDisplay").style.background = "rgba(255, 255, 255, 0.55)";
    document.querySelector("#lossDisplay").style.color = "black";
    document.querySelector("#guessField").style.background = "rgba(255, 255, 255, 0.55)";
    document.querySelector("#guessField").style.color = "black";
    document.querySelector("#playerGuess").placeholder = "";
}

function winDisplay() {
    document.querySelector("#prevGuesses").style.display = "none"
    document.querySelector("#mainContainer").style.border = "5px solid darkgreen";
    document.querySelector("#mainContainer").style.background = "rgba(50, 200, 50, 0.7)";
    document.querySelector("#status").textContent = "You guessed it! You Won!";
    document.querySelector("#status").style.color = "darkgreen";
    document.querySelector("#winDisplay").style.color = "darkgreen";
    document.querySelector("#lossDisplay").style.color = "darkgreen";
    document.querySelector("#guessField").style.color = "darkgreen";
    document.querySelector("#playerGuess").placeholder = "Congratulations!";
    document.querySelector("#playerGuess").blur()
}

function lossDisplay() {
    document.querySelector("#prevGuesses").style.display = "none"
    document.querySelector("#mainContainer").style.border = "5px solid red";
    document.querySelector("#mainContainer").style.background = "rgba(200, 50, 50, 0.7)";
    document.querySelector("#status").textContent = "Sorry, you lost!";
    document.querySelector("#status").style.color = "red";
    document.querySelector("#winDisplay").style.color = "red";
    document.querySelector("#lossDisplay").style.color = "red";
    document.querySelector("#guessField").style.color = "red";
    document.querySelector("#playerGuess").placeholder = "The selected number was " + randomNumber;
    document.querySelector("#playerGuess").blur()
}

function checkGuess(){
    document.querySelector("#prevGuesses").style.display = "flex"
    let feedback = document.querySelector("#playerGuess");
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    document.querySelector("#playerGuess").value = "";
    if(guess < 1 || guess > 99){
        feedback.placeholder = "Enter a number between 1 and 99";
        return;
    }
    attempts++;
    document.querySelector("#status").textContent = "Attempts Made: " + attempts;
    if(guess == randomNumber) {
        winDisplay()
        wins++;
        gameOver();
    } else {
        if(guess < randomNumber) {
            document.querySelector("#lowGuesses").textContent += guess + " ";
        }
        else {
            document.querySelector("#highGuesses").textContent += guess + " ";
        }
        if(attempts == 7) {
            lossDisplay();
            losses++;
            gameOver();
        } else if (guess > randomNumber) {
            feedback.placeholder = "Your guess was high";
        } else {
            feedback.placeholder = "Your guess was low";
        }
    }
}

function gameOver(){
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none";
    resetBtn.style.display = "inline";
}