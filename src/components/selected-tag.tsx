import { Button } from "~/components/ui/button";

export function SelectedTag({ tag, handleClick }: { tag: string, handleClick: (tag: string) => void }) {
  return (
    <Button variant={'subtle'} onClick={_e => handleClick(tag)}>{tag}</Button>
  )
}