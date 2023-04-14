import { TabbedTagList } from "~/components/tabbed-taglist"
import { TagList } from "~/components/tag-list"
import { SelectedTag } from "~/components/selected-tag"
import { render, screen, waitForElementToBeRemoved } from "~/test-utils"
import userEvent from "@testing-library/user-event"

describe("Tabbed Tag List", () => {
  const availableTags = ["available 1", "available 2"]
  const selectedTags = ["selected 1"]
  const select = jest.fn()
  const deselect = jest.fn()
  it("displays available tags by default", async () => {
    render(
      <TabbedTagList
        availableTags={
          <TagList>
            {availableTags.map((tag, i) => (
              <SelectedTag key={i} tag={tag} handleClick={select} />
            ))}
          </TagList>
        }
        selectedTags={
          <TagList>
            {selectedTags.map((tag, i) => (
              <SelectedTag key={i} tag={tag} handleClick={deselect} />
            ))}
          </TagList>
        }
      />
    )

    const avaialble1 = screen.getByRole("button", { name: "available 1" })
    const avaialble2 = screen.getByRole("button", { name: "available 2" })
    const selected1 = screen.queryByRole("button", { name: "selected 1" })

    expect(avaialble1).toBeInTheDocument()
    expect(avaialble2).toBeInTheDocument()
    expect(selected1).not.toBeInTheDocument()
  })
  it("toggles between selected and available tags", async () => {
    render(
      <TabbedTagList
        availableTags={
          <TagList>
            {availableTags.map((tag, i) => (
              <SelectedTag key={i} tag={tag} handleClick={select} />
            ))}
          </TagList>
        }
        selectedTags={
          <TagList>
            {selectedTags.map((tag, i) => (
              <SelectedTag key={i} tag={tag} handleClick={deselect} />
            ))}
          </TagList>
        }
      />
    )

    const user = userEvent.setup()
    const available1 = screen.getByRole("button", { name: "available 1" })
    const drillTab = screen.getByRole("tab", { name: "Drill Down" })
    const backTab = screen.getByRole("tab", { name: "Back Up" })
    await user.click(backTab)
    waitForElementToBeRemoved(available1)
    const selected1 = screen.getByRole("button", { name: "selected 1" })

    expect(selected1).toBeInTheDocument()

    await user.click(drillTab)
    waitForElementToBeRemoved(selected1)
    const available2 = screen.getByRole("button", { name: "available 2" })

    expect(available2).toBeInTheDocument()
  })
  it("integrates the click handler into the tags", async () => {
    render(
      <TabbedTagList
        availableTags={
          <TagList>
            {availableTags.map((tag, i) => (
              <SelectedTag key={i} tag={tag} handleClick={select} />
            ))}
          </TagList>
        }
        selectedTags={
          <TagList>
            {selectedTags.map((tag, i) => (
              <SelectedTag key={i} tag={tag} handleClick={deselect} />
            ))}
          </TagList>
        }
      />
    )
    const user = userEvent.setup()

    const available1 = screen.getByRole("button", { name: "available 1" })
    const available2 = screen.getByRole("button", { name: "available 2" })
    const backTab = screen.getByRole("tab", { name: "Back Up" })
    await user.click(available1)
    await user.click(available2)
    await user.click(backTab)
    const selected1 = screen.getByRole("button", { name: "selected 1" })
    await user.click(selected1)

    expect(select).toHaveBeenCalledTimes(2)
    expect(deselect).toHaveBeenCalledTimes(1)
  })
})
