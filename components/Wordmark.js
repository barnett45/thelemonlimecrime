import styles from './Wordmark.module.css'

/**
 * The logo lockup: lime Anton caps printed on a cream plate inside a gold rule.
 * `size` picks the scale; `stacked` breaks it over two lines for tall spaces.
 */
export default function Wordmark({ size = 'md', stacked = false, className = '', as: Tag = 'span' }) {
  return (
    <Tag
      className={`${styles.plate} ${styles[size]} ${stacked ? styles.stacked : ''} ${className}`}
      aria-label="The Lemon Lime Crime"
    >
      <span className={styles.inner} aria-hidden="true">
        <span className={styles.word}>The Lemon</span>
        <span className={styles.word}>Lime Crime</span>
      </span>
    </Tag>
  )
}
