import { type NextPage } from "next";
import { SearchBar } from "~/components/searchbar";
import { MainMenu } from "~/components/main-menu"
import { useState } from 'react'
// import { SelectedTag } from "~/components/selected-tag";
import { TagList } from "~/components/tag-list";
import { Carousel } from "~/components/carousel";

const Test: NextPage = () => {
  const [selectedTags, selectTag] = useState([''])
  const memes = ['https://pbs.twimg.com/media/Ee283STUYAAsRHZ.jpg', 'https://pbs.twimg.com/media/Et1kXL0XMAUj5Iw?format=jpg&name=small', 'https://i.ytimg.com/vi/ris-1JmOg-U/maxresdefault.jpg']
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
      <div>
        <Carousel memes={memes} />
      </div>
    </>
  )
}

export default Test