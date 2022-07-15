import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Sidebar } from '../components/layout/sidebar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Sidebar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
