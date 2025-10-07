import React, { useEffect, useState } from 'react'
import matter from 'gray-matter'
import { formatDate, normalizeFrontmatterDates } from '../utils/dates'

const mdModules = import.meta.glob('../data/volunteer/*.md', { eager: true, query: '?raw', import: 'default' })

function parseMarkdown(raw) {
  const { data } = matter(raw)
  return normalizeFrontmatterDates(data)
}

export default function Volunteer() {
  const [items, setItems] = useState([])
  useEffect(() => {
    const entries = Object.entries(mdModules).map(([path, raw]) => ({ path, ...parseMarkdown(raw) }))
    setItems(entries)
  }, [])

  return (
    <ul className="space-y-3">
      {items.map((v) => (
        <li key={v.path} className="rounded border border-zinc-800 p-4 bg-zinc-900/40">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h3 className="font-semibold">{v.organization}</h3>
              <p className="text-sm text-zinc-400">{v.role}</p>
            </div>
            <p className="text-xs text-zinc-500">{formatDate(v.start)} — {v.end ? formatDate(v.end) : 'Present'}</p>
          </div>
          {v.description && <p className="text-sm mt-2 text-zinc-300">{v.description}</p>}
        </li>
      ))}
    </ul>
  )
}
