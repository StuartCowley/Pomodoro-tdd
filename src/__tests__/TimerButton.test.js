import React from "react"
import { render, screen } from "@testing-library/react"
import TimerButton from "../components/TimerButton/TimerButton"

describe("TimerButton", () => {
  const validProps = {
    buttonAction: jest.fn(),
    buttonValue: "Some label",
  }

  it("Should render a button", () => {
    render(
      <TimerButton
        buttonAction={validProps.buttonAction}
        buttonValue={validProps.buttonValue}
      />,
    )

    expect(screen.getByTestId("timerButtonContainer")).toBeInTheDocument()
    expect(screen.getByText(validProps.buttonValue)).toBeInTheDocument()
  })
})
