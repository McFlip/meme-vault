import { render, screen } from '~/test-utils'
import Home from '~/pages/index'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /Create T3 App/i,
    })

    expect(heading).toBeInTheDocument()
  })
})