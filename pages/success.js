import Head from 'next/head'
import Link from 'next/link'
import Atmosphere from '@components/Atmosphere'
import Nav from '@components/Nav'
import Footer from '@components/Footer'
import styles from '@styles/Success.module.css'

export default function Success() {
  return (
    <>
      <Head>
        <title>Received — The Lemon Lime Crime</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex" />
      </Head>

      <Atmosphere />
      <Nav />

      <main className={styles.wrap}>
        <div className="shell">
          <p className="eyebrow">Transmission logged</p>
          <h1 className={styles.title}>
            It reached
            <br />
            dispatch
          </h1>
          <p className={styles.copy}>
            Somebody at Arch 14 has it now. Charter requests are answered inside 24 hours; tip-offs
            get read the same night and answered only if they need to be.
          </p>
          <Link href="/" className={styles.back}>
            Back to the chase
          </Link>
        </div>
      </main>

      <Footer />
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
    </>
  )
}
