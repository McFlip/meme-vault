import { SelectedTag } from "./selected-tag";

export function TagList({ tags, handleClick }: { tags: string[], handleClick: (tag: string) => void }) {
  return (
    <>
      <ul>
        {tags.map((t, i) => <SelectedTag key={i} tag={t} handleClick={handleClick} />)}
      </ul>
    </>
  )
}