import { type NextPage } from "next"
import { SearchBar } from "~/components/searchbar"
import { MainMenu } from "~/components/main-menu"
import { useState } from "react"
import { api } from "~/utils/api"
import { TagList } from "~/components/tag-list"
import { Carousel } from "~/components/carousel"
import { TabbedTagList } from "~/components/tabbed-taglist"
import { SelectedTag } from "~/components/selected-tag"

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
      <main className="grid min-h-screen w-screen auto-cols-min auto-rows-min grid-cols-4 items-start gap-2 place-self-start overflow-x-clip bg-gradient-to-b from-slate-600 to-red-900">
        <div className="col-span-4 rounded-xl border-2 border-white p-3">
          <div className="relative flex flex-row flex-wrap md:justify-center">
            <div className="md:absolute md:left-1">
              <MainMenu />
            </div>
            <SearchBar selectedTags={selectedTags} selectTag={selectTag} />
          </div>
        </div>
        <div className="col-span-4 rounded-xl border-2 border-white p-5 md:col-span-3">
          {!!memeResults && <Carousel memes={memeResults.memes} />}
        </div>
        <div className="invisible col-span-1 min-w-[200px] rounded-xl border-2 border-white sm:invisible md:visible lg:visible">
          <TabbedTagList
            availableTags={
              <TagList>
                {availableTags === undefined
                  ? null
                  : availableTags.tags.map((t, i) => (
                      <SelectedTag
                        key={i}
                        tag={t}
                        handleClick={(tag) => selectTag([...selectedTags, tag])}
                      />
                    ))}
              </TagList>
            }
            selectedTags={
              <TagList>
                {selectedTags.map((t, i) => (
                  <SelectedTag
                    key={i}
                    tag={t}
                    handleClick={(tag) =>
                      selectTag(selectedTags.filter((t) => t != tag))
                    }
                  />
                ))}
              </TagList>
            }
          />
        </div>
      </main>
    </>
  )
}

export default Test
