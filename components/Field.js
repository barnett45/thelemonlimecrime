import styles from './forms.module.css'

export default function Field({
  as = 'input',
  name,
  label,
  error,
  optional = false,
  hint,
  children,
  onInput,
  ...rest
}) {
  const Tag = as
  const id = `f-${name}`

  return (
    <div className={`${styles.field} ${error ? styles.invalid : ''}`}>
      <label className={styles.label} htmlFor={id}>
        <span>{label}</span>
        {optional && <span className={styles.optional}>Optional</span>}
      </label>
      <Tag
        id={id}
        name={name}
        className={styles.control}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-msg` : undefined}
        onInput={onInput}
        {...rest}
      >
        {children}
      </Tag>
      {error && (
        <span className={styles.msg} id={`${id}-msg`} role="alert">
          {error}
        </span>
      )}
      {!error && hint && <span className={styles.optional}>{hint}</span>}
    </div>
  )
}
