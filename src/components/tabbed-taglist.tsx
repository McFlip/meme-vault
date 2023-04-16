// import { TagList } from '~/components/tag-list'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { ReactNode } from "react"

interface props {
  availableTags: ReactNode
  selectedTags: ReactNode
}
/**
 * @description Tab w/ Available Tags & Tab w/ Selected Tags
 * @param availableTags TagList component listing tags available for selection
 * @param selectedTags TagList component listing tags that have been selected
 */
export function TabbedTagList({ availableTags, selectedTags }: props) {
  return (
    <Tabs defaultValue="available" className="flex flex-col">
      <TabsList>
        <TabsTrigger value="available">Drill Down</TabsTrigger>
        <TabsTrigger value="selected">Back Up</TabsTrigger>
      </TabsList>
      <TabsContent value="available">
        <p className="text-sm text-slate-200">
          Select a tag to drill down in your search
        </p>
        {availableTags}
      </TabsContent>
      <TabsContent value="selected">
        <p className="text-sm text-slate-200">
          Select a tag to remove it from the search
        </p>
        {selectedTags}
      </TabsContent>
    </Tabs>
  )
}
