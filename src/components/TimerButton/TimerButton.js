import React from "react"
import PropTypes from "prop-types"

const TimerButton = ({ buttonAction, buttonValue }) => {
  return (
    <div onClick={buttonAction} data-testid="timerButtonContainer">
      {buttonValue}
    </div>
  )
}

TimerButton.propTypes = {
  buttonAction: PropTypes.func.isRequired,
  buttonValue: PropTypes.string.isRequired,
}

export default TimerButton
