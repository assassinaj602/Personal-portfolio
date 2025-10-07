import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import matter from 'gray-matter'
import { formatDate, normalizeFrontmatterDates } from '../utils/dates'
import { buildSrcSet, sizesAttr } from '../utils/images'

const mdModules = import.meta.glob('../data/certificates/*.md', { eager: true, query: '?raw', import: 'default' })

function parseMarkdown(raw) {
  const { data } = matter(raw)
  return normalizeFrontmatterDates(data)
}

export default function CertificatesGrid() {
  const [items, setItems] = useState([])
  useEffect(() => {
    const entries = Object.entries(mdModules).map(([path, raw]) => ({ path, ...parseMarkdown(raw) }))
    entries.sort((a, b) => new Date(b.date) - new Date(a.date))
    setItems(entries)
  }, [])

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((c) => (
        <motion.article key={c.path} className="rounded border border-zinc-800 p-4 bg-zinc-900/40 shadow-card hover:bg-zinc-900 transition"
          whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
          {c.image && (
            <motion.div className="overflow-hidden rounded">
              <motion.img
                src={c.image}
                srcSet={buildSrcSet(c.image)}
                sizes={sizesAttr()}
                alt={c.title}
                className="w-full h-40 object-cover"
                loading="lazy"
                decoding="async"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          )}
          <h3 className="mt-3 font-semibold">{c.title}</h3>
          <p className="text-sm text-zinc-400">{c.issuer}</p>
          <p className="text-xs text-zinc-500">{formatDate(c.date)}</p>
          {c.link && (
            <a className="mt-2 inline-block text-accent text-sm" href={c.link} target="_blank" rel="noreferrer">View</a>
          )}
        </motion.article>
      ))}
    </div>
  )
}
