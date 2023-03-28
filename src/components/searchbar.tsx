"use client"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { useState } from "react"

// TODO: move mocking to test
const mockdata = ['fubar', 'bohica']

// TODO: move mocking to test
const getSearchResults = (qstr: string) => {
  if (qstr === '') return []
  return mockdata.filter(s => s.includes(qstr))
}

// TODO: move mocking to test
const selectTag = async (tag: string) => {
  return { status: 200 }
}

export function SearchBar() {
  const [qstr, setQstr] = useState('')
  const [tags, setTags] = useState([''])

  const handleSearchInputChange = (value: HTMLInputElement['value']) => {
    setQstr(value)
    setTags(getSearchResults(value))
  }

  const handleTagClick = async (tag: string) => {
    const res = await selectTag(tag)
    if (res.status === 200) {
      setTags(tags.filter(t => t !== tag))
    } else {
      console.error('Error selecting tag')
    }
  }

  const listTags = (tags: string[]) => {
    const tagListItems = tags.map((tag, i) => {
      return (
        <li key={i}>
          <button onClick={_e => handleTagClick(tag)}>
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
      <Input type="text" id="searchbar" value={qstr} onChange={e => handleSearchInputChange(e.target.value)} />
      <div>
        {listTags(tags)}
      </div>
    </div>
  )
}
