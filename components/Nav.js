import { useEffect, useState } from 'react'
import styles from './Nav.module.css'

export default function Nav() {
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${stuck ? styles.stuck : ''}`}>
      <a className={styles.brand} href="#top">
        Lemon <span className={styles.slash}>//</span> Lime
      </a>
      <div className={styles.links}>
        <a className={styles.link} href="#getaway">
          The chase
        </a>
        <a className={styles.link} href="#turf">
          The turf
        </a>
        <a className={styles.link} href="#contact">
          Tip off
        </a>
        <a className={styles.pill} href="#book">
          Book now
        </a>
      </div>
    </nav>
  )
}
