import { ReactNode } from "react"
/**
 *
 * @param children Tag Components array
 * @returns Unordered List of Tags
 */
export function TagList({ children }: { children: ReactNode[] | null }) {
  return <ul>{children}</ul>
}
