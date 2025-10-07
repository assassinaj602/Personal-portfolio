import { render } from '@testing-library/react'
import React from 'react'
import ProjectsGrid from './ProjectsGrid'

it('renders without crashing', () => {
  render(<ProjectsGrid />)
  expect(true).toBe(true)
})
