const playerRock = document.querySelector("#player .box-rock"),
  playerPaper = document.querySelector("#player .box-paper"),
  playerScissor = document.querySelector("#player .box-scissor"),
  computerRock = document.querySelector("#computer .box-rock"),
  computerPaper = document.querySelector("#computer .box-paper"),
  computerScissor = document.querySelector("#computer .box-scissor"),
  panel = document.querySelector(".panel"),
  boxes = document.querySelectorAll("#player button"),
  boxesComputer = document.querySelectorAll("#computer .box"),
  refresh = document.querySelector(".refresh");

// Start
var start = function () {
  // Initial condition
  panel.style.color = "#bd0000";

  for (let i = 0; i < 3; i++) {
    boxes[i].classList.add("box-hover");
    boxes[i].classList.add("box-active");
    // boxes[i].classList.toggle("box-style");
  }

  refresh.classList.add("box-hover");
  refresh.classList.add("box-active");
  refresh.classList.add("box");
  // End of initial condition

  // function to get computer's choice
  const getComputer = function () {
    const comp = Math.floor(Math.random() * 3) + 1;
    if (comp == 1) {
      return "rock";
    } else if (comp == 2) {
      return "paper";
    } else {
      return "scissor";
    }
  };
  // end of computer's choice function

  // Rules
  const draw = "draw",
    playerWin = "you<br>win",
    computerWin = "com<br>win";

  const rules = function (comp, player) {
    if (comp == player) {
      return draw;
    } else if (player == "rock" && comp == "scissor") {
      return playerWin;
    } else if (player == "paper" && comp == "rock") {
      return playerWin;
    } else if (player == "scissor" && comp == "paper") {
      return playerWin;
    } else {
      return computerWin;
    }
  };
  // end of rules

  // function to make boxes
  const box = function (element) {
    // element.addEventListener("mouseout", function () {
    //   element.style.backgroundColor = "#c4c4c4";
    // });
    element.style.backgroundColor = "#c4c4c4";
    element.style.borderRadius = "10px";
    element.style.width = "100px";
    element.style.boxShadow = "0 0 5px 5px rgba(0, 0, 0, 0.3)";
  };

  // function to unbox
  const unbox = function (element) {
    element.style.removeProperty("box-shadow");
    element.style.removeProperty("background-color");
    element.style.removeProperty("border-radius");
  };
  // end of boxes function

  // Rolling
  function rolling() {
    const listClass = ["rock", "paper", "scissor"];
    let i = 0;
    const startTime = new Date().getTime();

    setInterval(function () {
      if (new Date().getTime() - startTime > 1200) {
        clearInterval;
        return;
      }

      // var audio = new Audio("audio/rolling.mp3");
      // audio.play();

      const computerChoice = document.querySelector("#computer .box-" + listClass[i++]);
      if (i == listClass.length) i = 0;

      setTimeout(() => {
        box(computerChoice);
      }, 100);

      unbox(computerChoice);
    }, 100);
  }

  // Engine
  boxes.forEach(function (i) {
    i.addEventListener("click", function () {
      const computer = getComputer();
      const player = i.querySelector("img").className;
      const generate = rules(computer, player);
      console.log("comp:" + computer);
      console.log("player:" + player);
      console.log("hasil:" + generate);

      // image player
      box(i);

      playerRock.setAttribute("disabled", true);
      playerPaper.setAttribute("disabled", true);
      playerScissor.setAttribute("disabled", true);

      // Rolling effect
      rolling();

      setTimeout(() => {
        //   image computer
        boxesComputer.forEach(function (i) {
          i.style.removeProperty("box-shadow");
          i.style.removeProperty("background-color");
          i.style.removeProperty("border-radius");
        });

        var lockedComputer = NaN;
        lockedComputer = document.querySelector("#computer .box-" + computer);
        box(lockedComputer);

        setTimeout(() => {
          // panel
          panel.style.color = "white";
          // panel.style.backgroundColor = "#4C9654";
          panel.style.fontSize = "30px";
          panel.style.transform = "rotate(-28.87deg)";
          panel.style.boxShadow = "0 0 5px 5px rgba(0, 0, 0, 0.3)";

          if (generate == playerWin) {
            panel.innerHTML = playerWin;
            panel.style.backgroundColor = "#4C9654";
          } else if (generate == computerWin) {
            panel.innerHTML = computerWin;
            panel.style.backgroundColor = "#bd0000";
          } else {
            panel.innerHTML = draw;
            panel.style.backgroundColor = "#ffae42";
          }
        }, 0);

        // setTimeout(() => {
        //   // panel
        //   panel.style.color = "white";
        //   panel.style.backgroundColor = "#4C9654";
        //   panel.style.fontSize = "30px";
        //   panel.style.transform = "rotate(-28.87deg)";
        //   panel.style.boxShadow = "0 0 5px 5px rgba(0, 0, 0, 0.3)";

        //   if (generate == playerWin) {
        //     panel.innerHTML = playerWin;
        //   } else if (generate == computerWin) {
        //     panel.innerHTML = computerWin;
        //   } else {
        //     panel.innerHTML = draw;
        //   }
        // }, 0);
      }, 1300);
    });
  });
  // end of engine
};

start();

