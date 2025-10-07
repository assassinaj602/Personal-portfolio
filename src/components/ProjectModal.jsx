import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

export default function ProjectModal({ open, onClose, project }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          <button
            className="fixed inset-0 bg-black/60"
            aria-label="Close project details"
            onClick={onClose}
          />
          <motion.aside
            className="absolute right-0 top-0 h-full w-full max-w-xl bg-zinc-950 border-l border-zinc-800 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold">{project?.title}</h3>
                  {project?.tech && (
                    <ul className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-400">
                      {project.tech.map((t) => (
                        <li key={t} className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">{t}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  className="p-2 rounded hover:bg-zinc-900 border border-zinc-800"
                  onClick={onClose}
                >
                  ✕
                </button>
              </div>

              {project?.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="mt-4 w-full h-52 object-cover rounded"
                />
              )}

              <div className="prose prose-invert mt-5 max-w-none">
                {project?.body ? (
                  <ReactMarkdown>{project.body}</ReactMarkdown>
                ) : (
                  <p className="text-zinc-300">No additional details.</p>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                {project?.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="px-3 py-2 rounded border border-zinc-800 hover:bg-zinc-900">GitHub</a>
                )}
                {project?.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer" className="px-3 py-2 rounded bg-primary text-white hover:bg-primary-600">Live Demo</a>
                )}
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
