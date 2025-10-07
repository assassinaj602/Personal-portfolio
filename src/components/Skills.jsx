import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import matter from 'gray-matter'
import { normalizeFrontmatterDates } from '../utils/dates'

const mdModules = import.meta.glob('../data/skills/*.md', { eager: true, query: '?raw', import: 'default' })

function parseMarkdown(raw) {
  const { data } = matter(raw)
  return normalizeFrontmatterDates(data)
}

export default function Skills() {
  const [items, setItems] = useState([])
  useEffect(() => {
    const entries = Object.entries(mdModules).map(([path, raw]) => ({ path, ...parseMarkdown(raw) }))
    setItems(entries)
  }, [])

  const catMap = items.reduce((acc, s) => {
    acc[s.category] = acc[s.category] || []
    acc[s.category].push(s)
    return acc
  }, {})

  return (
    <div className="space-y-8">
      {Object.entries(catMap).map(([cat, list]) => (
        <div key={cat}>
          <h3 className="font-semibold text-xl mb-4">{cat}</h3>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map((s) => (
              <li key={s.name} className="p-4 rounded border border-zinc-800 bg-zinc-900/40">
                <div className="flex items-center justify-between">
                  <span>{s.name}</span>
                  <span className="text-xs text-zinc-400">{s.level}</span>
                </div>
                <div className="mt-2 h-2 bg-zinc-800 rounded overflow-hidden">
                  <motion.div
                    className="h-2 bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.proficiency || 50}%` }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
