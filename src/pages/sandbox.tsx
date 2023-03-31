import { type NextPage } from "next";
import { SearchBar } from "~/components/searchbar";
import { MainMenu } from "~/components/main-menu"
import { useState } from 'react'
import { SelectedTag } from "~/components/selected-tag";

const Test: NextPage = () => {
  const [selectedTags, selectTag] = useState([''])
  return (
    <>
      <MainMenu />
      <h1>FUBAR</h1>
      <SearchBar selectedTags={selectedTags} selectTag={selectTag} />
      <SelectedTag tag="lulz" handleClick={tag => console.log(tag)} />
    </>
  )
}

export default Test