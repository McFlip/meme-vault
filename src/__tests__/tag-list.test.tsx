import React from "react"
import { render, screen } from "~/test-utils"
// import userEvent from '@testing-library/user-event'
import { TagList } from "~/components/tag-list"
import { SelectedTag } from "~/components/selected-tag"

describe("Tag List", () => {
  it("renders a list of tags", async () => {
    const tags = ["fubar", "bohica", "wtf"]
    render(
      <TagList>
        {tags.map((tag, i) => (
          <SelectedTag tag={tag} key={i} handleClick={() => {}} />
        ))}
      </TagList>
    )
    const allButtons = await screen.findAllByRole("button")
    expect(allButtons).toHaveLength(3)
    expect(screen.getByRole("button", { name: "fubar" })).toBeInTheDocument()
  })
})
