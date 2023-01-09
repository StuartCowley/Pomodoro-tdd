import React from "react"
import { render, screen } from "@testing-library/react"
import Timer from "../components/Timer/Timer"

it("Renders single heading with correct text", () => {
  render(<Timer />)

  expect(screen.getByTestId("timerContainer")).toBeInTheDocument()
})

it("Should render instances of the TimerButton component", () => {
  render(<Timer />)

  expect(screen.getAllByTestId("timerButtonContainer")).toHaveLength(3)
})
