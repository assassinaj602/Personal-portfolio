import React, { useEffect, useState } from 'react'
import matter from 'gray-matter'
import { normalizeFrontmatterDates } from '../utils/dates'

const mdModules = import.meta.glob('../data/tools/*.md', { eager: true, query: '?raw', import: 'default' })

function parseMarkdown(raw) {
  const { data } = matter(raw)
  return normalizeFrontmatterDates(data)
}

export default function Tools() {
  const [items, setItems] = useState([])
  useEffect(() => {
    const entries = Object.entries(mdModules).map(([path, raw]) => ({ path, ...parseMarkdown(raw) }))
    setItems(entries)
  }, [])

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((t) => (
        <li key={t.path} className="rounded border border-zinc-800 p-4 bg-zinc-900/40">
          <h3 className="font-semibold">{t.name}</h3>
          {t.category && <p className="text-sm text-zinc-400">{t.category}</p>}
          {t.description && <p className="text-sm mt-2 text-zinc-300">{t.description}</p>}
          {t.link && (
            <a className="mt-2 inline-block text-accent text-sm" href={t.link} target="_blank" rel="noreferrer">Learn more</a>
          )}
        </li>
      ))}
    </ul>
  )
}
