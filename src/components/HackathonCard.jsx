import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import matter from 'gray-matter'
import { buildSrcSet, sizesAttr } from '../utils/images'
import { formatDate, normalizeFrontmatterDates } from '../utils/dates'

const mdModules = import.meta.glob('../data/hackathons/*.md', { eager: true, query: '?raw', import: 'default' })

function parseMarkdown(raw) {
  const { data } = matter(raw)
  return normalizeFrontmatterDates(data)
}

export default function HackathonCard() {
  const [items, setItems] = useState([])
  useEffect(() => {
    const entries = Object.entries(mdModules).map(([path, raw]) => ({ path, ...parseMarkdown(raw) }))
    entries.sort((a, b) => new Date(b.date) - new Date(a.date))
    setItems(entries)
  }, [])

  if (items.length === 0) return <p className="text-zinc-400">No hackathons yet.</p>

  const h = items[0]
  return (
    <motion.article className="rounded border border-zinc-800 p-4 bg-zinc-900/40 shadow-card hover:bg-zinc-900 transition" whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
      {h.certificate && (
        <motion.img
          src={h.certificate}
          srcSet={buildSrcSet(h.certificate)}
          sizes={sizesAttr()}
          alt={`${h.event} certificate`}
          className="w-full h-48 object-cover rounded"
          loading="lazy"
          decoding="async"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4 }}
        />
      )}
      <h3 className="mt-3 font-semibold">{h.event}</h3>
      <p className="text-sm text-zinc-400">{h.position} — {h.result}</p>
      <p className="text-sm mt-2 text-zinc-300">{h.description}</p>
  <p className="text-xs text-zinc-500 mt-1">{formatDate(h.date)}</p>
    </motion.article>
  )
}
