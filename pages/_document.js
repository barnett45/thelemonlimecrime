import Document, { Html, Head, Main, NextScript } from 'next/document'

class LemonLimeDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Anton&family=Geist:wght@100..900&display=swap"
            rel="stylesheet"
          />
          <meta name="theme-color" content="#0a0c05" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default LemonLimeDocument
