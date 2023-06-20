console.log("Welcome to Tic Tac Toe");

const music = new Audio("music.mp3");
const audioTurn = new Audio("ting.mp3");
const gameover = new Audio("gameover.mp3");
let turn = "X";
let isGameover = false;

// Function to change the turn
const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};

// Function to check for a win
const checkWin = () => {
  const boxtext = document.getElementsByClassName('boxtext');
  const wins = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];
  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        boxtext[e[0]].innerText + " Won";
      isGameover = true;
      animateWinningLine(e);
    }
  });
};

// Function to animate the winning line
const animateWinningLine = (e) => {
  const line = document.querySelector(".line");
  line.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
  line.style.animation = "drawLine 1s forwards";
};

// Function to reset the winning line animation
const resetWinningLine = () => {
  const line = document.querySelector(".line");
  line.style.transform = "translate(0, 0) rotate(0deg)";
  line.style.animation = "";
};





// Game Logic
// music.play();
const boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  const boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "") {
      boxtext.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      checkWin();
      if (!isGameover) {
        document.querySelector(".info").innerText = "Turn for " + turn;
      }
    }
  });
});

// Add onclick listener to reset button
document.getElementById("reset").addEventListener("click", () => {
  const boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });
  turn = "X";
  isGameover = false;
  resetWinningLine();
  document.querySelector(".info").innerText = "Turn for " + turn;
});
