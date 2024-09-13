import React, { useState, useEffect } from "react";

function Pomodoro() {
  const [percentage, setPercentage] = useState(100);
  const [state, setState] = useState(0);
  const [direction, setDirection] = useState("down");
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [minutes, setMinutes] = useState(workTime);
  const [seconds, setSeconds] = useState(0);
  const [workTimeCycleIndex, setWorkTimeCycleIndex] = useState(0);
  const [breakTimeCycleIndex, setBreakTimeCycleIndex] = useState(0);
  const [orientation , setOrientation ] = useState("height");
  const [textIndex , setTextIndex] = useState(0);
  const [coloursIndex , setColoursIndex] = useState(0);

  useEffect(() => {
    if (state === 1) {
      const timer = document.getElementById("timer");
      const interval = setInterval(() => {
        const workModifier = 100 / (60 * workTime);
        const breakModifier = 100 / (60 * breakTime);

        if (minutes === workTime) {
          setDirection("down");
          setMinutes(workTime - 1);
          setSeconds(59);
        }
        if (direction === "down") {
          setPercentage(percentage - workModifier)
          timer.style[orientation] = `${percentage}%`;
          setSeconds(seconds - 1);
          if (seconds <= 0 && direction === "down") {
            setSeconds(59);
            setMinutes(minutes - 1);
          }
        }

        if (minutes <= 0 && seconds <= 1) {
          setPercentage(0);
          setDirection("up");
        }

        if (direction === "up") {

          if (seconds >= 59 && direction === "up") {
            setSeconds(0);
            setMinutes(minutes + 1);
          } else {
            setSeconds(seconds + 1)
            setPercentage(percentage + breakModifier)
            timer.style[orientation] = `${percentage}%`;
          }
          if (minutes === breakTime && seconds === 0 && direction === "up") {
            setPercentage(100);
            setDirection("down");
            setMinutes(workTime);
            setSeconds(0);
          }
        }

        if (percentage > 100) {
          setPercentage(100);
        }
        if (percentage < 0) {
          setPercentage(0);
        }
      }, 1000);

      return () => clearInterval(interval);
    }

  }, [minutes, seconds, percentage, state, direction, workTime, breakTime, workTimeCycleIndex, orientation])

  function reset(event) {
    if (state != 1) {
      const timer = document.getElementById("timer");

      if (direction === "down") {
        setMinutes(workTime);
        setSeconds(0);
        setPercentage(100);
        timer.style[orientation] = `100%`;
      } else if (direction === "up") {
        setMinutes(0);
        setSeconds(0);
        setPercentage(0);
        timer.style[orientation] = `0`;
      }
    }
  }
  
  function startStop(event) {
    if (state === 0) {
      setState(1);
      document.getElementById("dot").innerHTML = "•";
    } else {
      setState(0);
      document.getElementById("dot").innerHTML = "◦";
    }
  }

  function cycleOptions(event) {
    const options = document.getElementById("options");

    if (options.style.display != "flex") {
      options.style.display = "flex";
    } else {
      options.style.display = "none";
    }
  }

  function cycleWorkTime(event) {
    const workTimeArr = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
    const timer = document.getElementById("timer");

    if (state != 1) {
      setPercentage(100);
      timer.style[orientation] = `100%`;
      if (workTimeCycleIndex < workTimeArr.length) {
        setWorkTime(workTimeArr[workTimeCycleIndex]);
        setMinutes(workTimeArr[workTimeCycleIndex]);
        setWorkTimeCycleIndex(workTimeCycleIndex + 1);
        setSeconds(0);
      } else {
        setWorkTimeCycleIndex(0);
        setWorkTime(5);
        setMinutes(5);
      }
    }
  }

  function cycleBreakTime(event) {
    const breakTimeArr = [10, 15, 20, 30];
    const timer = document.getElementById("timer");
    if (state != 1) {
      setPercentage(100);
      timer.style[orientation] = `100%`;
      if (breakTimeCycleIndex < breakTimeArr.length) {
        setBreakTime(breakTimeArr[breakTimeCycleIndex]);
        setBreakTimeCycleIndex(breakTimeCycleIndex + 1);
        setSeconds(0);
      } else {
        setBreakTimeCycleIndex(0);
        setBreakTime(5);
      }
    }
  }

  function cycleText(event) {
    const time = document.getElementById("time");
    const optionsContainer = document.getElementById("options-container")
    const description = document.getElementById("description");
    const timerContainer = document.getElementById("timer-container");
    const resetText = document.getElementById("reset-text");
    const startText = document.getElementById("start-text");
    const optionsText = document.getElementById("options-text");
    const title = document.getElementById("title");

    let options = [ 0 , 1 , 2 ];

    if (textIndex < options.length) {
      switch(textIndex) {
        case 0:
          setTextIndex(textIndex + 1);
          description.style.display = "none";
          resetText.style.display = "none";
          startText.style.display = "none";
          optionsText.style.display = "none";
          title.style.display = "none";
          timerContainer.style.marginTop = "2rem";
          break;
        case 1:
          setTextIndex(textIndex + 1);
          time.style.display = "none";
          description.style.display = "none";
          resetText.style.display = "none";
          startText.style.display = "none";
          optionsText.style.display = "none";
          title.style.display = "none";
          optionsContainer.style.marginTop = "1.25rem";
          timerContainer.style.marginTop = "2rem";
          break;
        case 2:
          setTextIndex(textIndex + 1);
          time.style.display = "block";
          description.style.display = "block";
          resetText.style.display = "block";
          startText.style.display = "block";
          optionsText.style.display = "block";
          title.style.display = "block";
          optionsContainer.style.marginTop = "";
          timerContainer.style.marginTop = "";
        default:
          setTextIndex(0);
          break;
      } 
    }
  }

  function cycleColour(event) {
    const colours = [
      "rgb(25, 130, 230)",
      "rgb(230, 25, 25)", 
      "rgb(230, 149, 25)", 
      "rgb(230, 223, 25)", 
      "rgb(120, 230, 25)",
      "rgb(230, 25, 192)",
      "rgb(25, 230, 207)",
      "rgb(129, 25, 230)"
    ];

      const timer = document.getElementById("timer");

      if (coloursIndex < colours.length) {
        timer.style.background = colours[coloursIndex];
        setColoursIndex(coloursIndex + 1);
      } else {
        setColoursIndex(0);
        timer.style.background = `linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
        linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
        linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)`;
      }
  }


  function cycleBackground(event){
    const htmlDOM = document.getElementById("total");
    const htmlDOMOne = document.getElementById("total-one");
    const timerContainer = document.getElementById("timer-container");

    if (htmlDOM.style.backgroundColor != "black") {
      htmlDOM.style.backgroundColor = "black";
      htmlDOMOne.style.backgroundColor = "black";
      htmlDOM.style.color = "white";
      timerContainer.style.border = "0.4rem, solid, white";
    } else {
      htmlDOM.style.backgroundColor = "white";
      htmlDOMOne.style.backgroundColor = "white";
      htmlDOM.style.color = "black";
      timerContainer.style.border = "0.4rem, solid, black";
    }
  }

  function cycleOrientation(event) {
    const timerContainer = document.getElementById("timer-container");
    const timer = document.getElementById("timer");

    if (timerContainer.style.flexDirection != "row") {
      timer.style.width = `${percentage}%`;
      timerContainer.style.height = "9rem";
      timerContainer.style.width = "16rem";
      setOrientation("width");
      timerContainer.style.flexDirection = "row";
      timer.style.height = `100%`;
    } else {
      timer.style.height = `${percentage}%`;
      timerContainer.style.height = "16rem";
      timerContainer.style.width = "9rem";
      setOrientation("height");
      timerContainer.style.flexDirection = "column";
      timer.style.width = `100%`;
    }
  }

  function restoreDefaults(event) {
    if (state != 1) {
      const timer = document.getElementById("timer");
      setWorkTime(25);
      setBreakTime(5);
      setMinutes(25);
      setSeconds(0);
      setBreakTimeCycleIndex(0);
      setWorkTimeCycleIndex(0);
      setDirection("down");
      setPercentage(100);
      timer.style[orientation] = `100%`;
      
    }
  }

  return (
    <html id="total-one">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </head>
    <div id="container">
      <h1 id="title">Pomodoro Timer</h1>
      <p id="description">This web app uses CSS and React.js to add/reduce levels of the timer below.</p>
      <div id="components">
        <div id="timer-container">
          <div id="timer"></div>
        </div>
        <h2 id="time"> {minutes} : {seconds}</h2>
        <div id="options-container">
          <div id="controls">
            <div id="reset-container">
            <button className="button" id="reset" onClick={reset}>r</button>
            <p id="reset-text">reset</p>
            </div>
            <div id="dot-container">
            <button className="button" id="dot" onClick={startStop} style={{ display: "inline-block" }}>◦</button>
            <p id="start-text">start<br/>stop</p>
            </div>
            <div id="show-options-container">
            <button className="button" id="show-options" onClick={cycleOptions}>~</button>
            <p id="options-text">options</p>
            </div>
          </div>
          <div id="options">
            <h4>Work - {workTime} mins  / Rest - {breakTime} mins</h4>
            <p id="options-note">*timer needs to be stopped to change timer length<br />*changing work and break time resets timer<br />*refresh page to restore global default options</p>
            <div id="options-selections">
              <div id="options-time">
                <button className="option" onClick={cycleWorkTime}>work</button>
                <button className="option" onClick={cycleBreakTime}>break</button>
                <button className="option" onClick={cycleOrientation}>orientation</button>
              </div>
              <div id="options-custom">
                <button className="option" onClick={cycleText}>text</button>
                <button className="option" onClick={cycleColour}>colour</button>
                <button className="option" onClick={cycleBackground}>background</button>
              </div>
            </div>
            <footer>
              <p>The Pomodoro Technique is a time management method in which you do focused work during 25-minute intervals — known as pomodoros — and take a five-minute break. </p>
              <p id="copr">copyright @ tecsondev</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
    </html>
  )
}

export default Pomodoro;