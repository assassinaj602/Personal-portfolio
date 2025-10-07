import React, { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState('idle')

  return (
    <form
      name="contact"
      method="POST"
      action="/thank-you"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="max-w-xl space-y-3"
      onSubmit={() => setStatus('submitted')}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don’t fill this out if you’re human: <input name="bot-field" />
        </label>
      </p>

      <div>
        <label className="block text-sm mb-1" htmlFor="name">Name</label>
        <input id="name" name="name" required className="w-full rounded bg-zinc-900 border border-zinc-800 px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm mb-1" htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required className="w-full rounded bg-zinc-900 border border-zinc-800 px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm mb-1" htmlFor="subject">Subject</label>
        <input id="subject" name="subject" className="w-full rounded bg-zinc-900 border border-zinc-800 px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm mb-1" htmlFor="message">Message</label>
        <textarea id="message" name="message" required rows="5" className="w-full rounded bg-zinc-900 border border-zinc-800 px-3 py-2" />
      </div>

      <button className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-600" type="submit">Send</button>

      {status === 'submitted' && (
        <p className="text-sm text-green-400">Thanks! Your message has been submitted.</p>
      )}
    </form>
  )
}
