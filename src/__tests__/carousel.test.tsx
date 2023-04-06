import React from 'react'
import { render, screen } from '~/test-utils'
import userEvent from '@testing-library/user-event'
import { Carousel } from '~/components/carousel'

describe('Meme Carousel', () => {
  it('rotates through memes, stopping at the beginning and end', async () => {
    const memes = ['/doom_eternal.jpp', '/doom_lore.jpg', '/doom_meow.jpg']
    const user = userEvent.setup()
    render(<Carousel memes={memes} />)
    const prevBtn = screen.getByLabelText('Previous Slide')
    const nextBtn = screen.getByLabelText('Next Slide')
    const shownImg = screen.getByRole('img')
    expect(shownImg.getAttribute('src')).toMatch(/doom_eternal/)
    await user.click(nextBtn)
    expect(shownImg.getAttribute('src')).toMatch(/doom_lore/)
    await user.click(nextBtn)
    expect(shownImg.getAttribute('src')).toMatch(/doom_meow/)
    await user.click(nextBtn)
    expect(shownImg.getAttribute('src')).toMatch(/doom_meow/)
    await user.click(prevBtn)
    expect(shownImg.getAttribute('src')).toMatch(/doom_lore/)
    await user.click(prevBtn)
    expect(shownImg.getAttribute('src')).toMatch(/doom_eternal/)
    await user.click(prevBtn)
    expect(shownImg.getAttribute('src')).toMatch(/doom_eternal/)
  })
})