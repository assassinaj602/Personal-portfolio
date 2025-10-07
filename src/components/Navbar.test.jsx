import { render, screen } from '@testing-library/react'
import React from 'react'
import Navbar from './Navbar'

it('renders nav links', () => {
  render(<Navbar />)
  expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument()
})
