import Head from 'next/head'
import Atmosphere from '@components/Atmosphere'
import Nav from '@components/Nav'
import Hero from '@components/Hero'
import Getaway from '@components/Getaway'
import Turf from '@components/Turf'
import Booking from '@components/Booking'
import TipOff from '@components/TipOff'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>The Lemon Lime Crime — hire the getaway vehicle</title>
        <meta
          name="description"
          content="A three-wheeled crime picture shot on Citrus Row. Watch the getaway, tour the turf, and hire the yellow tuk-tuk for your own night."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="The Lemon Lime Crime" />
        <meta property="og:description" content="Squeezed fresh, served with zero remorse." />
        <meta property="og:type" content="website" />
      </Head>

      <Atmosphere />
      <Nav />

      <main>
        <Hero />
        <Getaway />
        <Turf />
        <Booking />
        <TipOff />
      </main>

      <Footer />

      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
    </>
  )
}
