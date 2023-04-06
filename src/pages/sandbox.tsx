import { type NextPage } from "next";
import { SearchBar } from "~/components/searchbar";
import { MainMenu } from "~/components/main-menu"
import { useState } from 'react'
import { api } from "~/utils/api";
import { TagList } from "~/components/tag-list";
import { Carousel } from "~/components/carousel";

const Test: NextPage = () => {
  const [selectedTags, selectTag] = useState<string[]>([])
  const { data } = api.tags.getMemesByTags.useQuery({ tags: selectedTags }, { enabled: selectedTags.length > 0 })
  return (
    <>
      <main className="flex flex-col flex-wrap flex-none items-start content-center justify-start min-h-screen bg-gradient-to-b from-slate-600 to-red-900">
        <MainMenu />
        <h1>FUBAR</h1>
        <div>
          <SearchBar selectedTags={selectedTags} selectTag={selectTag} />
        </div>
        <div>
          <TagList tags={selectedTags} handleClick={tag => selectTag(selectedTags.filter(t => t != tag))} />
        </div>
        <div>
          {!!data && <Carousel memes={data.memes} />}
        </div>
      </main>
    </>
  )
}

export default Test