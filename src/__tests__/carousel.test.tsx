import React from 'react'
import { render, screen } from '~/test-utils'
import userEvent from '@testing-library/user-event'
import { Carousel } from '~/components/carousel'

describe('Meme Carousel', () => {
  it('rotates through memes, stopping at the beginning and end', async () => {
    const memes = ['1.jpg', '2.jpg', '3.jpg']
    const user = userEvent.setup()
    render(<Carousel memes={memes} />)
    const prevBtn = screen.getByLabelText('Previous Slide')
    const nextBtn = screen.getByLabelText('Next Slide')
    const shownImg = screen.getByRole('img')
    expect(shownImg.getAttribute('src')).toEqual(memes[0])
    await user.click(nextBtn)
    expect(shownImg.getAttribute('src')).toEqual(memes[1])
    await user.click(nextBtn)
    expect(shownImg.getAttribute('src')).toEqual(memes[2])
    await user.click(nextBtn)
    expect(shownImg.getAttribute('src')).toEqual(memes[2])
    await user.click(prevBtn)
    expect(shownImg.getAttribute('src')).toEqual(memes[1])
    await user.click(prevBtn)
    expect(shownImg.getAttribute('src')).toEqual(memes[0])
    await user.click(prevBtn)
    expect(shownImg.getAttribute('src')).toEqual(memes[0])
  })
})