import React from 'react'
// import { rest } from 'msw'
// import { setupServer } from 'msw/node'
import { render, waitForElementToBeRemoved, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SearchBar } from '~/components/searchbar'
import userEvent from '@testing-library/user-event'

describe('Search Bar', () => {
  it('displays search results', async () => {
    render(<SearchBar />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText('Search for tags'), 'fubar')
    const fubar = await screen.findByRole('button', { name: /fubar/i, })
    await user.click(fubar)
    waitForElementToBeRemoved(fubar)
    const bohica = screen.queryByRole('button', { name: /bohica/i })
    expect(bohica).not.toBeInTheDocument()
  })
})