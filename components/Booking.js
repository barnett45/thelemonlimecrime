import Field from '@components/Field'
import { useNetlifyForm } from '@components/hooks'
import form from './forms.module.css'
import styles from './Booking.module.css'

const SPECS = [
  ['01', 'Seats, plus the driver', 'Four'],
  ['02', 'Depot to venue radius', '38 km'],
  ['03', 'Minimum booking', '3 hrs'],
  ['04', 'Afterburner surcharge', '£240'],
]

function validate(values) {
  const errors = {}
  if (!values.name || values.name.trim().length < 2) errors.name = 'We need a name for the manifest.'
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(values.email || '')) errors.email = 'That address will not reach you.'
  if (!values.date) errors.date = 'Pick a night.'
  else if (new Date(values.date) < new Date(new Date().toDateString())) errors.date = 'That night has already been and gone.'
  if (!values.location || values.location.trim().length < 3) errors.location = 'Where are we collecting from?'
  if (!values.guests) errors.guests = 'Rough head count is fine.'
  return errors
}

export default function Booking() {
  const { state, errors, onSubmit, clearError, reset } = useNetlifyForm(validate)

  return (
    <section className={styles.section} id="book">
      <div className="shell">
        <div className={styles.split}>
          <div className={styles.pitch}>
            <p className="eyebrow">Section 04 — Bookings portal</p>
            <h2 className="sectionTitle">
              Hire the
              <br />
              getaway
              <br />
              vehicle
            </h2>
            <p className={styles.lede}>
              The same three-wheeler from the picture, insured for civilian use and cleaned of
              anything the licensing board would object to. Weddings, premieres, launches, and the
              occasional escape.
            </p>
            <ul className={styles.specs}>
              {SPECS.map(([no, label, value]) => (
                <li className={styles.spec} key={no}>
                  <span className={styles.specNo}>{no}</span>
                  <span>{label}</span>
                  <span className={styles.specVal}>{value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHead}>
              <h3 className={styles.cardTitle}>Charter request</h3>
              <span className={styles.ref}>Form LMN-013</span>
            </div>

            {state === 'done' ? (
              <div className={form.done}>
                <span className={form.doneMark}>Request logged</span>
                <p className={form.doneTitle}>The keys are turning</p>
                <p className={form.doneCopy}>
                  Dispatch reads charter requests twice a day and answers inside 24 hours. If the
                  date is inside a week, say so in the notes next time and it jumps the queue.
                </p>
                <button type="button" className={form.again} onClick={reset}>
                  Book another night
                </button>
              </div>
            ) : (
              <form
                name="booking"
                method="POST"
              action="/success"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={onSubmit}
                noValidate
              >
                <input type="hidden" name="form-name" value="booking" />
                <p className={form.hp} aria-hidden="true">
                  <label>
                    Leave this empty
                    <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <div className={styles.rows}>
                  <div className={styles.pair}>
                    <Field
                      name="name"
                      label="Name"
                      placeholder="Wren Okafor"
                      autoComplete="name"
                      error={errors.name}
                      onInput={() => clearError('name')}
                    />
                    <Field
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="you@somewhere.co"
                      autoComplete="email"
                      error={errors.email}
                      onInput={() => clearError('email')}
                    />
                  </div>

                  <div className={styles.pair}>
                    <Field
                      name="date"
                      label="Event date"
                      type="date"
                      error={errors.date}
                      onInput={() => clearError('date')}
                    />
                    <Field
                      as="select"
                      name="guests"
                      label="Expected guests"
                      defaultValue=""
                      error={errors.guests}
                      onChange={() => clearError('guests')}
                    >
                      <option value="" disabled>
                        Select a range
                      </option>
                      <option value="1-4">1 – 4</option>
                      <option value="5-20">5 – 20</option>
                      <option value="21-60">21 – 60</option>
                      <option value="61-150">61 – 150</option>
                      <option value="150+">More than 150</option>
                    </Field>
                  </div>

                  <Field
                    name="location"
                    label="Location"
                    placeholder="Pier 9 loading yard, Citrus Row"
                    error={errors.location}
                    onInput={() => clearError('location')}
                  />

                  <Field
                    as="textarea"
                    name="notes"
                    label="Anything we should know"
                    optional
                    placeholder="Arrival time, cobbles, low arches, people we should avoid."
                  />

                  {state === 'error' && (
                    <p className={form.alert}>
                      That did not send. Check the connection and try again, or reach dispatch at
                      the tip-off form below.
                    </p>
                  )}
                </div>

                <div className={styles.foot}>
                  <p className={form.note}>
                    No deposit taken here. Dispatch confirms availability first.
                  </p>
                  <button className={form.submit} type="submit" disabled={state === 'sending'}>
                    {state === 'sending' ? (
                      <>
                        <span className={form.spinner} /> Sending
                      </>
                    ) : (
                      'Request the vehicle'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
