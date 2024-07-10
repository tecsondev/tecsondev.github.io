function getTime() {

let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let seconds = date.getSeconds();
let time = `${hours}:${minutes}:${seconds}`;

document.getElementById("time").innerHTML = time;};

function emailReveal() {
  document.getElementById("email").innerHTML = "tecsondev@gmail.com -";
};

function emailClear() {
  document.getElementById("email").innerHTML = "email +";
}

getTime();
setInterval(getTime, 1000);