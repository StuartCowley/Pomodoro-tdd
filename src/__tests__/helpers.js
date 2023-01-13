import { act } from "@testing-library/react"

export const advanceJestTimersByTime = (increment, iterations) => {
  for (let i = 0; i < iterations; i++) {
    act(() => {
      jest.advanceTimersByTime(increment)
    })
  }
}
