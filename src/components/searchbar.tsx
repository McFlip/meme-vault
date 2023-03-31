"use client"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { useState } from "react"
import { api } from "~/utils/api";


type T_selectTag = (tag: string) => { status: number }

// TODO: Refactor select tag prop to useState hook
export function SearchBar({ selectTag }: { selectTag: T_selectTag }) {
  const [qstr, setQstr] = useState('')
  // const [tags, setTags] = useState([''])
  const { data, isLoading, isError } = api.tags.getSearchResults.useQuery({ qstr }, { enabled: !!qstr })

  const handleSearchInputChange = (value: HTMLInputElement['value']) => {
    setQstr(value)
    // const res = getSearchResults(value)
    // const res = useQuery({ qstr: 'wtf' }, { enabled: Boolean(value) })
    // const res = { data: { tags: ['fubar'] } }
    // if (res.data) {
    //   setTags(res.data.tags)
    // } else {
    //   setTags([''])
    // }
  }

  const handleTagClick = async (tag: string) => {
    const res = await selectTag(tag)
    if (res.status === 200) {
      // setTags(tags.filter(t => t !== tag))
      console.log('selected tag ', tag)
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
      <Input type="search" id="searchbar" value={qstr} onChange={e => handleSearchInputChange(e.target.value)} />
      <div>
        {isError && (<p>Error getting tags</p>)}
        {isLoading && qstr != '' && (<p>Searching...</p>)}
        {!!data && listTags(data.tags)}
      </div>
    </div>
  )
}
