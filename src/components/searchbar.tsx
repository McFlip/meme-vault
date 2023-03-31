"use client"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Dispatch, SetStateAction, useState } from "react"
import { api } from "~/utils/api";
import { Search } from "lucide-react";

export function SearchBar({ selectedTags, selectTag }: { selectedTags: string[], selectTag: Dispatch<SetStateAction<string[]>> }) {
  const [qstr, setQstr] = useState('')
  const { data, isLoading, isError } = api.tags.getSearchResults.useQuery({ qstr }, { enabled: !!qstr })

  const handleSearchInputChange = (value: HTMLInputElement['value']) => {
    setQstr(value)
  }

  const listTags = (tags: string[]) => {
    const tagListItems = tags.map((tag, i) => {
      return (
        <li key={i}>
          <button onClick={_e => selectTag([...selectedTags, tag])}>
            {tag}
          </button>
        </li>
      )
    })
    return (
      <ul>
        {tagListItems}
      </ul>
    )
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="searchbar">Search for tags</Label>
      <span className="inline-flex">
        <Search className="gap-4" />
        <Input type="search" id="searchbar" value={qstr} onChange={e => handleSearchInputChange(e.target.value)} />
      </span>
      <div>
        {isError && (<p>Error getting tags</p>)}
        {isLoading && qstr != '' && (<p>Searching...</p>)}
        {!!data && listTags(data.tags.filter(t => !selectedTags.includes(t)))}
      </div>
    </div>
  )
}
