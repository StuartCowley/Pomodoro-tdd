import React from "react"
import { render, screen } from "@testing-library/react"
import App from "../components/App/App"

describe("App component", () => {
  it("Renders title", () => {
    render(<App />)
    const linkElement = screen.getByText(/some title/i)

    expect(linkElement).toBeInTheDocument()
  })
})
