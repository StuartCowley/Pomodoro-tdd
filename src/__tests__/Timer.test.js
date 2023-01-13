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

  xit("Assert click handler is called clicking each of the buttons", () => {
    render(<Timer />)

    const startTimerButton = screen.getByText("Start")
    const stopTimerButton = screen.getByText("Stop")
    const resetTimerButton = screen.getByText("Reset")
    fireEvent.click(startTimerButton)
    fireEvent.click(stopTimerButton)
    fireEvent.click(resetTimerButton)

    expect(startTimerFunction).toHaveBeenCalledTimes(1)
    expect(stopTimerFunction).toHaveBeenCalledTimes(1)
    expect(resetTimerFunction).toHaveBeenCalledTimes(1)
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

  xit("Assert multiple clicks of start timer have no effect on running timer", () => {
    jest.useFakeTimers()
    render(<Timer />)
    const initialTime = screen.getByText("25:00")
    expect(initialTime).toBeInTheDocument()

    const startTimerButton = screen.getByText("Start")
    fireEvent.click(startTimerButton)

    jest.advanceTimersByTime(30000)
    const updatedTime = screen.getByText("24:30")
    expect(updatedTime).toBeInTheDocument()

    fireEvent.click(startTimerButton)
    jest.advanceTimersByTime(30000)
    expect(updatedTime).toBeInTheDocument()
  })

  xit("Assert stop button freezes time", () => {
    jest.useFakeTimers()
    render(<Timer />)
    const initialTime = screen.getByText("25:00")
    expect(initialTime).toBeInTheDocument()

    const startTimerButton = screen.getByText("Start")
    fireEvent.click(startTimerButton)

    jest.advanceTimersByTime(30000)
    const stoppedTime = screen.getByText("24:30")
    expect(stoppedTime).toBeInTheDocument()

    jest.advanceTimersByTime(30000)
    expect(stoppedTime).toBeInTheDocument()
  })

  xit("Assert timer stops at 00:00", () => {
    jest.useFakeTimers()
    render(<Timer />)
    const initialTime = screen.getByText("25:00")
    expect(initialTime).toBeInTheDocument()

    const startTimerButton = screen.getByText("Start")
    fireEvent.click(startTimerButton)

    jest.advanceTimersByTime(1000 * 60 * 26)
    const updatedTime = screen.getByText("00:00")
    expect(updatedTime).toBeInTheDocument()
  })

  xit("Assert reset button stops timer and resets to initial time", async () => {
    render(<Timer />)
    const initialTime = screen.getByText("25:00")
    const startTimerButton = screen.getByText("Start")
    const resetButton = screen.getByText("Reset")

    expect(initialTime).toBeInTheDocument()

    fireEvent.click(startTimerButton)
    act(() => {
      advanceTimersByTime(5000)
    })
    const updatedTime = await screen.findByText("24:55")
    expect(updatedTime).toBeInTheDocument()

    fireEvent.click(resetButton)
    const resettedTime = screen.getByText("25:00")
    expect(resettedTime).toBeInTheDocument()

    act(() => {
      advanceTimersByTime(1000)
    })
    expect(resettedTime).toBeInTheDocument()
  })
})
