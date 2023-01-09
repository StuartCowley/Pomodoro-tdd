import React from "react"
import { render, screen } from "@testing-library/react"
import App from "../components/App/App"
import Timer from "../components/Timer/Timer"

describe("App component", () => {
  it("Renders single heading with correct text", () => {
    render(<App />)

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1)
    expect(screen.getByRole("heading", { name: "Pomodoro timer" }))
  })

  it("Renders the timer component", () => {
    render(<App />)

    expect(screen.getByTestId("test-timer")).toBeInTheDocument()
  })
})
