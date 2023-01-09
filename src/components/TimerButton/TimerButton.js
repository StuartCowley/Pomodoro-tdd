import React from "react"
import PropTypes from "prop-types"
import "./timer-button.css"

const TimerButton = ({ buttonAction, buttonValue }) => {
  return (
    <div
      className="button__container"
      onClick={buttonAction}
      data-testid="timerButtonContainer"
    >
      <p className="button__value">{buttonValue}</p>
    </div>
  )
}

TimerButton.propTypes = {
  buttonAction: PropTypes.func.isRequired,
  buttonValue: PropTypes.string.isRequired,
}

export default TimerButton
