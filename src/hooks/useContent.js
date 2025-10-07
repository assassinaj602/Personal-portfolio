// Simple content loader utilities; using Vite's import.meta.glob
import matter from 'gray-matter'

export function loadMarkdownGlob(pattern) {
  const mdModules = import.meta.glob(pattern, { eager: true, as: 'raw' })
  const items = Object.entries(mdModules).map(([path, raw]) => {
    const { data, content } = matter(raw)
    return { path, ...data, body: content }
  })
  return items
}
