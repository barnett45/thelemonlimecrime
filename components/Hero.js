import TukTuk from '@components/TukTuk'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <header className={styles.hero} id="top">
      <div className={styles.type} aria-hidden="true">
        <span className={styles.line}>The Lemon</span>
        <span className={styles.line}>
          Lime <em>Crime</em>
        </span>
      </div>

      <h1 className="visually-hidden">The Lemon Lime Crime</h1>

      <div className={styles.occlude} aria-hidden="true" />

      <div className={styles.rig}>
        <TukTuk
          viewBox="130 128 800 486"
          title="A bright yellow tuk-tuk with a black canopy roof, lit from below in toxic green" />
      </div>

      <div className={styles.haze} aria-hidden="true" />

      <div className={styles.cue} aria-hidden="true">
        <span className={styles.cueRail} />
        Scroll
      </div>

      <aside className={styles.cta}>
        <p className={styles.ctaTag}>
          <span className={styles.dot} />
          Unit available
        </p>
        <p className={styles.ctaTitle}>Follow the chase</p>
        <p className={styles.ctaCopy}>
          One three-wheeler, two rival families, and a fare meter nobody has ever seen reset.
          Ride-alongs run nightly out of Citrus Row.
        </p>
        <a className={styles.book} href="#book">
          Book Now
          <svg width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden="true">
            <path d="M0 5h17M13 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </a>
      </aside>
    </header>
  )
}
