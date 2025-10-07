import { render, screen } from '@testing-library/react'
import React from 'react'
import Hero from './Hero'

it('shows CTA buttons', () => {
  render(<Hero />)
  expect(screen.getByRole('link', { name: /view projects/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
})
