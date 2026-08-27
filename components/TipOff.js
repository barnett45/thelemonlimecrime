import Field from '@components/Field'
import { useNetlifyForm } from '@components/hooks'
import form from './forms.module.css'
import styles from './TipOff.module.css'

function validate(values) {
  const errors = {}
  if (!values.name || values.name.trim().length < 2) errors.name = 'Any name will do. Even a bad one.'
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(values.email || '')) errors.email = 'We cannot write back to that.'
  if (!values.message || values.message.trim().length < 10) errors.message = 'Give us at least a sentence.'
  return errors
}

export default function TipOff() {
  const { state, errors, onSubmit, clearError, reset } = useNetlifyForm(validate)

  return (
    <section className={styles.section} id="contact">
      <div className="shell">
        <div className={styles.grid}>
          <div className={styles.intro}>
            <p className="eyebrow">Section 05 — Contact</p>
            <h2 className="sectionTitle">
              Tip off the
              <br />
              syndicate
            </h2>
            <p className={styles.copy}>
              Press, locations, stunt work, or a sighting of the vehicle somewhere it should not
              be. Everything lands in the same inbox and gets read by a person.
            </p>
          </div>

          {state === 'done' ? (
            <div className={`${form.done} ${styles.form}`}>
              <span className={form.doneMark}>Received</span>
              <p className={form.doneTitle}>Nobody saw you send it</p>
              <p className={form.doneCopy}>
                Your message is in. If it needs an answer you will get one within a couple of
                nights.
              </p>
              <button type="button" className={form.again} onClick={reset}>
                Send another
              </button>
            </div>
          ) : (
            <form
              className={styles.form}
              name="tip-off"
              method="POST"
              action="/success"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={onSubmit}
              noValidate
            >
              <input type="hidden" name="form-name" value="tip-off" />
              <p className={form.hp} aria-hidden="true">
                <label>
                  Leave this empty
                  <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>

              <div className={styles.pair}>
                <Field
                  name="name"
                  label="Name"
                  placeholder="Or something close to it"
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

              <Field
                as="textarea"
                name="message"
                label="What do you know"
                placeholder="Time, place, plate number if you got it."
                error={errors.message}
                onInput={() => clearError('message')}
              />

              {state === 'error' && (
                <p className={form.alert}>
                  Message did not go through. Try once more, or mail dispatch directly.
                </p>
              )}

              <div className={styles.action}>
                <p className={form.note}>Nothing is published. Nothing is sold.</p>
                <button className={form.submit} type="submit" disabled={state === 'sending'}>
                  {state === 'sending' ? (
                    <>
                      <span className={form.spinner} /> Sending
                    </>
                  ) : (
                    'Send the tip'
                  )}
                </button>
              </div>
            </form>
          )}

          <div className={styles.channels}>
            <p className={styles.channel}>
              <span>Dispatch</span>
              <a href="mailto:dispatch@lemonlimecrime.film">dispatch@lemonlimecrime.film</a>
            </p>
            <p className={styles.channel}>
              <span>Depot</span>
              <span>Arch 14, Citrus Row</span>
            </p>
            <p className={styles.channel}>
              <span>Hours</span>
              <span>21:00 — 05:00, most nights</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
