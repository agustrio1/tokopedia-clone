import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="flex flex-col items-center justify-between max-w-screen-md mx-auto">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
