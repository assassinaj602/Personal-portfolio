import React, { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import { normalizeFrontmatterDates } from '../utils/dates'

// Utility to import markdown files via Vite's glob eagerly at build
const mdModules = import.meta.glob('../data/projects/*.md', { eager: true, query: '?raw', import: 'default' })

function parseMarkdown(raw) {
  const { data, content } = matter(raw)
  const normalized = normalizeFrontmatterDates(data)
  return { ...normalized, body: content }
}

export default function ProjectsGrid() {
  const [projects, setProjects] = useState([])
  const [active, setActive] = useState(null)

  useEffect(() => {
    const entries = Object.entries(mdModules).map(([path, raw]) => ({ path, ...parseMarkdown(raw) }))
    entries.sort((a, b) => new Date(b.date) - new Date(a.date))
    setProjects(entries)
  }, [])

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 6).map((p) => (
          <button key={p.path} onClick={() => setActive(p)} className="text-left">
            <ProjectCard project={p} />
          </button>
        ))}
      </div>
      <ProjectModal open={!!active} project={active} onClose={() => setActive(null)} />
    </>
  )
}
