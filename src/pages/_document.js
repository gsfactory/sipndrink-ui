import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src='/styles/assets/vendor/bootstrap/js/jquery.min.js'></script>
        <script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js'></script>
        <script src='https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js'></script>
      </body>
    </Html>
  )
}
