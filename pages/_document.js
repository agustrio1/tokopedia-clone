import { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="flex flex-col items-center justify-between max-w-screen-md mx-auto">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
