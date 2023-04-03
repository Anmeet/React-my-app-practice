import { render, screen } from '@testing-library/react'
import App from './App'

export const sumPositiveNumbers = (num1: number, num2: number) => {
  return num1 + num2
}
test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})

describe('when the argument passed are positive numbers', () => {
  test('should return the right answer', () => {
    expect(sumPositiveNumbers(4, 5)).toBe(9)
  })
})
