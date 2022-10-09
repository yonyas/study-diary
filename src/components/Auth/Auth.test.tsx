import { ReactElement } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Auth from '.'

function setup(jsx: ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}

function setup(jsx: ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}

test('display login page', async () => {
  render(<Auth />)

  const emailInput = await screen.findByLabelText('email')

  expect(emailInput).toBeInTheDocument()
})

test('enter email input', async () => {
  render(<Auth />)

  const emailInput = await screen.findByLabelText('email')

  const { user } = setup(<Auth />)
  await user.type(emailInput, 'aaa@gmail.com')

  expect(screen.getByDisplayValue('aaa@gmail.com')).toBeInTheDocument()
})
