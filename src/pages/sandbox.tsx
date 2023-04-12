import { type NextPage } from "next"
import { SearchBar } from "~/components/searchbar"
import { MainMenu } from "~/components/main-menu"
import { useState } from "react"
import { api } from "~/utils/api"
import { TagList } from "~/components/tag-list"
import { Carousel } from "~/components/carousel"
import { TabbedTagList } from "~/components/tabbed-taglist"

const Test: NextPage = () => {
  const [selectedTags, selectTag] = useState<string[]>([])
  const { data: memeResults } = api.tags.getMemesByTags.useQuery(
    { tags: selectedTags },
    { enabled: selectedTags.length > 0 }
  )
  const { data: availableTags } = api.tags.getAvailableTags.useQuery(
    { selectedTags },
    { enabled: selectedTags.length > 0 }
  )
  return (
    <>
      <main className="flex min-h-screen flex-none flex-col flex-wrap content-center items-start justify-start bg-gradient-to-b from-slate-600 to-red-900">
        <MainMenu />
        <div>
          <SearchBar selectedTags={selectedTags} selectTag={selectTag} />
        </div>
        <div>
          <TabbedTagList
            availableTags={
              <TagList
                tags={availableTags ? availableTags.tags : []}
                handleClick={(tag) => selectTag([...selectedTags, tag])}
              />
            }
            selectedTags={
              <TagList
                tags={selectedTags}
                handleClick={(tag) =>
                  selectTag(selectedTags.filter((t) => t != tag))
                }
              />
            }
          />
        </div>
        <div>{!!memeResults && <Carousel memes={memeResults.memes} />}</div>
      </main>
    </>
  )
}

export default Test
