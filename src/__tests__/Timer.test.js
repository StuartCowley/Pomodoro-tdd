import React from "react"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import Timer from "../components/Timer/Timer"
import { advanceJestTimersByTime } from "./helpers"

beforeEach(() => {
  jest.mock().resetAllMocks
  jest.useFakeTimers()
})

afterEach(() => {
  jest.useRealTimers()
})

describe("Timer component", () => {
  it("Renders single heading with correct text", () => {
    render(<Timer />)

    expect(screen.getByTestId("timerContainer")).toBeInTheDocument()
  })

  it("Should render instances of the TimerButton component", () => {
    render(<Timer />)

    expect(screen.getAllByTestId("timerButtonContainer")).toHaveLength(3)
  })

  it("Assert correct initial time is displayed", () => {
    render(<Timer />)
    const timeDisplayContainer = screen.getByTestId("timeDisplayContainer")
    const time = screen.getByText("25:00")

    expect(timeDisplayContainer).toBeInTheDocument()
    expect(time).toBeInTheDocument()
  })

  it("Assert timer counts down by correct interval when starting timer", async () => {
    render(<Timer />)

    const initialTime = screen.getByText("25:00")
    const startTimerButton = screen.getByText("Start")

    expect(initialTime).toBeInTheDocument()

    fireEvent.click(startTimerButton)

    advanceJestTimersByTime(1000, 60)

    await waitFor(() => expect(screen.getByText("24:00")).toBeInTheDocument())
  })

  it("Assert multiple clicks of start timer have no effect on running timer", () => {
    render(<Timer />)
    const initialTime = screen.getByText("25:00")
    expect(initialTime).toBeInTheDocument()

    const startTimerButton = screen.getByText("Start")
    fireEvent.click(startTimerButton)

    advanceJestTimersByTime(1000, 30)
    expect(screen.getByText("24:30")).toBeInTheDocument()

    fireEvent.click(startTimerButton)
    advanceJestTimersByTime(1000, 10)
    expect(screen.getByText("24:20")).toBeInTheDocument()
  })

  it("Assert stop button freezes time", () => {
    render(<Timer />)
    const initialTime = screen.getByText("25:00")
    expect(initialTime).toBeInTheDocument()

    const startTimerButton = screen.getByText("Start")
    fireEvent.click(startTimerButton)

    advanceJestTimersByTime(1000, 30)
    const stopTimerButton = screen.getByText("Stop")
    fireEvent.click(stopTimerButton)

    const stoppedTime = screen.getByText("24:30")
    expect(stoppedTime).toBeInTheDocument()

    advanceJestTimersByTime(1000, 30)
    expect(stoppedTime).toBeInTheDocument()
  })

  it("Assert timer stops at 00:00", () => {
    render(<Timer />)
    const initialTime = screen.getByText("25:00")
    expect(initialTime).toBeInTheDocument()

    const startTimerButton = screen.getByText("Start")
    fireEvent.click(startTimerButton)

    advanceJestTimersByTime(1000, 60 * 26)

    const updatedTime = screen.getByText("00:00")
    expect(updatedTime).toBeInTheDocument()
  })

  it("Assert reset button stops timer and resets to initial time", async () => {
    render(<Timer />)
    const initialTime = screen.getByText("25:00")
    const startTimerButton = screen.getByText("Start")
    const resetButton = screen.getByText("Reset")

    expect(initialTime).toBeInTheDocument()

    fireEvent.click(startTimerButton)
    advanceJestTimersByTime(1000, 5)

    const updatedTime = await screen.findByText("24:55")
    expect(updatedTime).toBeInTheDocument()

    fireEvent.click(resetButton)
    const resettedTime = screen.getByText("25:00")
    expect(resettedTime).toBeInTheDocument()

    advanceJestTimersByTime(1000, 20)
    expect(resettedTime).toBeInTheDocument()
  })
})
