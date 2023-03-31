import { type NextPage } from "next";
import { SearchBar } from "~/components/searchbar";
import { MainMenu } from "~/components/main-menu"
import { api } from "~/utils/api";

const Test: NextPage = () => {
  const getSearchResults = (qstr: string) => api.tags.getSearchResults.useQuery({ qstr })
  return (
    <>
      <MainMenu />
      <h1>FUBAR</h1>
      <SearchBar getSearchResults={s => getSearchResults(s).data} selectTag={(s) => ({ status: 200 })} />
    </>
  )
}

export default Test