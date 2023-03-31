import { type NextPage } from "next";
import { SearchBar } from "~/components/searchbar";
import { MainMenu } from "~/components/main-menu"
import { useState } from 'react'
// import { SelectedTag } from "~/components/selected-tag";
import { TagList } from "~/components/tag-list";

const Test: NextPage = () => {
  const [selectedTags, selectTag] = useState([''])
  return (
    <>
      <MainMenu />
      <h1>FUBAR</h1>
      <div>
        <SearchBar selectedTags={selectedTags} selectTag={selectTag} />
      </div>
      <div>
        <TagList tags={selectedTags} handleClick={tag => selectTag(selectedTags.filter(t => t != tag))} />
      </div>
    </>
  )
}

export default Test