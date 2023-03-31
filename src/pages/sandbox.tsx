import { type NextPage } from "next";
import { SearchBar } from "~/components/searchbar";
import { MainMenu } from "~/components/main-menu"

const Test: NextPage = () => {
  return (
    <>
      <MainMenu />
      <h1>FUBAR</h1>
      <SearchBar selectTag={(s) => ({ status: 200 })} />
    </>
  )
}

export default Test