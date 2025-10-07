import { render, screen } from '@testing-library/react'
import React from 'react'
import App from './App'

it('renders navbar and hero', () => {
  render(<App />)
  expect(screen.getByRole('link', { name: /portfolio/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /view projects/i })).toBeInTheDocument()
})
