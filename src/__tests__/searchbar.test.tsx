import React from 'react'
// import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, waitForElementToBeRemoved, screen, mswTrpc } from '~/test-utils'
import '@testing-library/jest-dom'
import { SearchBar } from '~/components/searchbar'
import userEvent from '@testing-library/user-event'
import { inferProcedureInput } from '@trpc/server'
import type { AppRouter } from '~/server/api/root'

const mockdata = ['fubar', 'bohica']
const getSearchResults = (qstr: string) => {
  if (qstr === '') return { tags: [] }
  return { tags: mockdata.filter(s => s.includes(qstr)) }
}
const server = setupServer(
  mswTrpc.tags.getSearchResults.query((req, res, ctx) => {
    // ISSUE: https://github.com/maloguertin/msw-trpc/issues/8
    const reqInput = req.getInput() as unknown as {
      0: { json: inferProcedureInput<AppRouter['tags']['getSearchResults']> }
    }
    const { json } = reqInput[0]
    return res(ctx.status(200), ctx.data(getSearchResults(json.qstr)))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Search Bar', () => {
  it('displays search results', async () => {
    const selectTag = jest.fn().mockImplementation(async (tag: string) => {
      return { status: 200 }
    })

    render(<SearchBar selectTag={selectTag} />)
    const user = userEvent.setup()
    await user.type(screen.getByLabelText('Search for tags'), 'fubar')
    const fubar = await screen.findByRole('button', { name: /fubar/i, })
    await user.click(fubar)
    waitForElementToBeRemoved(fubar)
    const bohica = screen.queryByRole('button', { name: /bohica/i })
    expect(bohica).not.toBeInTheDocument()
  })
})