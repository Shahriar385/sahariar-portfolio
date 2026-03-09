'use client'

import { useState } from 'react'

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setSubmitSuccess(true)
      setFormState({ name: '', email: '', message: '' })
      setIsSubmitting(false)
      setTimeout(() => setSubmitSuccess(false), 3000)
    }, 1000)
  }

  return (
    <section id="contact" className="min-h-[100dvh] w-full flex items-center border-t border-border bg-background snap-start snap-always">
      <div className="w-full mx-auto max-w-[1100px] px-6 py-20">
        <div className="mx-auto max-w-lg">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Have an idea or want to collaborate?
            </h2>
          </div>

          {/* Social Links */}
          <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="mailto:asahariar385@gmail.com"
              className="inline-flex items-center justify-center bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-all hover:opacity-90"
            >
              Email
            </a>
            <a
              href="https://github.com/Shahriar385"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-foreground px-6 py-2.5 text-sm font-medium transition-all hover:bg-foreground hover:text-background"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/md-shahariar-hossain-29a283261/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-foreground px-6 py-2.5 text-sm font-medium transition-all hover:bg-foreground hover:text-background"
            >
              LinkedIn
            </a>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full border border-border bg-background px-4 py-2.5 text-sm placeholder-muted-foreground transition-colors focus:border-foreground focus:outline-none"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full border border-border bg-background px-4 py-2.5 text-sm placeholder-muted-foreground transition-colors focus:border-foreground focus:outline-none"
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formState.message}
                onChange={handleChange}
                required
                className="w-full border border-border bg-background px-4 py-2.5 text-sm placeholder-muted-foreground transition-colors focus:border-foreground focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-foreground py-2.5 text-sm font-medium text-background transition-all hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : submitSuccess ? 'Message Sent!' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
