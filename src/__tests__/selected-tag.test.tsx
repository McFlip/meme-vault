import React from "react";
import { render, screen } from '~/test-utils'
import { SelectedTag } from "~/components/selected-tag";
import userEvent from '@testing-library/user-event'

describe('Selected Tag', () => {
  it('renders a button with the tag text', async () => {
    const expected = 'fubar'
    render(<SelectedTag tag={expected} handleClick={() => { }} />)
    const myButton = screen.getByRole('button')
    expect(myButton.textContent).toEqual(expected)
  })
  it('calls click handler passed from props', async () => {
    const user = userEvent.setup()
    let fromClick = ''
    const expected = 'hello from handleclick'
    const handleClick = () => fromClick = expected
    render(<SelectedTag tag="fubar" handleClick={handleClick} />)
    const myButton = screen.getByRole('button')
    await user.click(myButton)
    expect(fromClick).toEqual(expected)
  })
})