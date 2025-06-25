
// script.js
const words = ["javascript", "hangman", "virtual", "teamwork", "challenge", "browser", "frontend"];
let selectedWord = "";
let guessedLetters = [];
let wrongLetters = [];
let team = "";

function selectTeam(teamName) {
  team = teamName;
  document.getElementById("team-selection").style.display = "none";
  document.getElementById("game").style.display = "block";
  document.getElementById("team-name").textContent = `${team}'s Turn`;
  startGame();
}

function startGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  wrongLetters = [];
  updateDisplay();
  document.getElementById("message").textContent = "";
}

function updateDisplay() {
  const display = selectedWord
    .split("")
    .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
  document.getElementById("word-display").textContent = display;
  document.getElementById("wrong-letters").textContent = wrongLetters.join(", ");
}

function guessLetter() {
  const input = document.getElementById("letter-input");
  const letter = input.value.toLowerCase();
  input.value = "";

  if (!letter.match(/[a-z]/) || letter.length !== 1) {
    alert("Please enter a valid letter.");
    return;
  }

  if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
    alert("You already guessed that letter.");
    return;
  }

  if (selectedWord.includes(letter)) {
    guessedLetters.push(letter);
  } else {
    wrongLetters.push(letter);
  }

  updateDisplay();
  checkGameStatus();
}

function checkGameStatus() {
  const wordGuessed = selectedWord.split("").every(letter => guessedLetters.includes(letter));
  if (wordGuessed) {
    document.getElementById("message").textContent = "🎉 You guessed the word!";
  } else if (wrongLetters.length >= 6) {
    document.getElementById("message").textContent = `💀 Game Over! The word was "${selectedWord}".`;
  }
}

function resetGame() {
  startGame();
}
