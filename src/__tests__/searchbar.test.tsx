import React from 'react'
// import { rest } from 'msw'
// import { setupServer } from 'msw/node'
import { render, waitForElementToBeRemoved, screen } from '~/test-utils'
import '@testing-library/jest-dom'
import { SearchBar } from '~/components/searchbar'
import userEvent from '@testing-library/user-event'

describe('Search Bar', () => {
  it('displays search results', async () => {
    const mockdata = ['fubar', 'bohica']

    const getSearchResults = jest.fn().mockImplementation((qstr: string) => {
      if (qstr === '') return { tags: [] }
      return { tags: mockdata.filter(s => s.includes(qstr)) }
    })

    const selectTag = jest.fn().mockImplementation(async (tag: string) => {
      return { status: 200 }
    })

    render(<SearchBar getSearchResults={getSearchResults} selectTag={selectTag} />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText('Search for tags'), 'fubar')
    const fubar = await screen.findByRole('button', { name: /fubar/i, })
    await user.click(fubar)
    waitForElementToBeRemoved(fubar)
    const bohica = screen.queryByRole('button', { name: /bohica/i })
    expect(bohica).not.toBeInTheDocument()
  })
})