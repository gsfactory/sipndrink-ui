
import '../../public/styles/assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../public/styles/assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../public/styles/assets/vendor/bootstrap-icons/bootstrap-icons.css';
// import '@splidejs/splide/dist/css/splide.min.css';
import "../../public/styles/assets/css/main.css";
import "../../public/styles/assets/css/video.css";

import { SessionProvider } from 'next-auth/react';

import { DataProvider } from '../context/sip_context';


export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <DataProvider>
    <SessionProvider session={session}>
      {/* <Layout>
        <> */}
          <Component {...pageProps} />
        {/* </>
      </Layout> */}
    </SessionProvider>
    </DataProvider>
  );
}
