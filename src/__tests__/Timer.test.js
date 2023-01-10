import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import Timer from "../components/Timer/Timer"

describe("Timer component", () => {
  it("Renders single heading with correct text", () => {
    render(<Timer />)

    expect(screen.getByTestId("timerContainer")).toBeInTheDocument()
  })

  it("Should render instances of the TimerButton component", () => {
    render(<Timer />)

    expect(screen.getAllByTestId("timerButtonContainer")).toHaveLength(3)
  })

  it("Assert click handler is called clicking each of the buttons", () => {
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

  it("Assert timer counts down by correct interval when starting timer", () => {
    jest.useFakeTimers()
    render(<Timer />)
    const initialTime = screen.getByText("25:00")
    const startTimerButton = screen.getByText("Start")

    expect(initialTime).toBeInTheDocument()

    fireEvent.click(startTimerButton)
    jest.advanceTimersByTime(10000)
    const updatedTime = screen.getByText("24:50")
    expect(updatedTime).toBeInTheDocument()

    jest.advanceTimersByTime(60000)
    const updatedTime1 = screen.getByText("23:50")
    expect(updatedTime1).toBeInTheDocument()
  })

  it("Assert multiple clicks of start timer have no effect on running timer", () => {
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

  it("Assert stop button freezes time", () => {
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

  it("Assert timer stops at 00:00", () => {
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

  it("Assert reset button stops timer and resets to initial time", () => {
    jest.useFakeTimers()
    render(<Timer />)
    const initialTime = screen.getByText("25:00")
    const startTimerButton = screen.getByText("Start")

    expect(initialTime).toBeInTheDocument()

    fireEvent.click(startTimerButton)
    jest.advanceTimersByTime(10000)
    const timeUpdate1 = screen.getByText("24:50")
    expect(timeUpdate1).toBeInTheDocument()

    const resetButton = screen.getByText("Reset")
    fireEvent.click(resetButton)
    const resettedTime = screen.getByText("25:00")
    expect(resettedTime).toBeInTheDocument()

    jest.advanceTimersByTime(5000)
    expect(resettedTime).toBeInTheDocument()
  })
})
