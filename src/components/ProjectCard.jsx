import React from 'react'
import { motion } from 'framer-motion'
import { buildSrcSet, sizesAttr } from '../utils/images'

export default function ProjectCard({ project }) {
  return (
    <motion.article
      className="rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 transition shadow-card group"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      {project.image && (
        <img
          src={project.image}
          srcSet={buildSrcSet(project.image)}
          sizes={sizesAttr()}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-44 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg">{project.title}</h3>
        {project.summary && (
          <p className="mt-1 text-sm text-zinc-400 line-clamp-3">{project.summary}</p>
        )}
        {project.tech && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li key={t} className="text-xs bg-zinc-800/80 px-2 py-1 rounded">{t}</li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex gap-3">
          {project.github && (
            <a className="text-sm text-accent hover:underline" href={project.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
          {project.demo && (
            <a className="text-sm text-accent hover:underline" href={project.demo} target="_blank" rel="noreferrer">
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
