import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const links = [
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#education', label: 'Education' },
  { href: '#contributions', label: 'Contributions' },
  { href: '#hackathons', label: 'Hackathons' },
  { href: '#research', label: 'Research' },
  { href: '#tools', label: 'Tools' },
  { href: '#volunteer', label: 'Volunteer' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const handler = () => setOpen(false)
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive('#' + e.target.id)
          }
        }
      },
      { rootMargin: '-40% 0px -50% 0px' }
    )

    links.forEach((l) => {
      const el = document.querySelector(l.href)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass">
      <nav className="container flex items-center justify-between py-3">
        <a href="#main" className="text-lg font-semibold tracking-tight relative group">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500">Portfolio</span>
          <span className="absolute -inset-x-1 -bottom-1 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>

        <button
          className="md:hidden p-2 rounded hover:bg-zinc-800 focus-visible:outline"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden>☰</span>
        </button>

        <ul className="hidden md:flex gap-1 text-sm text-zinc-300 rounded-lg p-1 border border-white/5 bg-white/5">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`relative px-3 py-2 rounded-md transition-colors hover:text-white ${
                  active === l.href ? 'text-white' : ''
                }`}
                aria-current={active === l.href ? 'page' : undefined}
              >
                {active === l.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-0 -z-10 rounded-md bg-white/10 border border-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* mobile drawer */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden bg-black/70"
        >
          <motion.ul
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            className="fixed top-12 right-0 bottom-0 w-64 bg-zinc-900/95 backdrop-blur shadow-card p-6 space-y-4 border-l border-white/5"
          >
            {links.map((l) => (
              <li key={l.href}>
                <a className="block py-2 hover:text-white" href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </header>
  )
}
