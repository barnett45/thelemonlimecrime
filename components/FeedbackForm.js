import { useState } from 'react'
import { useRouter } from 'next/router'

import styles from './FeedbackForm.module.css'

export default function FeedbackForm() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // Netlify detects forms by scanning static HTML at deploy time, and Next.js
  // never writes this page out as static HTML. So the form is declared for
  // detection in public/__forms.html, and we post the submission there.
  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(event.target)).toString(),
      })

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`)
      }

      router.push('/success')
    } catch (submitError) {
      setError('Something went wrong sending your feedback. Please try again.')
      setSubmitting(false)
    }
  }

  return (
      <form
        className={styles.form}
        name="feedback"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="feedback" />
        <p className={styles.hidden}>
            <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
            </label>
        </p>
  
        <label htmlFor="name">Name</label>
        <input id="name" className={styles['form-field']} type="text" name="name" />

        <label htmlFor="email">Email</label>
        <input id="email" className={styles['form-field']} type="email" name="email" required />

        <label htmlFor="feedback">What is your feedback?</label>
        <textarea id="feedback" className={styles['form-field']} wrap="soft" name="feedback" required></textarea>
        <button className={styles.button} type="submit" disabled={submitting}>
          {submitting ? 'Sending…' : 'Submit'}
        </button>

        {error && <p role="alert">{error}</p>}
      </form>
  )
}
