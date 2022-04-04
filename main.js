"use strict";
let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

/* Load images */
let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeDown = new Image();

bird.src = "./images/dev-code.png";
bg.src = "./images/background.png";
fg.src = "./images/bottom-background.png";
pipeUp.src = "./images/pipe-up.png";
pipeDown.src = "./images/pipe-down.png";

/* Variables */
let gap = 85;
let constant;
let bX = 10;
let bY = 150;
let gravity = 1.5;
let score = 0;

/* Event Listener */
document.addEventListener("keydown", moveUp);
function moveUp() {
  bY -= 30;
}

/* Pipe Coordinates */
let pipe = [];
pipe[0] = {
  x: cvs.width,
  y: -100,
};

/* Draw images */
function draw() {
  ctx.drawImage(bg, 0, 0);
  for (let i = 0; i < pipe.length; i++) {
    constant = pipeUp.height + gap;
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + constant);
    pipe[i].x--;
    if (pipe[i].x == 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
      });
    }

    /* Detect collisions */
    if (
      (bX + bird.width >= pipe[i].x &&
        bX <= pipe[i].x + pipeUp.width &&
        (bY <= pipe[i].y + pipeUp.height ||
          bY + bird.height >= pipe[i].y + constant)) ||
      bY + bird.height >= cvs.height - fg.height
    ) {
      location.reload();
    }
    if (pipe[i].x == 5) {
      score++;
    }
  }
  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, bX, bY);
  bY += gravity;
  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score : " + score, 10, cvs.height - 20);
  requestAnimationFrame(draw);
}
draw();
