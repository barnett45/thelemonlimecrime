import Wordmark from '@components/Wordmark'
import styles from './Footer.module.css'

const INDEX = [
  ['The chase', '#getaway'],
  ['The turf', '#turf'],
  ['Bookings', '#book'],
  ['Tip-offs', '#contact'],
]

const CREDITS = [
  ['Locations', 'Citrus Row'],
  ['Vehicle', 'Unit LMN 013'],
  ['Reel', '04 of 07'],
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="shell">
        <div className={styles.grid}>
          <p className={styles.tagline}>
            Squeezed fresh,
            <br />
            served with <em>zero remorse.</em>
          </p>

          <div className={styles.brand}>
            <Wordmark size="sm" className={styles.mark} />
            <p className={styles.markSub}>Est. 2019 · Arch 14</p>
            <p className={styles.brandCopy}>
              A three-wheeled picture about two families and the fruit they will not share.
            </p>
          </div>

          <nav className={styles.col} aria-label="Site index">
            <p className={styles.colHead}>Index</p>
            {INDEX.map(([label, href]) => (
              <a className={styles.link} href={href} key={href}>
                {label}
              </a>
            ))}
          </nav>

          <div className={styles.col}>
            <p className={styles.colHead}>Production</p>
            {CREDITS.map(([label, value]) => (
              <span className={styles.link} key={label} style={{ pointerEvents: 'none' }}>
                {label} — {value}
              </span>
            ))}
          </div>

          <div className={styles.social}>
            <p className={styles.colHead}>Follow the chase</p>
            <a
              className={styles.ig}
              href="https://instagram.com/lemonlimecrime"
              target="_blank"
              rel="noreferrer noopener"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="12" cy="12" r="4.4" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="17.6" cy="6.4" r="1.3" fill="currentColor" />
              </svg>
              Instagram
            </a>
          </div>

          <div className={styles.baseline}>
            <span>© {new Date().getFullYear()} Lemon Lime Crime. All fares final.</span>
            <span>Shot nights on Citrus Row. Built at Arch 14.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
