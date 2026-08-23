import { useEffect, useRef } from 'react'
import TukTuk from '@components/TukTuk'
import { useOptionalMedia, useScrollProgress } from '@components/hooks'
import styles from './Getaway.module.css'

const SRC = '/media/getaway-launch.mp4'

const BEATS = [
  { at: 0, mark: 'Reel 04 / 00:00:06', line: 'Doors shut on Citrus Row' },
  { at: 0.34, mark: 'Reel 04 / 00:01:12', line: 'Green fire under the floorpan' },
  { at: 0.68, mark: 'Reel 04 / 00:02:41', line: 'Three wheels, no runway' },
]

/* fixed-seed noise so the server and the browser agree on the star field */
function starfield(count) {
  let seed = 20240613
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
  return Array.from({ length: count }, () => ({
    left: `${(rand() * 100).toFixed(2)}%`,
    top: `${(rand() * 78).toFixed(2)}%`,
    size: `${(rand() * 2.1 + 0.7).toFixed(2)}px`,
    dim: (rand() * 0.6 + 0.25).toFixed(2),
  }))
}

const STARS = starfield(90)

function timecode(p) {
  const total = Math.round(p * 178)
  const m = String(Math.floor(total / 60)).padStart(2, '0')
  const s = String(total % 60).padStart(2, '0')
  return `00:${m}:${s}`
}

export default function Getaway() {
  const trackRef = useRef(null)
  const videoRef = useRef(null)
  const progress = useScrollProgress(trackRef)
  const hasFootage = useOptionalMedia(SRC)

  /* scrub the film off the scroll position rather than off a clock */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let frame = 0
    const seek = () => {
      frame = 0
      const duration = video.duration
      if (!duration || Number.isNaN(duration)) return
      const target = Math.min(duration - 0.05, Math.max(0, progress * duration))
      if (Math.abs(video.currentTime - target) > 0.02) video.currentTime = target
    }
    frame = requestAnimationFrame(seek)
    return () => cancelAnimationFrame(frame)
  }, [progress, hasFootage])

  const active = BEATS.reduce((acc, beat, i) => (progress >= beat.at ? i : acc), 0)

  return (
    <section
      className={styles.track}
      ref={trackRef}
      id="getaway"
      aria-label="The getaway, scrubbed by scroll"
    >
      <div className={styles.stick} style={{ '--p': progress.toFixed(4) }}>
        {hasFootage ? (
          <video
            ref={videoRef}
            className={styles.plate}
            src={SRC}
            muted
            playsInline
            preload="auto"
            tabIndex={-1}
          />
        ) : (
          <div className={styles.scene} aria-hidden="true">
            {STARS.map((star, i) => (
              <span
                key={i}
                className={styles.star}
                style={{
                  left: star.left,
                  top: star.top,
                  width: star.size,
                  height: star.size,
                  opacity: star.dim,
                }}
              />
            ))}
            <span className={styles.moon} />
            <div className={styles.streaks} />

            <svg className={`${styles.skyline} ${styles.skylineBack}`} viewBox="0 0 1600 320" preserveAspectRatio="none">
              <path
                fill="#0b1109"
                d="M0 320V196h84v-52h62v52h96v-84h74v84h122v-38h88v38h108v-70h70v70h134v-46h96v46h118v-92h72v92h96v-40h80v40h100v-64h56v64h44v124z"
              />
            </svg>
            <svg className={styles.skyline} viewBox="0 0 1600 340" preserveAspectRatio="none">
              <path
                fill="#050804"
                d="M0 340V214h120v-64h70v64h84v-120h96v120h130v-46h78v46h96v-92h86v92h140v-58h92v58h118v-110h74v110h92v-42h94v42h130v-72h60v72h40v126z"
              />
              <g fill="#f2ff00" opacity=".55">
                <rect x="140" y="176" width="7" height="11" />
                <rect x="162" y="200" width="7" height="11" />
                <rect x="322" y="132" width="7" height="11" />
                <rect x="348" y="164" width="7" height="11" />
                <rect x="700" y="128" width="7" height="11" />
                <rect x="1044" y="150" width="7" height="11" />
                <rect x="1298" y="192" width="7" height="11" />
              </g>
              <g fill="#39ff14" opacity=".5">
                <rect x="196" y="150" width="7" height="11" />
                <rect x="742" y="168" width="7" height="11" />
                <rect x="1080" y="186" width="7" height="11" />
              </g>
            </svg>

            <div className={styles.bloom} />
            <TukTuk className={styles.craft} boost title="" />
          </div>
        )}

        <div className={styles.grade} />

        <div className={styles.hud}>
          <div className={styles.slate}>
            <span className={styles.rec}>
              <span className={styles.recDot} />
              Rec
            </span>
            <span>Cam B · 35mm · 240 fps</span>
            <span>{timecode(progress)}</span>
          </div>

          <div className={styles.beats}>
            {BEATS.map((beat, i) => (
              <div
                key={beat.mark}
                className={`${styles.beat} ${i === active ? styles.beatOn : ''}`}
                aria-hidden={i !== active}
              >
                <span className={styles.beatIndex}>{beat.mark}</span>
                <p className={styles.beatText}>{beat.line}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.meter}>
          <div className={styles.meterHead}>
            <span>Getaway timeline</span>
            <span className={styles.meterPct}>{Math.round(progress * 100)}%</span>
          </div>
          <div
            className={styles.rail}
            role="progressbar"
            aria-label="Getaway sequence progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
          >
            <span className={styles.fill} />
          </div>
          <div className={styles.ticks}>
            <span>Idle</span>
            <span>Ignition</span>
            <span>Lift</span>
            <span>Gone</span>
          </div>
        </div>
      </div>
    </section>
  )
}
