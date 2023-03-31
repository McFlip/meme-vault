import { dbSearchTags } from '~/db/queries'

describe('db query to search tags', () => {
  it('gets tags matching query string', async () => {
    const expected = 'fubar'
    const actual = await dbSearchTags('fu')
    expect(actual[0]?.tag).toEqual(expected)
  })
})