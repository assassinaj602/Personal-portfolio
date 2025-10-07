import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import matter from 'gray-matter'
import placeholder from '../assets/placeholder.jpg'

const aboutModules = import.meta.glob('../data/about/*.md', { eager: true, query: '?raw', import: 'default' })
function getAbout() {
  const first = Object.values(aboutModules)[0]
  if (!first) return null
  const { data } = matter(first)
  return data
}

export default function Hero() {
  const about = useMemo(getAbout, [])
  return (
    <section className="pt-28 md:pt-32 grid md:grid-cols-2 gap-8 items-center">
      <motion.img
        src={about?.photo || placeholder}
        alt={about?.name || 'Profile'}
        width="512"
        height="512"
        loading="lazy"
        decoding="async"
        className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover ring-2 ring-primary/40 hover:ring-primary transition"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      />

      <div>
        <motion.h1
          className="text-4xl md:text-5xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          {about?.name || 'Your Name'}
        </motion.h1>
        <motion.p
          className="mt-3 text-zinc-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {about?.tagline || 'Building delightful web experiences. Minimal, fast, accessible.'}
        </motion.p>

        <motion.div
          className="mt-6 flex gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <a href="#projects" className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-600">View Projects</a>
          <a href="#contact" className="px-4 py-2 rounded border border-zinc-700 hover:bg-zinc-800">Contact</a>
        </motion.div>
      </div>
    </section>
  )
}
