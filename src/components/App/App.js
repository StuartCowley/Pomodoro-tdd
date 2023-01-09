import React from "react"
import Timer from "../Timer/Timer"
import "./app.css"

const App = () => {
  return (
    <div className="app__container">
      <h1>Pomodoro timer</h1>
      <Timer />
    </div>
  )
}

export default App
