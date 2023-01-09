import React, { useState } from "react"
import TimerButton from "../TimerButton/TimerButton"
import "./timer.css"

const Timer = () => {
  const initialState = {
    minutes: 25,
    seconds: 0,
    isOn: false,
  }
  const [timerData, setTimerData] = useState(initialState)

  const startTimer = () => {
    console.log("Starting timer.")
  }

  const stopTimer = () => {
    console.log("Stopping timer.")
  }

  const resetTimer = () => {
    console.log("Resetting timer.")
  }

  return (
    <div className="timer__container" data-testid="timerContainer">
      <TimerButton buttonAction={startTimer} buttonValue="Start" />
      <TimerButton buttonAction={stopTimer} buttonValue="Stop" />
      <TimerButton buttonAction={resetTimer} buttonValue="Reset" />
    </div>
  )
}

export default Timer
