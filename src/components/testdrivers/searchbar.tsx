"use client"
import { useState } from "react"
import { SearchBar } from '~/components/searchbar'

export default function testdriver() {
  const [selectedTags, selectTag] = useState([''])
  return (
    <>
      <SearchBar selectedTags={selectedTags} selectTag={selectTag} />
    </>
  )
}