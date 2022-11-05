import {startConfetti, stopConfetti, removeConfetti} from './confetti.js';

const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const resultText = document.getElementById('resultText');
const allGameIcons = document.querySelectorAll('.far');

let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = '';

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

// resetting other icons when user changes selection
// not removing will permanantly save that class in icon
function resetIcon() {
  allGameIcons.forEach((icon) => {icon.classList.remove('selected')});
  stopConfetti();
  removeConfetti();
}

// sets all values to initials
function resetAll() {
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScoreEl.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScoreNumber;
  playerChoiceEl.textContent = '';
  computerChoiceEl.textContent = '';
  resultText.textContent = '';
  resetIcon();
}
// because we made this script file of type module, select was no longer acailable globally
// to make this avilable globally we made it explicitly global
window.resetAll = resetAll;

// to check computer choice
function checkComputerChoice() {
  const computerChoiceNumber = Math.random();
  if (computerChoiceNumber < 0.2) {
    computerChoice = 'rock';
  } else if(computerChoiceNumber <= 0.4) {
    computerChoice = 'paper';
  } else if(computerChoiceNumber <= 0.6){
    computerChoice = 'scissors';
  } else if(computerChoiceNumber <= 0.8) {
    computerChoice = 'lizard';
  } else {
    computerChoice = 'spock';
  }
}

// to display computer result
function displayComputerChoice() {
  switch(computerChoice) {

    case 'rock':
      computerRock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Rock';
      break;

    case 'paper':
      computerPaper.classList.add('selected');
      computerChoiceEl.textContent = ' --- paper';
      break;

    case 'scissors':
      computerScissors.classList.add('selected');
      computerChoiceEl.textContent = ' --- scissors';
      break;

    case 'lizard':
      computerLizard.classList.add('selected');
      computerChoiceEl.textContent = ' --- lizard';
      break;

    case 'spock':
      computerSpock.classList.add('selected');
      computerChoiceEl.textContent = ' --- spock';
      break;

    default:
      break;
  }
}

// check who won and run confetti
function updateScore(playerChoice) {
  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a tie."
  } else {
    const choice = choices[playerChoice];
    if (choice.defeats.indexOf(computerChoice) > -1) {
      startConfetti();
      resultText.textContent = "You Won!"
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
    } else {
      resultText.textContent = "You Lost!"
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
    }
  }
}

function checkResult(playerChoice){
  resetIcon();
  checkComputerChoice();
  displayComputerChoice();
  updateScore(playerChoice);
}


// function to change color on selecting icon and change text content
function select(playerChoice) {
  checkResult(playerChoice);
  switch(playerChoice) {

    case 'rock':
      playerRock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Rock';
      break;

    case 'paper':
      playerPaper.classList.add('selected');
      playerChoiceEl.textContent = ' --- paper';
      break;

    case 'scissors':
      playerScissors.classList.add('selected');
      playerChoiceEl.textContent = ' --- scissors';
      break;

    case 'lizard':
      playerLizard.classList.add('selected');
      playerChoiceEl.textContent = ' --- lizard';
      break;

    case 'spock':
      playerSpock.classList.add('selected');
      playerChoiceEl.textContent = ' --- spock';
      break;

    default:
      break;
  }

}
window.select = select;

// call resetall on load
resetAll();
