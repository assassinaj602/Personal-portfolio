import React, { useEffect, useState } from 'react'
import matter from 'gray-matter'
import { formatDate, normalizeFrontmatterDates } from '../utils/dates'

const mdModules = import.meta.glob('../data/education/*.md', { eager: true, query: '?raw', import: 'default' })

function parseMarkdown(raw) {
  const { data } = matter(raw)
  return normalizeFrontmatterDates(data)
}

export default function Education() {
  const [items, setItems] = useState([])
  useEffect(() => {
    const entries = Object.entries(mdModules).map(([path, raw]) => ({ path, ...parseMarkdown(raw) }))
  entries.sort((a, b) => new Date(b.end || Date.now()) - new Date(a.end || Date.now()))
    setItems(entries)
  }, [])

  return (
    <ul className="space-y-4">
      {items.map((e) => (
        <li key={e.path} className="rounded border border-zinc-800 p-4 bg-zinc-900/40">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h3 className="font-semibold">{e.institution}</h3>
              <p className="text-sm text-zinc-400">{e.degree}</p>
            </div>
            <p className="text-xs text-zinc-500">{formatDate(e.start)} — {e.end ? formatDate(e.end) : 'Present'}</p>
          </div>
          {e.description && <p className="text-sm mt-2 text-zinc-300">{e.description}</p>}
        </li>
      ))}
    </ul>
  )
}
