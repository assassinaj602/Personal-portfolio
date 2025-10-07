import React, { Suspense, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectsGrid from './components/ProjectsGrid'
import CertificatesGrid from './components/CertificatesGrid'
import Skills from './components/Skills'
import Education from './components/Education'
import Contributions from './components/Contributions'
import Research from './components/Research'
import Volunteer from './components/Volunteer'
import Tools from './components/Tools'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import SEOHead from './components/SEOHead'
import BackgroundFX from './components/BackgroundFX'
import './index.css'

// Helper to lazy-load heavier components when needed
const HackathonCard = React.lazy(() => import('./components/HackathonCard'))

// NOTE for maintainers: Netlify CMS collections live in public/admin/config.yml
// You can add/remove fields or collections there. Content files are under src/data/*

export default function App() {
  const prefersReducedMotion = useReducedMotion()
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <div>
      <BackgroundFX />
      <SEOHead title="Portfolio" description="Professional portfolio built with React, Tailwind, and Netlify CMS" />
      <Navbar />
      <main id="main" className="container mx-auto px-4">
        <Hero />

        <Section id="projects" title="Projects">
          <ProjectsGrid />
        </Section>

        <Section id="skills" title="Skills">
          <Skills />
        </Section>

        <Section id="certificates" title="Certificates">
          <CertificatesGrid />
        </Section>

        <Section id="education" title="Education">
          <Education />
        </Section>

        <Section id="contributions" title="Open Source Contributions">
          <Contributions />
        </Section>

        <Section id="hackathons" title="Hackathons">
          <Suspense fallback={<div className="text-zinc-400">Loading…</div>}>
            <HackathonCard />
          </Suspense>
        </Section>

        <Section id="research" title="Research / Publications">
          <Research />
        </Section>

        <Section id="tools" title="Tools">
          <Tools />
        </Section>

        <Section id="volunteer" title="Volunteer Work">
          <Volunteer />
        </Section>

        <Section id="contact" title="Contact">
          <ContactForm />
        </Section>
      </main>
      <Footer />
    </div>
  )
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="py-16 md:py-24">
      <motion.h2
        className="text-3xl md:text-4xl font-semibold mb-8 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>
      {children}
    </section>
  )
}
