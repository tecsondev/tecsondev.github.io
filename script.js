function getTime() {

let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let seconds = date.getSeconds();
let time = `${hours}:${minutes}:${seconds}`;

document.getElementById("time").innerHTML = time;
setInterval(getTime, 1000);
};

getTime();



