import { render, screen } from '@testing-library/react'
import React from 'react'
import ContactForm from './ContactForm'

it('has a submit button', () => {
  render(<ContactForm />)
  expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
})
