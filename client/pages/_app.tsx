import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Sidebar } from '../components/layout/sidebar';
import { Header } from '../components/layout/header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col flex-1 sm:flex-row">
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <Sidebar />
      </div>
    </div>
  );
}

export default MyApp;
