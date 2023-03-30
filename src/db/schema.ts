import { InferModel, pgTable, text, primaryKey, index } from 'drizzle-orm/pg-core'

export const memeTags = pgTable('meme_tags', {
  memeUrl: text('meme_url').notNull(),
  tag: text('tag').default('NO TAG').notNull()
}, (memeTags) => ({
  cpk: primaryKey(memeTags.memeUrl, memeTags.tag),
  tagIdx: index('tag_idx').on(memeTags.tag)
}))

export type MemeTag = InferModel<typeof memeTags>
export type NewMemeTag = InferModel<typeof memeTags, 'insert'>