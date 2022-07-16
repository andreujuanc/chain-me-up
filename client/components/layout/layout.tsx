import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { SuggestionsBar } from './suggestions-bar';

interface ILayoutProps {
  children: ReactNode;
}

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export function Layout({ children }: ILayoutProps): ReactElement {
  return (
    <div className="fixed flex w-full h-full">
      <Header />
      <div className="container flex flex-col flex-1 mx-auto sm:flex-row">
        <main className="flex-1 overflow-auto border-gray-50 border-x-2">
          {children}
        </main>
        <Sidebar />
        <SuggestionsBar />
      </div>
    </div>
  );
}

export function getLayout(page: ReactElement): ReactElement {
  return <Layout>{page}</Layout>;
}
