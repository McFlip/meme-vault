import { type NextPage } from "next";
import { SearchBar } from "~/components/searchbar";
import { MainMenu } from "~/components/main-menu"
import { useState } from 'react'

const Test: NextPage = () => {
  const [selectedTags, selectTag] = useState([''])
  return (
    <>
      <MainMenu />
      <h1>FUBAR</h1>
      <SearchBar selectedTags={selectedTags} selectTag={selectTag} />
    </>
  )
}

export default Test