import React, { useEffect, useState } from 'react'
import matter from 'gray-matter'
import { normalizeFrontmatterDates } from '../utils/dates'

const mdModules = import.meta.glob('../data/contributions/*.md', { eager: true, query: '?raw', import: 'default' })

function parseMarkdown(raw) {
  const { data } = matter(raw)
  return normalizeFrontmatterDates(data)
}

export default function Contributions() {
  const [items, setItems] = useState([])
  useEffect(() => {
    const entries = Object.entries(mdModules).map(([path, raw]) => ({ path, ...parseMarkdown(raw) }))
    setItems(entries)
  }, [])

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((c) => (
        <li key={c.path} className="rounded border border-zinc-800 p-4 bg-zinc-900/40">
          <h3 className="font-semibold">{c.repo}</h3>
          <p className="text-sm text-zinc-400">{c.role}</p>
          {c.description && <p className="text-sm mt-2 text-zinc-300">{c.description}</p>}
          {c.link && (
            <a className="mt-2 inline-block text-accent text-sm" href={c.link} target="_blank" rel="noreferrer">View</a>
          )}
        </li>
      ))}
    </ul>
  )
}
