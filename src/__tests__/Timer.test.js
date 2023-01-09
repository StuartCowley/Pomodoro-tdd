import React from "react"
import { render, screen } from "@testing-library/react"
import Timer from "../components/Timer/Timer"

it("Renders single heading with correct text", () => {
  render(<Timer />)

  expect(screen.getByTestId("test-timer")).toBeInTheDocument()
})

it("Should render instances of the TimerButton component", () => {
  expect(screen.getAllByTestId("test-timer-button")).toHaveLength(3)
})
