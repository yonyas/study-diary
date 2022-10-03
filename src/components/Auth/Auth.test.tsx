import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Auth from './Auth'

test('display login page', async () => {
  render(<Auth />)

  await screen.findByRole('email')

  expect(screen.getByRole('email')).toBeInTheDocument()
})
