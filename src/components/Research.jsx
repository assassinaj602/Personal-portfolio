import React, { useEffect, useState } from 'react'
import matter from 'gray-matter'
import { normalizeFrontmatterDates } from '../utils/dates'

const mdModules = import.meta.glob('../data/research/*.md', { eager: true, query: '?raw', import: 'default' })

function parseMarkdown(raw) {
  const { data } = matter(raw)
  return normalizeFrontmatterDates(data)
}

export default function Research() {
  const [items, setItems] = useState([])
  useEffect(() => {
    const entries = Object.entries(mdModules).map(([path, raw]) => ({ path, ...parseMarkdown(raw) }))
    setItems(entries)
  }, [])

  return (
    <div className="space-y-4">
      {items.map((r) => (
        <article key={r.path} className="rounded border border-zinc-800 p-4 bg-zinc-900/40">
          <h3 className="font-semibold text-lg">{r.title}</h3>
          {r.authors && <p className="text-sm text-zinc-400 mt-1">{r.authors.join(', ')}</p>}
          {r.venue && <p className="text-xs text-zinc-500">{r.venue}</p>}
          {r.link && (
            <a className="mt-2 inline-block text-accent text-sm" href={r.link} target="_blank" rel="noreferrer">PDF/Link</a>
          )}
        </article>
      ))}
    </div>
  )
}
