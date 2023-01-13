# Pomodoro timer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It is an exercise in learning TDD together with React

## A note on testing setInterval usage with Jest
The tests were written with the standard RTL methodology of asserting that the expected elements are rendered in the DOM given a set of events have occurred. The component under test (`<Timer />`) simply counts down from a given number, so the tests were written to assert that after a given amount of time the counter would have moved by the expected amount.

Tests were written with this in mind using jests fake timers:

```
it("Assert timer counts down by correct interval when starting timer", async () => {
  render(<Timer />)

  const initialTime = screen.getByText("25:00")
  const startTimerButton = screen.getByText("Start")

  expect(initialTime).toBeInTheDocument()

  fireEvent.click(startTimerButton)
  act(() => {
    jest.advanceTimersByTime(30000)
  })
  const updatedTime = screen.getByText("24:30")

  expect(updatedTime).toBeInTheDocument()
})
```

The component was subsequently built using `setInterval` to update the timers values once every second, and running the above test resulted in the time rendered to the component never being lower than 1 second under the initial value regardless of the time passed to `jest.advanceTimersByTime()`. Further investigation into the calling of the `useInterval()` function called showed that:
- the correct lines to update state were being reached, but the component was only re-rendering once after all these loops of the `setInterval` function despite the number of updates to state that were supposedly triggered
- altering the time passed to `setInterval` (`i`) to be less than 500ms showed that the time was advancing by amounts roughly equivalent to `1 % i`
- the component only re-renders once for each tick of the `setInterval` function that occurs under the time passed to `jest.advanceTimersByTime()`


From this it appears that for each call of `jest.advanceTimersByTime()` only one iteration of the `setInterval` function can be moved through, and so the only way I found to move the interval forward by the correct amount of time is to call advanceTimersByTime repeatedly. This has been added to the repo as a helper function `advanceJestTimersByTime` and allows for assertions about the time to be made at any point.


## Available Scripts

Run the app in the development mode:

```
npm start
```

Launch the test runner in the interactive watch mode:

```
npm test
```

Run test coverage report:
```
test:coverage
```

Run eslint and output errors to terminal only:

```
lint
```

Run eslint and fix errors automatically where possible:
```
lint:fix
```

Run prettier and output errors to terminal only
```
prettier
```

Run prettier on all files in `src` directory with extensions `.js`, `.css`

```
prettier:fix
```
