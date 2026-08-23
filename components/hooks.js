import { useEffect, useRef, useState } from 'react'

/**
 * Optional media. Real footage can be dropped into /public/media at any time —
 * until then the hook reports false and the CSS/SVG understudy plays instead,
 * so the page never shows a broken player.
 */
export function useOptionalMedia(src) {
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    let live = true
    fetch(src, { method: 'HEAD' })
      .then((res) => {
        const type = res.headers.get('content-type') || ''
        if (live && res.ok && !type.includes('text/html')) setAvailable(true)
      })
      .catch(() => {})
    return () => {
      live = false
    }
  }, [src])

  return available
}

/**
 * Scroll progress (0 → 1) across an element that is taller than the viewport.
 * Read on a rAF tick so we never touch layout inside the scroll handler.
 */
export function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0)
  const frame = useRef(0)

  useEffect(() => {
    const measure = () => {
      frame.current = 0
      const el = ref.current
      if (!el) return
      const { top, height } = el.getBoundingClientRect()
      const travel = height - window.innerHeight
      if (travel <= 0) return
      const p = Math.min(1, Math.max(0, -top / travel))
      setProgress(p)
    }
    const onScroll = () => {
      if (frame.current) return
      frame.current = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [ref])

  return progress
}

/** Reveal-on-enter, used for the staggered section intros. */
export function useReveal(options = {}) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSeen(true)
            io.disconnect()
          }
        })
      },
      { threshold: 0.18, ...options }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return [ref, seen]
}

/**
 * Netlify Forms over AJAX. The POST goes to the static skeleton at
 * /__forms.html — in a Next.js app a POST to "/" is swallowed by the SSR
 * handler and never reaches Netlify's form pipeline.
 */
export function useNetlifyForm(validate) {
  const [state, setState] = useState('idle')
  const [errors, setErrors] = useState({})

  const clearError = (name) =>
    setErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })

  const onSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const found = validate ? validate(Object.fromEntries(data.entries())) : {}

    if (Object.keys(found).length) {
      setErrors(found)
      setState('idle')
      const first = form.querySelector(`[name="${Object.keys(found)[0]}"]`)
      if (first) first.focus()
      return
    }

    setErrors({})
    setState('sending')

    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      })
      if (!res.ok) throw new Error(`Netlify returned ${res.status}`)
      form.reset()
      setState('done')
    } catch (err) {
      setState('error')
    }
  }

  return { state, errors, onSubmit, clearError, reset: () => setState('idle') }
}
