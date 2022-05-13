const canvas = document.querySelector("#draw");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round"; // end of the line
ctx.lineCap = "round"; // a line meets another line
ctx.lineWidth = 20;
ctx.globalCompositeOperation = 'lighten';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  console.log(e);
  if (!isDrawing) return;
  ctx.strokeStyle = `hsl(${hue},100%, 50%, .9)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY); // start from
  ctx.lineTo(e.offsetX, e.offsetY); // go to
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  lastX = e.offsetX;
  lastY = e.offsetY;
  hue += 2;

  if (hue >= 360) {
    hue = 5;
  }

  if (ctx.lineWidth >= 20 || ctx.lineWidth <= 5) {
    direction = !direction;
  } if(direction) {
    ctx.lineWidth++;
  }else {
    ctx.lineWidth--;
  }
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
