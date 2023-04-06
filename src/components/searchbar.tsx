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
        <li key={i} className="bg-green-300 shadow-xl rounded-xl p-1 mb-1">
          <button onClick={_e => selectTag([...selectedTags, tag])}>
            {tag}
          </button>
        </li>
      )
    })
    return (
      <ul className="bg-slate-400">
        {tagListItems}
      </ul>
    )
  }

  return (
    <div className="grid grid-cols-1 grid-rows-2">
      <div className="grid gap-1.5">
        <Label htmlFor="searchbar">Search for tags</Label>
        <span className="inline-flex">
          <Search className="mr-1" />
          <Input type="search" id="searchbar" value={qstr} onChange={e => handleSearchInputChange(e.target.value)} />
        </span>
      </div>
      <div className="relative">
        <div className="absolute top-0">
          {isError && (<p>Error getting tags</p>)}
          {isLoading && qstr != '' && (<p>Searching...</p>)}
          {!!data && listTags(data.tags.filter(t => !selectedTags.includes(t)))}
        </div>
      </div>
    </div>
  )
}
