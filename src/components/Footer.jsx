import React from 'react'
import socials from '../data/socials.json'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-24 border-t border-zinc-800 py-8 text-sm text-zinc-400">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {year} Your Name. All rights reserved.</p>
        <nav aria-label="Social links" className="flex gap-4">
          {socials.github && (
            <a className="hover:text-white" href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">GitHub</a>
          )}
          {socials.linkedin && (
            <a className="hover:text-white" href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">LinkedIn</a>
          )}
          {socials.twitter && (
            <a className="hover:text-white" href={socials.twitter} target="_blank" rel="noreferrer" aria-label="Twitter">Twitter</a>
          )}
          {socials.email && (
            <a className="hover:text-white" href={`mailto:${socials.email}`} aria-label="Email">Email</a>
          )}
        </nav>
      </div>
    </footer>
  )
}
