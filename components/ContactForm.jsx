'use client'
import { useState, useRef } from 'react'

export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)

    const data = new FormData(e.target)

    try {
      const response = await fetch('https://formspree.io/f/xjgarvbl', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        if (formRef.current) formRef.current.style.opacity = '0'
        setTimeout(() => setSent(true), 400)
      } else {
        alert('Submission failed. Please try again.')
      }
    } catch (error) {
      alert('Network error. Please try again.')
    }

    setSending(false)
  }

  return (
    <div className="cf-wrap sr d1">
      <div className="cf-left">
        <p className="cf-note">
          Fill in the form and I&apos;ll get back to you within 48 hours. For urgent commissions
          email directly at{' '}
          <a href="mailto:mailnormanjames@gmail.com" className="cf-email-inline">
            mailnormanjames@gmail.com
          </a>
        </p>

        <div className="cf-socials">
          <a className="ct-soc" href="#">Instagram</a>
          <a className="ct-soc" href="#">Behance</a>
          <a className="ct-soc" href="#">VSCO</a>
          <a className="ct-soc" href="#">LinkedIn</a>
        </div>
      </div>

      {sent ? (
        <div className="cf-success show">
          <span className="cf-success-icon">✦</span>
          <p>Message sent. I&apos;ll be in touch within 48 hours.</p>
        </div>
      ) : (
        <form
          ref={formRef}
          className="cf-form"
          onSubmit={handleSubmit}
          style={{ transition: 'opacity .4s' }}
          noValidate
        >

          {/* spam protection */}
          <input type="text" name="_gotcha" style={{ display: 'none' }} />

          <div className="cf-row-2">
            <div className="cf-field">
              <label className="cf-label" htmlFor="cf-name">Full Name</label>
              <input
                className="cf-input"
                type="text"
                id="cf-name"
                name="name"
                placeholder="Your name"
                autoComplete="off"
                required
              />
              <span className="cf-line" />
            </div>

            <div className="cf-field">
              <label className="cf-label" htmlFor="cf-email">Email</label>
              <input
                className="cf-input"
                type="email"
                id="cf-email"
                name="email"
                placeholder="your@email.com"
                autoComplete="off"
                required
              />
              <span className="cf-line" />
            </div>
          </div>

          <div className="cf-row-2">
            <div className="cf-field">
              <label className="cf-label" htmlFor="cf-type">Project Type</label>
              <select
                className="cf-input cf-select"
                id="cf-type"
                name="type"
                defaultValue=""
                required
              >
                <option value="" disabled>Select a category</option>
                <option value="portrait">Portrait</option>
                <option value="editorial">Editorial</option>
                <option value="fashion">Fashion</option>
                <option value="documentary">Documentary</option>
                <option value="other">Other</option>
              </select>
              <span className="cf-line" />
            </div>

            <div className="cf-field">
              <label className="cf-label" htmlFor="cf-budget">Budget Range</label>
              <select
                className="cf-input cf-select"
                id="cf-budget"
                name="budget"
                defaultValue=""
              >
                <option value="" disabled>Approximate budget</option>
                <option value="under-1k">Under $1,000</option>
                <option value="1k-5k">$1,000 — $5,000</option>
                <option value="5k-15k">$5,000 — $15,000</option>
                <option value="15k+">$15,000+</option>
              </select>
              <span className="cf-line" />
            </div>
          </div>

          <div className="cf-field">
            <label className="cf-label" htmlFor="cf-msg">Tell me about your project</label>
            <textarea
              className="cf-input cf-textarea"
              id="cf-msg"
              name="message"
              placeholder="Describe your vision, timeline, location..."
              rows={4}
              required
            />
            <span className="cf-line" />
          </div>

          <div className="cf-footer">
            <span className="cf-privacy">
              Your details are kept private and never shared.
            </span>

            <button className="cf-btn" type="submit" disabled={sending}>
              <span className="cf-btn-text">
                {sending ? 'Sending...' : 'Send Message'}
              </span>

              <svg
                className="cf-btn-arrow"
                width="24"
                height="10"
                viewBox="0 0 24 10"
                fill="none"
              >
                <path
                  d="M1 5h22M18 1l5 4-5 4"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

        </form>
      )}
    </div>
  )
}