
import '../../public/styles/assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../public/styles/assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../public/styles/assets/vendor/bootstrap-icons/bootstrap-icons.css';
import "../../public/styles/assets/css/main.css";

import { SessionProvider } from 'next-auth/react';

import Layout from "../components/layouts/overall_layout";
import { DataProvider } from '../context/sip_context';


export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <DataProvider>
    <SessionProvider session={session}>
      <Layout>
        <>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css" />

        <Component {...pageProps} />
        </>
      </Layout>
    </SessionProvider>
    </DataProvider>
  );
}
