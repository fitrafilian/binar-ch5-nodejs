const playerRock = document.querySelector("#player .box-rock"),
  playerPaper = document.querySelector("#player .box-paper"),
  playerScissor = document.querySelector("#player .box-scissor"),
  panel = document.querySelector(".panel"),
  boxes = document.querySelectorAll("#player .box"),
  refresh = document.querySelector(".refresh");

// Start
const start = function () {
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

  //   Engine v-2 --> for all player's options
  const start2 = function () {
    playerRock.addEventListener("click", function () {
      const computer = getComputer();
      const player = document.querySelector(".rock").className;
      const generate = rules(computer, player);
      console.log("comp:" + computer);
      console.log("player:" + player);
      console.log("hasil:" + generate);

      //   image computer
      const fixComputer = document.querySelector(".computer .box-" + computer);
      box(fixComputer);

      // image player
      box(playerRock);

      // panel
      panel.style.color = "white";
      panel.style.backgroundColor = "#4C9654";
      panel.style.fontSize = "30px";
      panel.style.transform = "rotate(-28.87deg)";
      if (generate == playerWin) {
        panel.innerHTML = playerWin;
      } else if (generate == computerWin) {
        panel.innerHTML = computerWin;
      } else {
        panel.innerHTML = draw;
      }

      playerRock.disabled = true;
      playerPaper.disabled = true;
      playerScissor.disabled = true;
    });

    playerPaper.addEventListener("click", function () {
      const computer = getComputer();
      const player = document.querySelector(".paper").className;
      const generate = rules(computer, player);
      console.log("comp:" + computer);
      console.log("player:" + player);
      console.log("hasil:" + generate);

      //   image computer
      const fixComputer = document.querySelector(".computer .box-" + computer);
      box(fixComputer);

      // image player
      box(playerPaper);

      // panel
      panel.style.color = "white";
      panel.style.backgroundColor = "#4C9654";
      panel.style.fontSize = "30px";
      panel.style.transform = "rotate(-28.87deg)";
      if (generate == playerWin) {
        panel.innerHTML = playerWin;
      } else if (generate == computerWin) {
        panel.innerHTML = computerWin;
      } else {
        panel.innerHTML = draw;
      }

      playerRock.disabled = true;
      playerPaper.disabled = true;
      playerScissor.disabled = true;
    });

    playerScissor.addEventListener("click", function () {
      const computer = getComputer();
      const player = document.querySelector(".scissor").className;
      const generate = rules(computer, player);
      console.log("comp:" + computer);
      console.log("player:" + player);
      console.log("hasil:" + generate);

      //   image computer
      const fixComputer = document.querySelector(".computer .box-" + computer);
      box(fixComputer);

      // image player
      box(playerScissor);

      // panel
      panel.style.color = "white";
      panel.style.backgroundColor = "#4C9654";
      panel.style.fontSize = "30px";
      panel.style.transform = "rotate(-28.87deg)";
      if (generate == playerWin) {
        panel.innerHTML = playerWin;
      } else if (generate == computerWin) {
        panel.innerHTML = computerWin;
      } else {
        panel.innerHTML = draw;
      }

      playerRock.disabled = true;
      playerPaper.disabled = true;
      playerScissor.disabled = true;
    });
    if (true) {
      return;
    }
  };
  start2();
  // end of engine v-2
};

start();

refresh.addEventListener("click", function () {
  start();
});
