let p1Scores = [0, 0, 0];
let p2Scores = [0, 0, 0];
let rollsLeft = 3;
let highscore = 0;
let p1Turn = true;
let diceValues = [0, 0, 0, 0, 0];
let lockDieState = [false, false, false, false, false];

function roll() {
  if (rollsLeft === 0) return;
  
  for (let i = 0; i < diceValues.length; i++) {
    if (!lockDieState[i]) {
      diceValues[i] = Math.floor(Math.random() * 6) + 1;
      document.getElementById(`die${i + 1}`).src = `images/Dice-${diceValues[i]}.png`;
    }
  }
  
  rollsLeft--;
  document.getElementById("rolls").innerText = rollsLeft;
  
  calculateScores();
}

function lockDie(index) {
  lockDieState[index] = !lockDieState[index];
}

function calculateScores() {
  let counts = [0, 0, 0, 0, 0, 0];
  diceValues.forEach(value => counts[value - 1]++);
  
  const acesScore = counts[0] * 1;
  const twosScore = counts[1] * 2;
  const threesScore = counts[2] * 3;
  
  if (p1Turn) {
    p1Scores[0] = acesScore;
    p1Scores[1] = twosScore;
    p1Scores[2] = threesScore;
    
    document.getElementById("aces--p1").innerText = acesScore;
    document.getElementById("twos--p1").innerText = twosScore;
    document.getElementById("threes--p1").innerText = threesScore;
    document.getElementById("top--p1--total").innerText = p1Scores.reduce((a, b) => a + b, 0);
  } else {
    p2Scores[0] = acesScore;
    p2Scores[1] = twosScore;
    p2Scores[2] = threesScore;
    
    document.getElementById("aces--p2").innerText = acesScore;
    document.getElementById("twos--p2").innerText = twosScore;
    document.getElementById("threes--p2").innerText = threesScore;
    document.getElementById("top--p2--total").innerText = p2Scores.reduce((a, b) => a + b, 0);
  }
  
  if (rollsLeft === 0) {
    rollsLeft = 3;
    p1Turn = !p1Turn;
    document.getElementById("turn").innerText = p1Turn ? "Player 1" : "Player 2";
  }
}
