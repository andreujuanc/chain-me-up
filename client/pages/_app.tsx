import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Sidebar } from '../components/layout/sidebar';
import { Header } from '../components/layout/header';
import { SuggestionsBar } from '../components/layout/suggestions-bar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="fixed flex w-full h-full">
      <Header />
      <div className="container flex flex-col flex-1 mx-auto sm:flex-row">
        <main className="flex-1 overflow-auto border-gray-50 border-x-2">
          <Component {...pageProps} />
        </main>
        <Sidebar />
        <SuggestionsBar />
      </div>
    </div>
  );
}

export default MyApp;
