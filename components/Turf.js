import Still from '@components/Still'
import { useReveal } from '@components/hooks'
import styles from './Turf.module.css'

const SCENES = [
  { slug: 'Scene 02 · 00:14:08', name: 'The Lime Tycoon', role: 'Abelardo Sarto counts the crop before he counts the bodies.', scene: 'tycoon', tone: 'lime' },
  { slug: 'Scene 07 · 00:41:52', name: 'The Lemon Detective', role: 'Wren Okafor, nine years on the citrus beat, one working headlight.', scene: 'detective', tone: 'lemon' },
  { slug: 'Scene 11 · 01:03:19', name: 'Citrus Row, 3AM', role: 'Wet asphalt, a stalled meter, and headlights that do not belong here.', scene: 'street', tone: 'dusk' },
  { slug: 'Scene 14 · 01:18:44', name: 'The Pulp Exchange', role: 'Two families, one table, forty-one crates unaccounted for.', scene: 'parlor', tone: 'lemon' },
  { slug: 'Scene 18 · 01:32:07', name: 'Zest Runners', role: 'Third gear through the night market. Nothing rides low anymore.', scene: 'chase', tone: 'lime' },
  { slug: 'Scene 21 · 01:47:23', name: 'Sour Deal at Pier 9', role: 'The bulbs stay on until the last crate is off the water.', scene: 'market', tone: 'dusk' },
  { slug: 'Scene 24 · 02:02:56', name: 'Rind & Ruin', role: 'A front wheel that has outrun four precincts and one marriage.', scene: 'wheel', tone: 'lemon' },
  { slug: 'Scene 27 · 02:19:31', name: 'The Peel Job', role: 'Every fare is written down. That is the whole problem.', scene: 'ledger', tone: 'lime' },
  { slug: 'Scene 30 · 02:44:12', name: 'Last Squeeze', role: 'Rooftop, moonrise, and a debt that finally comes due.', scene: 'rooftop', tone: 'dusk' },
]

export default function Turf() {
  const [ref, seen] = useReveal()

  return (
    <section className={styles.section} id="turf" ref={ref}>
      <div className="shell">
        <div className={styles.head}>
          <div>
            <p className="eyebrow">Section 03 — The syndicate&rsquo;s turf</p>
            <h2 className="sectionTitle">
              Scenes
              <br />
              on file
            </h2>
            <div className={styles.rule} />
          </div>
          <p className={styles.blurb}>
            Thirty-one frames pulled from the working cut. Everything here was shot inside a
            six-block radius of the depot, mostly between <strong>1AM and first light</strong>,
            mostly without permits.
          </p>
        </div>

        <div className={`${styles.grid} ${seen ? styles.on : ''}`}>
          {SCENES.map((item, i) => (
            <article className={styles.tile} key={item.name} tabIndex={0}>
              <div className={styles.art}>
                <Still scene={item.scene} tone={item.tone} id={`s${i}`} />
              </div>
              <span className={styles.grainy} />
              <span className={styles.shade} />
              <span className={styles.corner}>{String(i + 1).padStart(2, '0')}</span>
              <div className={styles.meta}>
                <span className={styles.slug}>{item.slug}</span>
                <h3 className={styles.name}>{item.name}</h3>
                <p className={styles.role}>{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
