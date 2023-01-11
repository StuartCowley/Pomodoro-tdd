import React, { useEffect, useRef, useState } from "react"
import TimerButton from "../TimerButton/TimerButton"
import "./timer.css"

const Timer = () => {
  const initialState = {
    minutes: 25,
    seconds: 0,
    isOn: false,
  }
  const [timerData, setTimerData] = useState(initialState)

  // custom hook
  function useInterval(callback, delay) {
    const savedCallback = useRef()

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current()
      }
      if (timerData.isOn) {
        let id = setInterval(tick, delay)
        return () => clearInterval(id)
      }
    }, [timerData.isOn, timerData.minutes, timerData.seconds])
  }

  useInterval(() => {
    if (timerData.seconds === 0) {
      console.log("seconds === 0")
      if (timerData.minutes === 0) {
        console.log("seconds === 0 && minutes === 0")
        setTimerData({ ...timerData, isOn: false })
      } else {
        console.log("x minutes & 0 seconds")
        setTimerData({
          ...timerData,
          minutes: timerData.minutes - 1,
          seconds: 59,
        })
      }
    } else {
      setTimerData({ ...timerData, seconds: timerData.seconds - 1 })
      console.log("seconds > 0")
    }
    console.log("callback", JSON.stringify(timerData))
  }, 1000)

  const displayedTime = `${
    timerData.minutes >= 10 ? timerData.minutes : `0${timerData.minutes}`
  }:${timerData.seconds >= 10 ? timerData.seconds : `0${timerData.seconds}`}`

  const startTimer = () => {
    setTimerData({ ...timerData, isOn: true })
  }

  const stopTimer = () => {
    setTimerData({ ...timerData, isOn: false })
  }

  const resetTimer = () => {
    setTimerData(initialState)
  }

  return (
    <div className="timer__container" data-testid="timerContainer">
      <div className="timer__time-display" data-testid="timeDisplayContainer">
        {displayedTime}
      </div>
      <div className="timer__button-wrap">
        <TimerButton buttonAction={startTimer} buttonValue="Start" />
        <TimerButton buttonAction={stopTimer} buttonValue="Stop" />
        <TimerButton buttonAction={resetTimer} buttonValue="Reset" />
      </div>
    </div>
  )
}

export default Timer
