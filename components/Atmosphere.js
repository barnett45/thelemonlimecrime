import TukTuk from '@components/TukTuk'
import { useOptionalMedia } from '@components/hooks'
import styles from './Atmosphere.module.css'

/**
 * The room the whole site sits in: slow-motion footage of the tuk-tuk coming
 * apart and back together. Drop a file at /public/media/assembly-loop.mp4 and
 * it takes over automatically; otherwise the SVG rig performs the same beat.
 */
export default function Atmosphere() {
  const src = '/media/assembly-loop.mp4'
  const hasFootage = useOptionalMedia(src)

  return (
    <div className={styles.layer} aria-hidden="true">
      {hasFootage ? (
        <video className={styles.plate} src={src} autoPlay muted loop playsInline preload="auto" />
      ) : (
        <TukTuk className={styles.rig} title="" />
      )}
      <div className={styles.reticle} />
      <div className={styles.scan} />
    </div>
  )
}
