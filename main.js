const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const radius = 100;
const diameter = 2 * radius;
const height = Math.sqrt(diameter * diameter - radius * radius);
const precision = 6;

let color = [];
let temp = [];
let randomPrecision = [];
let randomSize = [];

function draw(centerX, centerY, index) {
  let startX = centerX + radius;
  let startY = centerY;

  if (index == 1) {
    for (let i = 0; i < radius / 4; i++) {
      color.push(getRandomColor());
    }

    for (let j = 0; j < radius / 4; j++) {
      randomSize.push(getRandomSize());
    }

    for (let k = 0; k < radius / 4; k++) {
      randomPrecision.push(getRandomPrecision());
    }
  }

  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context.lineWidth = 1;
  context.strokeStyle = "#333";
  context.stroke();
  context.closePath();

  for (let i = 1; i <= precision; i++) {
    const alpha = (2 * Math.PI * i) / precision;

    let x = centerX + radius * Math.cos(alpha);
    let y = centerY + radius * Math.sin(alpha);

    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(x, y);
    context.lineTo(centerX, centerY);
    context.moveTo(startX, startY);
    context.lineWidth = 1;
    context.strokeStyle = "#333";
    context.stroke();
    context.closePath();

    startX = x;
    startY = y;
  }

  for (let j = 0; j <= radius / 4; j++) {
    for (let k = 1; k <= precision; k++) {
      const alpha = (2 * Math.PI * k) / precision + randomPrecision[j];
      let x = centerX + 3.62 * (j * Math.cos(alpha));
      let y = centerY + 3.62 * (j * Math.sin(alpha));

      context.moveTo(centerX, centerY);
      context.beginPath();
      context.arc(x, y, randomSize[j], 0, 2 * Math.PI, false);
      context.fillStyle = color[j];
      context.strokeStyle = color[j];
      context.fill();
      context.stroke();
      context.closePath();

      context.moveTo(centerX, centerY);
      context.beginPath();
      context.arc(
        x,
        centerY - (y - centerY),
        randomSize[j],
        0,
        2 * Math.PI,
        false
      );
      context.fillStyle = color[j];
      context.strokeStyle = color[j];
      context.fill();
      context.stroke();
      context.closePath();
    }
    j++;
  }
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomSize() {
  return Math.floor(Math.random() * 7) + 3;
}

function getRandomPrecision() {
  return Math.random();
}

function initialise() {
  draw(centerX, centerY, 1);
  draw(centerX, centerY - height, 2);
  draw(centerX, centerY + height, 3);
  draw(centerX + 1.5 * radius, centerY - 0.5 * height, 4);
  draw(centerX + 1.5 * radius, centerY + 0.5 * height, 5);
  draw(centerX - 1.5 * radius, centerY + 0.5 * height, 6);
  draw(centerX - 1.5 * radius, centerY - 0.5 * height, 7);
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    context.clearRect(0, 0, canvas.width, canvas.height);
    color = [];
    randomSize = [];
    randomPrecision = [];
    initialise();
  }
});

initialise();
