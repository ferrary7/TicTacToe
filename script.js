let buttonOpt = document.querySelectorAll(".button-option");
let popup = document.querySelector(".popup");
let newGame = document.getElementById("new-game");
let restart = document.getElementById("restart");
let mssg = document.getElementById("message");
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];
//X plays first
let xTurn = true;
let count = 0;

//Disable all buttons
const disableButtons = () => {
  buttonOpt.forEach((element) => (element.disabled = true));
  //enable popup
  popup.classList.remove("hide");
};

//Enable all buttons for New Game and Restart
const enableButtons = () => {
  buttonOpt.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //disable popup
  popup.classList.add("hide");
};

//only when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    mssg.innerHTML = "&#x1F389; <br> 'X' Wins";
  } else {
    mssg.innerHTML = "&#x1F389; <br> 'O' Wins";
  }
};

//draw
const drawFunction = () => {
  disableButtons();
  mssg.innerHTML = "&#x1F60E; <br> It's a Draw";
};

//New Game
newGame.addEventListener("click", () => {
  count = 0;
  enableButtons();
});
restart.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

//Win Logic
const winChecker = () => {
  //Loop through all win patterns
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      buttonOpt[i[0]].innerText,
      buttonOpt[i[1]].innerText,
      buttonOpt[i[2]].innerText,
    ];
    //If 3 empty elements are same and would give win as would
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        //If all 3 buttons have same values then pass the value to winFunction
        winFunction(element1);
      }
    }
  }
};

//x or o onclick
buttonOpt.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      //Display X
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      //Display Y
      element.innerText = "O";
      element.disabled = true;
    }
    //Increment on each click
    count += 1;
    if (count == 9) {
      drawFunction();
    }
    //winner check
    winChecker();
  });
});
//Enable Buttons and disable popup on page load
window.onload = enableButtons;