refresh.addEventListener("click", function () {
  // window.location.reload();
  // Reset player's boxes
  boxes.forEach(function (i) {
    i.style.removeProperty("box-shadow");
    i.style.removeProperty("background-color");
  });

  // Reset computer's boxes
  boxesComputer.forEach(function (i) {
    i.style.removeProperty("box-shadow");
    i.style.removeProperty("background-color");
    i.style.removeProperty("border-radius");
  });

  // Reset panel's boxes
  panel.style.removeProperty("box-shadow");
  panel.style.removeProperty("background-color");
  panel.style.removeProperty("transform");
  // panel.style.fontSize = "100px";
  panel.innerHTML = "VS";

  // Panel Responsiveness
  const media768 = window.matchMedia("(min-width: 768px)");
  const media540 = window.matchMedia("(min-width: 540px)");
  function initialPanelResponsiveness() {
    if (media768.matches) {
      panel.style.fontSize = "100px";
    } else if (media540.matches) {
      panel.style.fontSize = "76px";
    } else {
      panel.style.fontSize = "54px";
    }
  }

  initialPanelResponsiveness();

  // Block clicks
  playerRock.removeAttribute("disabled");
  playerPaper.removeAttribute("disabled");
  playerScissor.removeAttribute("disabled");
  start();
});

/*
// Initial condition
panel.style.color = "#bd0000";

for (let i = 0; i < 3; i++) {
  boxes[i].classList.add("box-hover");
  boxes[i].classList.add("box-active");
}
// End of initial condition

// function to get computer's choice
const getComputer = function () {
  const comp = Math.floor(Math.random() * 3) + 1;
  if (comp == 1) {
    return "rock";
  } else if (comp == 2) {
    return "paper";
  } else {
    return "scissor";
  }
};
// end of computer's choice function

// Rules
const draw = "draw",
  playerWin = "you<br>win",
  computerWin = "com<br>win";

const rules = function (comp, player) {
  if (comp == player) {
    return draw;
  } else if (player == "rock" && comp == "scissor") {
    return playerWin;
  } else if (player == "paper" && comp == "rock") {
    return playerWin;
  } else if (player == "scissor" && comp == "paper") {
    return playerWin;
  } else {
    return computerWin;
  }
};
// end of rules

// function to make boxes
const box = function (element) {
  // element.addEventListener("mouseout", function () {
  //   element.style.backgroundColor = "#c4c4c4";
  // });
  element.style.backgroundColor = "#c4c4c4";
  element.style.borderRadius = "10px";
  element.style.width = "100px";
  element.style.boxShadow = "0 0 5px 5px rgba(0, 0, 0, 0.3)";
};
// end of boxes function

// Mix
const mix = function () {};

// Engine v-2 --> for all player's options

boxes.forEach(function (i) {
  i.addEventListener("click", function () {
    const computer = getComputer();
    const player = i.querySelector("img").className;
    const generate = rules(computer, player);
    console.log("comp:" + computer);
    console.log("player:" + player);
    console.log("hasil:" + generate);

    //   image computer
    const lockedComputer = document.querySelector(".computer .box-" + computer);
    box(lockedComputer);

    // image player
    box(i);

    // panel
    if (generate == playerWin) {
      panel.innerHTML = playerWin;
    } else if (generate == computerWin) {
      panel.innerHTML = computerWin;
    } else {
      panel.innerHTML = draw;
    }
    panel.style.color = "white";
    panel.style.backgroundColor = "#4C9654";
    panel.style.fontSize = "30px";
    panel.style.transform = "rotate(-28.87deg)";
    panel.style.boxShadow = "0 0 5px 5px rgba(0, 0, 0, 0.3)";
  });
});
// end of engine v-2
*/

// // Engine v-1 --> for each player's option
// playerRock.addEventListener("click", function () {
//   const computer = getComputer();
//   const player = document.querySelector(".rock").className;
//   const generate = rules(computer, player);
//   console.log("comp:" + computer);
//   console.log("player:" + player);
//   console.log("hasil:" + generate);

//   //   image computer
//   const fixComputer = document.querySelector(".computer .box-" + computer);
//   box(fixComputer);

//   // image player
//   box(playerRock);

//   // panel
//   if (generate == playerWin) {
//     panel.innerHTML = playerWin;
//   } else if (generate == computerWin) {
//     panel.innerHTML = computerWin;
//   } else {
//     panel.innerHTML = draw;
//   }
//   panel.style.color = "white";
//   panel.style.backgroundColor = "#4C9654";
//   panel.style.fontSize = "30px";
//   panel.style.transform = "rotate(-28.87deg)";
// });

// // this is for initial condition
// boxes.forEach(function (i) {
//   i.addEventListener("mouseover", function () {
//     i.style.width = "100px";
//     i.style.backgroundColor = "#c4c4c4";
//     i.style.borderRadius = "10px";
//     i.style.cursor = "pointer";
//     i.style.transition = "0.3s";
//   });
// });

// boxes.forEach(function (i) {
//   i.addEventListener("mouseout", function () {
//     i.style.width = "100px";
//     i.style.backgroundColor = "";
//     i.style.borderRadius = "10px";
//     i.style.cursor = "pointer";
//     i.style.transition = "0.3s";
//   });
// });
